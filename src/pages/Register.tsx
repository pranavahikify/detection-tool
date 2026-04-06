import { useState } from "react";
import { Link } from "react-router-dom";
import { Shield, Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

export default function Register() {
  const [showPass, setShowPass] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Registration feature will be available with backend integration");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <Link to="/" className="flex items-center justify-center gap-2 mb-8">
          <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
            <Shield className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-heading font-bold text-xl text-foreground">DeepGuard</span>
        </Link>

        <div className="rounded-xl border border-border bg-card p-8">
          <h1 className="font-heading text-2xl font-bold text-center mb-2 text-foreground">Create Account</h1>
          <p className="text-sm text-muted-foreground text-center mb-6">Join DeepGuard to help protect Indian elections</p>

          <form onSubmit={handleRegister} className="space-y-4">
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Full Name" className="pl-10 bg-secondary border-border" required />
            </div>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input type="email" placeholder="Email address" className="pl-10 bg-secondary border-border" required />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input type={showPass ? "text" : "password"} placeholder="Password" className="pl-10 pr-10 bg-secondary border-border" required />
              <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <Select>
              <SelectTrigger className="bg-secondary border-border">
                <SelectValue placeholder="I am a..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="citizen">Citizen / Voter</SelectItem>
                <SelectItem value="media">Media Professional</SelectItem>
                <SelectItem value="party">Political Party Representative</SelectItem>
                <SelectItem value="official">ECI Official</SelectItem>
              </SelectContent>
            </Select>
            <Button type="submit" className="w-full gradient-primary text-primary-foreground font-semibold shadow-glow">
              Create Account
            </Button>
          </form>

          <p className="text-sm text-muted-foreground text-center mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:underline font-medium">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
