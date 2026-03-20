/**
 * Login — split layout from Figma (Workspace Live frame).
 * Source: https://www.figma.com/design/yJbtdwqRACffdMAXxB7fmU/Untitled?node-id=1-2
 */
import { useState } from "react";
import { motion } from "motion/react";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Loader2 } from "lucide-react";
import { Logo } from "../landing/logo";

interface LoginPageProps {
  onLogin: (email: string, password: string) => void;
  onSignUp: () => void;
  onForgotPassword: () => void;
  error?: string;
  loading?: boolean;
}

const INTEGRATION_LOGOS = ["☁️", "🧡", "💬", "🎧", "💳", "🔵", "📊"];

export function LoginPage({ onLogin, onSignUp, onForgotPassword, error, loading }: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <div className="min-h-[100dvh] flex flex-col lg:flex-row bg-[#0c1222]">
      {/* Left — brand (Figma: 480px) */}
      <aside className="relative hidden lg:flex lg:w-[480px] shrink-0 min-h-[100dvh] overflow-hidden bg-[linear-gradient(122.76deg,#0c1222_0%,#0d1424_20%,#0f1627_40%,#101729_60%,#12192c_80%,#131b2e_100%)]">
        <div className="absolute inset-0 opacity-5 pointer-events-none" aria-hidden>
          <div className="absolute rounded-full border border-white/20 left-[140px] top-[273px] size-[200px]" />
          <div className="absolute rounded-full border border-white/20 left-[80px] top-[213px] size-[320px]" />
          <div className="absolute rounded-full border border-white/20 left-[20px] top-[153px] size-[440px]" />
          <div className="absolute rounded-full border border-white/20 left-[-40px] top-[93px] size-[560px]" />
          <div className="absolute rounded-full border border-white/20 left-[-100px] top-[33px] size-[680px]" />
          <div className="absolute rounded-full border border-white/20 left-[-160px] top-[-27px] size-[800px]" />
        </div>

        <div className="relative z-10 flex flex-col justify-between min-h-[100dvh] w-full px-9 pt-9 pb-9">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="h-[17px] w-9 shrink-0 [&_svg]:h-full [&_svg]:w-auto">
                <Logo width={36} />
              </div>
              <p className="text-[17.5px] font-bold leading-6 tracking-tight text-white">
                <span>Integrate</span>
                <span className="text-white/70">Wise</span>
              </p>
            </div>
            <p className="mt-1.5 text-[10.5px] leading-3.5 tracking-wide text-white/40">
              Integration Intelligence Workspace
            </p>
          </div>

          <div className="space-y-4 max-w-[410px]">
            <div>
              <p className="text-[26px] font-bold leading-[32.8px] tracking-wide text-white">
                Unify your tools.
              </p>
              <p className="text-[26px] font-bold leading-[32.8px] tracking-wide text-[#f54476]">
                Amplify your growth.
              </p>
            </div>
            <p className="text-[12.25px] leading-5 text-white/60 max-w-[336px]">
              Connect every tool in your stack. IntegrateWise turns fragmented data into goal-aligned intelligence — from
              reality to action.
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.62px] text-white/40">Connects with</span>
              <div className="flex flex-wrap items-center gap-1.5">
                {INTEGRATION_LOGOS.map((logo, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.35 + i * 0.06 }}
                    className="size-[24.5px] rounded-md border border-white/10 bg-white/10 flex items-center justify-center text-[12.25px] leading-none"
                  >
                    {logo}
                  </motion.div>
                ))}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.9 }}
                  className="size-[24.5px] rounded-md border border-white/10 bg-white/5 flex items-center justify-center text-[9px] font-bold text-white/40"
                >
                  +40
                </motion.div>
              </div>
            </div>
          </div>

          <p className="text-[10px] leading-[15px] tracking-wide text-white/30">
            © 2026 IntegrateWise. All rights reserved.
          </p>
        </div>
      </aside>

      {/* Right — card area (Figma: #131b2e) */}
      <div className="flex-1 flex flex-col items-center justify-center bg-[#131b2e] min-h-[100dvh] px-6 py-10 sm:px-[121px]">
        {/* Mobile brand */}
        <div className="lg:hidden w-full max-w-[336px] mb-8 flex items-center gap-2.5">
          <Logo width={32} />
          <span className="text-lg font-bold text-white">
            Integrate<span className="text-white/70">Wise</span>
          </span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="w-full max-w-[336px] bg-white rounded-[21px] shadow-[0_25px_50px_rgba(0,0,0,0.2)] p-7"
        >
          <div className="flex flex-col gap-1 mb-8">
            <h1 className="text-[21px] font-bold leading-7 tracking-tight text-[#0f172a]">Welcome back</h1>
            <p className="text-[12.25px] leading-[17.5px] text-[#62748e]">Sign in to your workspace</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="login-email" className="text-[10.5px] font-semibold leading-3.5 text-[#45556c] tracking-wide">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-[#94a3b8] pointer-events-none" />
                <input
                  id="login-email"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  autoComplete="email"
                  className="w-full h-[37px] rounded-[11px] border border-[#e2e8f0] bg-[#f8fafc] pl-9 pr-3.5 py-2 text-[12.25px] text-[#0f172a] placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-[#00a6f4]/25 focus:border-[#00a6f4] transition-shadow"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="login-password" className="text-[10.5px] font-semibold leading-3.5 text-[#45556c] tracking-wide">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-[#94a3b8] pointer-events-none" />
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  className="w-full h-[37px] rounded-[11px] border border-[#e2e8f0] bg-[#f8fafc] pl-9 pr-10 py-2 text-[12.25px] text-[#0f172a] placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-[#00a6f4]/25 focus:border-[#00a6f4] transition-shadow"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#94a3b8] hover:text-[#64748b] p-0.5"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="size-3.5" /> : <Eye className="size-3.5" />}
                </button>
              </div>
            </div>

            <div className="flex justify-end pt-0.5">
              <button
                type="button"
                onClick={onForgotPassword}
                className="text-[10.5px] font-medium leading-3.5 text-[#0084d1] hover:underline"
              >
                Forgot password?
              </button>
            </div>

            {error && (
              <div className="rounded-[11px] border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">{error}</div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="relative mt-1 flex h-[38.5px] w-full items-center justify-center gap-2 rounded-[11px] bg-[#00a6f4] text-sm font-semibold text-white shadow-[0_10px_15px_rgba(0,166,244,0.2),0_4px_6px_rgba(0,166,244,0.2)] transition-opacity hover:opacity-95 disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <>
                  Sign In
                  <ArrowRight className="size-3.5" />
                </>
              )}
            </button>
          </form>

          <div className="flex items-center gap-2.5 my-6">
            <div className="h-px flex-1 bg-[#e2e8f0]" />
            <span className="text-[10px] font-bold uppercase tracking-wide text-[#90a1b9] whitespace-nowrap">
              or continue with
            </span>
            <div className="h-px flex-1 bg-[#e2e8f0]" />
          </div>

          <div className="grid grid-cols-2 gap-2 h-10">
            <button
              type="button"
              className="flex items-center justify-center gap-1.5 rounded-[11px] border border-[#e2e8f0] bg-white text-[12.25px] font-medium text-slate-600 hover:bg-slate-50 transition-colors"
            >
              <span className="text-[15.75px] leading-none font-medium text-slate-400">G</span>
              Google
            </button>
            <button
              type="button"
              className="flex items-center justify-center gap-1.5 rounded-[11px] border border-[#e2e8f0] bg-white text-[12.25px] font-medium text-slate-600 hover:bg-slate-50 transition-colors"
            >
              <span className="text-base leading-none" aria-hidden>
                🔑
              </span>
              SSO
            </button>
          </div>

          <p className="mt-6 text-center text-[12.25px] leading-[21px] text-[#62748e]">
            Don&apos;t have an account?{" "}
            <button type="button" onClick={onSignUp} className="font-semibold text-[#00a6f4] hover:underline">
              Start free trial
            </button>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
