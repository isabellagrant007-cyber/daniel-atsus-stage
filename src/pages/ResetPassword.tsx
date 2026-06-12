import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      toast({ title: "Too short", description: "Password must be at least 6 characters.", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      toast({ title: "Password updated", description: "You can now sign in with your new password." });
      navigate("/auth", { replace: true });
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
          <h1 className="font-serif text-3xl font-light">Reset Password</h1>
        </div>
        <p className="text-xs text-muted-foreground text-center">Enter a new password for your account.</p>
        <div className="space-y-3">
          <Input type="password" placeholder="New password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} />
        </div>
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "..." : "Update Password"}
        </Button>
      </form>
    </div>
  );
};

export default ResetPassword;
