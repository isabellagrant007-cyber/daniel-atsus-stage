import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";

const Auth = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"signin" | "signup" | "forgot">("signin");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate("/admin", { replace: true });
    });
  }, [navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/admin` },
        });
        if (error) throw error;
        toast({ title: "Account created", description: "You can now sign in." });
        setMode("signin");
      } else if (mode === "forgot") {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/reset-password`,
        });
        if (error) throw error;
        toast({ title: "Check your email", description: "A password reset link has been sent." });
        setMode("signin");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate("/admin", { replace: true });
      }
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-background">
      <form onSubmit={submit} className="w-full max-w-sm space-y-6 border border-gold/20 p-8 rounded-sm">
        <div className="text-center">
          <p className="text-gold text-[10px] tracking-[0.4em] uppercase mb-3">Admin</p>
          <h1 className="font-serif text-3xl font-light">
            {mode === "signin" ? "Sign In" : mode === "signup" ? "Create Account" : "Reset Password"}
          </h1>
        </div>
        <div className="space-y-3">
          <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          {mode !== "forgot" && (
            <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} />
          )}
        </div>
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "..." : mode === "signin" ? "Sign In" : mode === "signup" ? "Sign Up" : "Send Reset Link"}
        </Button>
        <div className="flex flex-col gap-2 text-center">
          {mode === "signin" && (
            <button type="button" onClick={() => setMode("forgot")} className="text-xs text-muted-foreground hover:text-gold transition">
              Forgot password?
            </button>
          )}
          <button type="button" onClick={() => setMode(mode === "signin" ? "signup" : "signin")} className="text-xs text-muted-foreground hover:text-gold transition">
            {mode === "signin" ? "Need an account? Sign up" : mode === "signup" ? "Have an account? Sign in" : "Back to sign in"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Auth;
