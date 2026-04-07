import { useState, useCallback, useRef } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import { jsPDF } from "jspdf";
import { Upload, Link as LinkIcon, FileVideo, FileAudio, Image, FileText, X, CheckCircle2, AlertTriangle, XCircle, Loader2, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

type Step = "upload" | "processing" | "result";
type Verdict = "genuine" | "deepfake" | "suspicious";
type ContentTab = "image" | "video" | "audio" | "text" | "url";

const WEBHOOK_URL = "https://ggggggg4rwefsdf.app.n8n.cloud/webhook/detect";

const fallbackResult = {
  verdict: "suspicious" as Verdict,
  confidence: 0,
  details: {
    error: "Could not reach the analysis server. Please try again later.",
  },
  verificationId: "N/A",
};

const processingSteps = [
  "Uploading content...",
  "Extracting visual frames...",
  "Analyzing facial features...",
  "Checking audio patterns...",
  "Cross-referencing database...",
  "Generating forensic report...",
];

const tabs: { key: ContentTab; label: string; icon: typeof Image }[] = [
  { key: "image", label: "Image", icon: Image },
  { key: "video", label: "Video", icon: FileVideo },
  { key: "audio", label: "Audio", icon: FileAudio },
  { key: "text", label: "Text", icon: FileText },
  { key: "url", label: "URL", icon: LinkIcon },
];

const acceptMap: Record<string, Record<string, string[]>> = {
  image: { "image/*": [".jpg", ".jpeg", ".png", ".webp"] },
  video: { "video/*": [".mp4", ".avi", ".mov", ".webm"] },
  audio: { "audio/*": [".mp3", ".wav", ".m4a", ".ogg"] },
};

const dropzoneHints: Record<string, string> = {
  image: "JPG, PNG, or WebP — up to 100MB",
  video: "MP4, AVI, MOV, or WebM — up to 100MB",
  audio: "MP3, WAV, M4A, or OGG — up to 100MB",
};

export default function Verify() {
  const [step, setStep] = useState<Step>("upload");
  const [activeTab, setActiveTab] = useState<ContentTab>("image");
  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState("");
  const [textContent, setTextContent] = useState("");
  const [politicianName, setPoliticianName] = useState("");
  const [description, setDescription] = useState("");
  const [consent, setConsent] = useState(false);
  const [progress, setProgress] = useState(0);
  const [processingStep, setProcessingStep] = useState(0);
  const [result, setResult] = useState<{
    verdict: Verdict;
    confidence: number;
    details: Record<string, string>;
    verificationId: string;
  } | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const onDrop = useCallback((accepted: File[]) => {
    if (accepted.length > 0) setFile(accepted[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptMap[activeTab] || {},
    maxFiles: 1,
    maxSize: 100 * 1024 * 1024,
    disabled: activeTab === "text" || activeTab === "url",
  });

  const canSubmit = () => {
    if (!consent) return false;
    if (activeTab === "url") return url.trim().length > 0;
    if (activeTab === "text") return textContent.trim().length > 0;
    return file !== null;
  };

  const handleSubmit = async () => {
    if (!canSubmit()) return;
    setStep("processing");
    setProgress(0);
    setProcessingStep(0);

    // Animate progress to ~90% while waiting for API
    progressRef.current = setInterval(() => {
      setProgress((p) => {
        const next = p + 1;
        setProcessingStep(Math.min(Math.floor(next / 15), processingSteps.length - 2));
        if (next >= 90) {
          if (progressRef.current) clearInterval(progressRef.current);
          return 90;
        }
        return next;
      });
    }, 120);

    try {
      const formData = new FormData();
      formData.append("contentType", activeTab);
      if (politicianName) formData.append("politicianName", politicianName);
      if (description) formData.append("description", description);

      if (activeTab === "url") {
        formData.append("url", url);
      } else if (activeTab === "text") {
        formData.append("text", textContent);
      } else if (file) {
        formData.append("file", file, file.name);
      }

      const response = await axios.post(WEBHOOK_URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Finish progress
      if (progressRef.current) clearInterval(progressRef.current);
      setProgress(100);
      setProcessingStep(processingSteps.length - 1);

      // Parse response — adapt to whatever shape n8n returns
      const data = response.data;
      const parsed = {
        verdict: (data?.verdict || "suspicious") as Verdict,
        confidence: Number(data?.confidence) || 0,
        details: data?.details || { summary: JSON.stringify(data) },
        verificationId: data?.verificationId || `VRF-${Date.now()}`,
      };
      setResult(parsed);
      setTimeout(() => setStep("result"), 500);
    } catch (err) {
      console.error("Webhook error:", err);
      if (progressRef.current) clearInterval(progressRef.current);
      setProgress(100);
      setResult(fallbackResult);
      setTimeout(() => setStep("result"), 500);
    }
  };

  const verdictConfig: Record<Verdict, { icon: typeof CheckCircle2; label: string; color: string; bg: string }> = {
    genuine: { icon: CheckCircle2, label: "Genuine Content", color: "text-genuine", bg: "bg-genuine/10 border-genuine/30" },
    deepfake: { icon: XCircle, label: "Deepfake Detected", color: "text-deepfake", bg: "bg-deepfake/10 border-deepfake/30" },
    suspicious: { icon: AlertTriangle, label: "Suspicious Content", color: "text-suspicious", bg: "bg-suspicious/10 border-suspicious/30" },
  };

  const resetForm = () => {
    setStep("upload");
    setFile(null);
    setUrl("");
    setTextContent("");
    setPoliticianName("");
    setDescription("");
    setConsent(false);
    setProgress(0);
    setResult(null);
  };

  const switchTab = (tab: ContentTab) => {
    setActiveTab(tab);
    setFile(null);
    setUrl("");
    setTextContent("");
  };

  const fileIcon = activeTab === "video" ? FileVideo : activeTab === "audio" ? FileAudio : Image;
  const FileIcon = fileIcon;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-10">
            <h1 className="font-heading text-3xl md:text-4xl font-bold mb-3">Verify Political Content</h1>
            <p className="text-muted-foreground">Upload suspicious content to check for deepfake manipulation</p>
          </div>

          <AnimatePresence mode="wait">
            {step === "upload" && (
              <motion.div key="upload" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                {/* Content type tabs */}
                <div className="flex rounded-xl bg-secondary border border-border p-1 mb-8 overflow-x-auto">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.key;
                    return (
                      <button
                        key={tab.key}
                        onClick={() => switchTab(tab.key)}
                        className={`flex-1 min-w-0 flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                          isActive
                            ? "gradient-primary text-primary-foreground shadow-glow"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <Icon className="w-4 h-4 shrink-0" />
                        <span className="hidden sm:inline">{tab.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* File upload zone (image / video / audio) */}
                {(activeTab === "image" || activeTab === "video" || activeTab === "audio") && (
                  <div
                    {...getRootProps()}
                    className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-all mb-6 ${
                      isDragActive ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                    }`}
                  >
                    <input {...getInputProps()} />
                    {file ? (
                      <div className="flex items-center justify-center gap-3">
                        <FileIcon className="w-8 h-8 text-primary" />
                        <div className="text-left">
                          <p className="text-foreground font-medium">{file.name}</p>
                          <p className="text-sm text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                        <button onClick={(e) => { e.stopPropagation(); setFile(null); }} className="ml-4 text-muted-foreground hover:text-destructive">
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    ) : (
                      <>
                        <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-foreground font-medium mb-1">
                          Drop your {activeTab} file here or click to browse
                        </p>
                        <p className="text-sm text-muted-foreground">{dropzoneHints[activeTab]}</p>
                      </>
                    )}
                  </div>
                )}

                {/* Text input */}
                {activeTab === "text" && (
                  <div className="mb-6">
                    <Textarea
                      placeholder="Paste the suspicious text content here (e.g., a political quote, social media post, or news excerpt)..."
                      value={textContent}
                      onChange={(e) => setTextContent(e.target.value)}
                      className="bg-card border-border min-h-[200px]"
                      rows={8}
                    />
                    <p className="text-xs text-muted-foreground mt-2">
                      Paste text-based political content for AI-generated text detection.
                    </p>
                  </div>
                )}

                {/* URL input */}
                {activeTab === "url" && (
                  <div className="mb-6">
                    <div className="relative">
                      <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        placeholder="Paste YouTube, Facebook, Instagram, or Twitter URL"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        className="pl-10 bg-card border-border"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Supported: YouTube, Facebook, Instagram, Twitter/X, and WhatsApp forwarded links.
                    </p>
                  </div>
                )}

                {/* Common form fields */}
                <div className="space-y-4 mb-8">
                  <Input placeholder="Politician Name (optional)" value={politicianName} onChange={(e) => setPoliticianName(e.target.value)} className="bg-card border-border" />

                  <Textarea
                    placeholder="Additional context or description (optional)"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="bg-card border-border"
                    rows={3}
                  />

                  <div className="flex items-start gap-3">
                    <Checkbox id="consent" checked={consent} onCheckedChange={(c) => setConsent(c === true)} className="mt-0.5" />
                    <label htmlFor="consent" className="text-sm text-muted-foreground cursor-pointer">
                      I consent to the processing of this content for deepfake detection purposes. Submitted content is handled per ECI data protection guidelines.
                    </label>
                  </div>
                </div>

                <Button
                  onClick={handleSubmit}
                  disabled={!canSubmit()}
                  size="lg"
                  className="w-full gradient-primary text-primary-foreground font-semibold shadow-glow disabled:opacity-50"
                >
                  Analyze Content
                </Button>
              </motion.div>
            )}

            {step === "processing" && (
              <motion.div key="processing" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="text-center py-16">
                <Loader2 className="w-16 h-16 text-primary mx-auto mb-6 animate-spin" />
                <h2 className="font-heading text-2xl font-bold mb-2">Analyzing Content</h2>
                <p className="text-muted-foreground mb-8">{processingSteps[processingStep]}</p>
                <div className="max-w-md mx-auto mb-4">
                  <Progress value={progress} className="h-3" />
                </div>
                <p className="text-sm text-muted-foreground">{progress}% complete</p>

                <div className="mt-10 p-4 rounded-xl bg-card border border-border max-w-sm mx-auto">
                  <Info className="w-5 h-5 text-primary mb-2 mx-auto" />
                  <p className="text-sm text-muted-foreground">
                    <span className="text-foreground font-medium">Did you know?</span> Over 500,000 deepfake videos were created globally in 2025, with political content being the fastest growing category.
                  </p>
                </div>
              </motion.div>
            )}

            {step === "result" && result && (
              <motion.div key="result" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                {(() => {
                  const vc = verdictConfig[result.verdict];
                  const VerdictIcon = vc.icon;
                  return (
                    <div className={`rounded-xl border p-8 text-center mb-8 ${vc.bg}`}>
                      <VerdictIcon className={`w-16 h-16 mx-auto mb-4 ${vc.color}`} />
                      <h2 className={`font-heading text-3xl font-bold mb-2 ${vc.color}`}>{vc.label}</h2>
                      <p className="text-muted-foreground mb-6">Verification ID: {result.verificationId}</p>

                      <div className="max-w-xs mx-auto mb-2">
                        <div className="flex justify-between text-sm text-muted-foreground mb-1">
                          <span>Confidence Score</span>
                          <span className={vc.color}>{result.confidence}%</span>
                        </div>
                        <div className="h-4 rounded-full bg-muted overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${result.confidence}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className={`h-full rounded-full ${
                              result.verdict === "genuine" ? "bg-genuine" :
                              result.verdict === "deepfake" ? "bg-deepfake" : "bg-suspicious"
                            }`}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })()}

                <div className="rounded-xl border border-border bg-card p-6 mb-8">
                  <h3 className="font-heading font-semibold text-lg mb-4 text-foreground">Detection Details</h3>
                  <div className="space-y-4">
                    {Object.entries(result.details).map(([key, value]) => (
                      <div key={key} className="p-4 rounded-lg bg-secondary/50">
                        <p className="text-sm font-medium text-primary mb-1 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </p>
                        <p className="text-sm text-muted-foreground">{String(value)}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    className="flex-1 gradient-primary text-primary-foreground font-semibold"
                    onClick={() => {
                      if (!result) return;
                      const pdf = new jsPDF();
                      const vc = verdictConfig[result.verdict];
                      pdf.setFontSize(22);
                      pdf.text("Deepfake Detection Report", 20, 25);
                      pdf.setFontSize(10);
                      pdf.setTextColor(120, 120, 120);
                      pdf.text(`Verification ID: ${result.verificationId}`, 20, 34);
                      pdf.text(`Generated: ${new Date().toLocaleString()}`, 20, 40);
                      pdf.setDrawColor(200, 200, 200);
                      pdf.line(20, 45, 190, 45);
                      pdf.setFontSize(16);
                      pdf.setTextColor(0, 0, 0);
                      pdf.text("Verdict", 20, 56);
                      const verdictColor = result.verdict === "genuine" ? [34,197,94] : result.verdict === "deepfake" ? [239,68,68] : [234,179,8];
                      pdf.setTextColor(verdictColor[0], verdictColor[1], verdictColor[2]);
                      pdf.setFontSize(14);
                      pdf.text(vc.label, 20, 64);
                      pdf.setTextColor(0, 0, 0);
                      pdf.setFontSize(12);
                      pdf.text(`Confidence: ${result.confidence}%`, 20, 74);
                      pdf.line(20, 80, 190, 80);
                      pdf.setFontSize(16);
                      pdf.text("Detection Details", 20, 92);
                      let y = 102;
                      Object.entries(result.details).forEach(([key, value]) => {
                        if (y > 270) { pdf.addPage(); y = 20; }
                        pdf.setFontSize(11);
                        pdf.setTextColor(80, 80, 80);
                        pdf.text(key.replace(/([A-Z])/g, ' $1').trim(), 20, y);
                        y += 6;
                        pdf.setFontSize(10);
                        pdf.setTextColor(60, 60, 60);
                        const lines = pdf.splitTextToSize(String(value), 165);
                        pdf.text(lines, 20, y);
                        y += lines.length * 5 + 8;
                      });
                      pdf.save(`detection-report-${result.verificationId}.pdf`);
                    }}
                  >
                    Download Report (PDF)
                  </Button>
                  <Button variant="ghost" onClick={resetForm} className="flex-1 text-muted-foreground">
                    Verify Another
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <Footer />
    </div>
  );
}
