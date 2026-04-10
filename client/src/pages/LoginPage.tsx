// client/src/pages/LoginPage.tsx

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, LockKeyhole, Mail, Sparkles } from "lucide-react";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import { useAuth } from "../hooks/useAuth";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("demo@tracker.com");
  const [password, setPassword] = useState("password123");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setError("");
      setIsSubmitting(true);
      await login({ email, password });
      navigate("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-[1.08fr_0.92fr]">
      <div className="relative hidden overflow-hidden bg-slate-950 lg:block">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(6,182,212,0.20),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(139,92,246,0.18),transparent_30%)]" />
        <div className="relative flex h-full flex-col justify-between p-10">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-cyan-200">
              <Sparkles size={16} />
              AI Assisted Job Tracker
            </div>
            <h1 className="mt-8 max-w-xl text-5xl font-bold tracking-tight text-white">
              Organize every application with a cleaner, smarter workflow.
            </h1>
            <p className="mt-5 max-w-lg text-lg leading-8 text-slate-300">
              Manage roles, parse job descriptions with AI, track each stage, and prepare stronger resumes.
            </p>
          </div>

          <div className="grid gap-4">
            {[
              "Beautiful kanban workflow for job tracking",
              "AI parser to extract company, role, skills, and location",
              "Tailored resume bullet suggestions for every role",
            ].map((item) => (
              <div key={item} className="rounded-3xl border border-white/10 bg-white/5 p-5 text-slate-200">
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center px-6 py-10 sm:px-8">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">Welcome back</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white">Sign in to continue</h2>
            <p className="mt-2 text-sm text-slate-400">Access your dashboard and continue tracking applications.</p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-[28px] border border-white/10 bg-slate-900/70 p-6 shadow-2xl shadow-cyan-500/5 backdrop-blur-xl"
          >
            <div className="space-y-4">
              <Input
                label="Email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                leftIcon={<Mail size={16} />}
              />

              <Input
                label="Password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                leftIcon={<LockKeyhole size={16} />}
              />
            </div>

            {error ? (
              <div className="mt-4 rounded-2xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
                {error}
              </div>
            ) : null}

            <Button type="submit" fullWidth className="mt-6" isLoading={isSubmitting} rightIcon={<ArrowRight size={16} />}>
              Sign In
            </Button>

            <p className="mt-5 text-center text-sm text-slate-400">
              Don’t have an account?{" "}
              <Link to="/register" className="font-medium text-cyan-300 hover:text-cyan-200">
                Create one
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}