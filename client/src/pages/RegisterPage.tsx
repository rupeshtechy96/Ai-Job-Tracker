// client/src/pages/RegisterPage.tsx

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, LockKeyhole, Mail, UserRound } from "lucide-react";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import { useAuth } from "../hooks/useAuth";

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [name, setName] = useState("Rupesh");
  const [email, setEmail] = useState("rupesh@example.com");
  const [password, setPassword] = useState("password123");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setError("");
      setIsSubmitting(true);
      await register({ name, email, password });
      navigate("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-10 sm:px-8">
      <div className="w-full max-w-lg">
        <div className="mb-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">Create account</p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-white">Start tracking smartly</h1>
          <p className="mt-2 text-sm text-slate-400">
            Create your account and manage every job application from one dashboard.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-[28px] border border-white/10 bg-slate-900/70 p-6 shadow-2xl shadow-cyan-500/5 backdrop-blur-xl"
        >
          <div className="grid gap-4">
            <Input
              label="Full name"
              placeholder="Enter your name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              leftIcon={<UserRound size={16} />}
            />

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
              placeholder="Create a strong password"
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
            Create Account
          </Button>

          <p className="mt-5 text-center text-sm text-slate-400">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-cyan-300 hover:text-cyan-200">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}