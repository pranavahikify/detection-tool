import { Link } from "react-router-dom";
import { Shield, Upload, BarChart3, Users, Globe, Zap, Eye, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const stats = [
  { value: "12,847", label: "Deepfakes Detected" },
  { value: "98.6%", label: "Detection Accuracy" },
  { value: "< 45s", label: "Avg Response Time" },
  { value: "28", label: "States Covered" },
];

const features = [
  { icon: Upload, title: "Upload & Verify", desc: "Submit suspicious political content — video, audio, or images — for instant AI analysis." },
  { icon: Eye, title: "Real-Time Monitoring", desc: "Track deepfake incidents across India with live maps and incident feeds." },
  { icon: BarChart3, title: "Analytics & Insights", desc: "Comprehensive dashboards showing trends, targeted politicians, and viral spread." },
  { icon: Globe, title: "5+ Languages", desc: "Full support for Hindi, Tamil, Telugu, Bengali, and more regional languages." },
  { icon: Zap, title: "Instant Alerts", desc: "Get notified when deepfakes targeting your constituency go viral." },
  { icon: Users, title: "Civic Participation", desc: "Earn badges by reporting deepfakes and protecting election integrity." },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{
          background: "radial-gradient(ellipse at 50% 0%, hsl(145 70% 45% / 0.15) 0%, transparent 60%)"
        }} />
        <div className="container mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
              <Shield className="w-4 h-4" />
              Protecting Indian Elections
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }}
            className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
          >
            Detect Deepfakes.
            <br />
            <span className="text-gradient">Defend Democracy.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
          >
            AI-powered deepfake detection system built for the Election Commission of India.
            Verify political content in seconds, in any Indian language.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/verify">
              <Button size="lg" className="gradient-primary text-primary-foreground font-semibold shadow-glow px-8 text-base">
                Verify Content Now <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button size="lg" variant="outline" className="border-border text-foreground hover:bg-secondary px-8 text-base">
                View Dashboard
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 border-y border-border bg-card/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <motion.div key={i} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center">
                <div className="text-3xl md:text-4xl font-heading font-bold text-gradient mb-1">{s.value}</div>
                <div className="text-sm text-muted-foreground">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">How DeepGuard Works</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">End-to-end deepfake detection platform designed for India's electoral ecosystem.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={i} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                className="group p-6 rounded-xl border border-border bg-card hover:border-primary/30 hover:shadow-glow transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <f.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="font-heading font-semibold text-lg mb-2 text-foreground">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4">
        <div className="container mx-auto">
          <div className="rounded-2xl gradient-primary p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10" style={{ background: "radial-gradient(circle at 80% 20%, white 0%, transparent 50%)" }} />
            <div className="relative z-10">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                Ready to Fight Misinformation?
              </h2>
              <p className="text-primary-foreground/80 max-w-lg mx-auto mb-8">
                Join thousands of citizens helping protect India's democracy from deepfake threats.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/verify">
                  <Button size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-semibold px-8">
                    <CheckCircle2 className="mr-2 w-5 h-5" /> Start Verifying
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="lg" className="bg-black text-white border-none hover:bg-black px-8">
                    Create Account
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
