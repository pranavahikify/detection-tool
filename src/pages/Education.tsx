import { BookOpen, Award, HelpCircle, Play, ChevronRight, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useState } from "react";

const quizQuestions = [
  {
    question: "What is the most common type of deepfake used in Indian elections?",
    options: ["Face swap videos", "Voice cloning", "Text manipulation", "Image editing"],
    correct: 0,
    explanation: "Face swap videos are the most prevalent form, using AI to replace a politician's face in existing footage.",
  },
  {
    question: "Which visual cue helps identify a deepfake video?",
    options: ["High resolution", "Unnatural blinking", "Good lighting", "Clear audio"],
    correct: 1,
    explanation: "Deepfakes often struggle with natural blinking patterns, making it a reliable detection cue.",
  },
  {
    question: "What should you do when you receive suspicious political content?",
    options: ["Forward to friends", "Ignore it", "Report and verify", "Share on social media"],
    correct: 2,
    explanation: "Always verify through official channels before sharing. Use DeepGuard to check authenticity.",
  },
];

const faqs = [
  { q: "What is a deepfake?", a: "A deepfake is AI-generated synthetic media where a person's likeness is replaced or manipulated to create convincing but fake content." },
  { q: "How accurate is the detection?", a: "Our system achieves 98.6% accuracy using multi-modal AI analysis including facial, audio, and metadata forensics." },
  { q: "What happens after I report?", a: "Your submission is analyzed by AI, reviewed by ECI officials if flagged, and takedown notices are sent to platforms if confirmed as deepfake." },
  { q: "Is my submission anonymous?", a: "Yes. Personal information is encrypted and only accessible to authorized ECI officials during investigation." },
];

export default function Education() {
  const [quizStep, setQuizStep] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const handleAnswer = (idx: number) => {
    setSelectedAnswer(idx);
    if (idx === quizQuestions[quizStep].correct) setScore(s => s + 1);
    setTimeout(() => {
      if (quizStep < quizQuestions.length - 1) {
        setQuizStep(s => s + 1);
        setSelectedAnswer(null);
      } else {
        setShowResult(true);
      }
    }, 1500);
  };

  const resetQuiz = () => {
    setQuizStep(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResult(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="font-heading text-3xl md:text-4xl font-bold mb-3">Learn About Deepfakes</h1>
            <p className="text-muted-foreground">Understand, detect, and report AI-generated misinformation</p>
          </div>

          {/* Quiz Section */}
          <div className="rounded-xl border border-border bg-card p-8 mb-8">
            <div className="flex items-center gap-2 mb-6">
              <Award className="w-5 h-5 text-primary" />
              <h2 className="font-heading font-semibold text-xl text-foreground">Spot the Fake — Quiz</h2>
            </div>

            {!showResult ? (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-sm text-muted-foreground">Question {quizStep + 1} of {quizQuestions.length}</span>
                  <div className="flex-1 h-1.5 rounded-full bg-muted">
                    <div className="h-full rounded-full gradient-primary transition-all" style={{ width: `${((quizStep + 1) / quizQuestions.length) * 100}%` }} />
                  </div>
                </div>

                <h3 className="text-lg font-medium text-foreground mb-6">{quizQuestions[quizStep].question}</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {quizQuestions[quizStep].options.map((opt, i) => {
                    const isSelected = selectedAnswer === i;
                    const isCorrect = i === quizQuestions[quizStep].correct;
                    const showFeedback = selectedAnswer !== null;

                    return (
                      <button
                        key={i}
                        onClick={() => selectedAnswer === null && handleAnswer(i)}
                        disabled={selectedAnswer !== null}
                        className={`p-4 rounded-lg border text-left text-sm font-medium transition-all ${
                          showFeedback && isCorrect
                            ? "border-genuine bg-genuine/10 text-genuine"
                            : showFeedback && isSelected && !isCorrect
                            ? "border-deepfake bg-deepfake/10 text-deepfake"
                            : "border-border bg-secondary hover:border-primary/50 text-foreground"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          {showFeedback && isCorrect && <CheckCircle2 className="w-4 h-4 shrink-0" />}
                          {showFeedback && isSelected && !isCorrect && <XCircle className="w-4 h-4 shrink-0" />}
                          {opt}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {selectedAnswer !== null && (
                  <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 p-3 rounded-lg bg-primary/5 border border-primary/20 text-sm text-muted-foreground">
                    {quizQuestions[quizStep].explanation}
                  </motion.p>
                )}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-5xl font-heading font-bold text-gradient mb-2">{score}/{quizQuestions.length}</div>
                <p className="text-muted-foreground mb-6">
                  {score === quizQuestions.length ? "Perfect! You're a deepfake detection expert!" : "Good effort! Keep learning to improve your skills."}
                </p>
                <Button onClick={resetQuiz} className="gradient-primary text-primary-foreground">Try Again</Button>
              </div>
            )}
          </div>

          {/* FAQs */}
          <div className="rounded-xl border border-border bg-card p-8">
            <div className="flex items-center gap-2 mb-6">
              <HelpCircle className="w-5 h-5 text-primary" />
              <h2 className="font-heading font-semibold text-xl text-foreground">Frequently Asked Questions</h2>
            </div>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div key={i} className="border border-border rounded-lg overflow-hidden">
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                    className="w-full p-4 flex items-center justify-between text-left hover:bg-secondary/30 transition-colors"
                  >
                    <span className="font-medium text-sm text-foreground">{faq.q}</span>
                    <ChevronRight className={`w-4 h-4 text-muted-foreground transition-transform ${expandedFaq === i ? "rotate-90" : ""}`} />
                  </button>
                  {expandedFaq === i && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="px-4 pb-4">
                      <p className="text-sm text-muted-foreground">{faq.a}</p>
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
