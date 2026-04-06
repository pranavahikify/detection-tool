import { Shield } from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                <Shield className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-heading font-bold text-foreground">DeepGuard</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Protecting Indian democracy from deepfake misinformation with AI-powered detection.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-3 text-sm">Platform</h4>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <Link to="/verify" className="hover:text-primary transition-colors">Verify Content</Link>
              <Link to="/dashboard" className="hover:text-primary transition-colors">ECI Dashboard</Link>
              <Link to="/education" className="hover:text-primary transition-colors">Learn</Link>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-3 text-sm">Resources</h4>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <span className="cursor-pointer hover:text-primary transition-colors">API Documentation</span>
              <span className="cursor-pointer hover:text-primary transition-colors">Detection Guide</span>
              <span className="cursor-pointer hover:text-primary transition-colors">FAQs</span>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-3 text-sm">Legal</h4>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <span className="cursor-pointer hover:text-primary transition-colors">Privacy Policy</span>
              <span className="cursor-pointer hover:text-primary transition-colors">Terms of Service</span>
              <span className="cursor-pointer hover:text-primary transition-colors">Data Protection</span>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          © 2026 DeepGuard — Election Commission of India Initiative
        </div>
      </div>
    </footer>
  );
}
