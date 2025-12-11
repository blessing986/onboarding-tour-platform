"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ArrowLeft, Compass, Loader2 } from "lucide-react";
import { useState } from "react";
import GoogleColoredIcon from "../assets/google-colored-icon";
import { googleAuth, login } from "@/api/actions/auth";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormType = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginFormType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormType) => {
    setError("");
    setLoading(true);

    try {
      await login(data);
      toast.success("Login successful! Redirecting to dashboard...", {
        style: {
          background: "#10b981",
          color: "white",
          border: "none",
        },
      });
      router.push("/dashboard");
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "An error occurred while logging in. Please try again.";
      toast.error(errorMessage, {
        style: {
          background: "#ef4444",
          color: "white",
          border: "none",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    try {
      googleAuth();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-linear-to-br from-brand-sky/20 via-brand-blush/10 to-brand-sage/20 text-slate-900">
      <div className="w-full max-w-md space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="relative w-full max-w-md rounded-3xl bg-white/70 backdrop-blur-xl shadow-sm border border-white/50 p-8"
        >
          <div className="text-center">
            <Link href="/">
              <p className="flex items-center justify-start text-base text-[#2A1E5C] font-medium hover:font-semibold transition-all cursor-pointer group">
                <ArrowLeft className="mr-2 h-5 w-5 group-hover:-translate-x-1 group-hover:scale-110 transition-all duration-200" />
                Go back
              </p>
            </Link>
            <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-[#2A1E5C] flex items-center justify-center">
              <Compass className="h-8 w-8 text-white" />
            </div>

            <h2 className="text-3xl font-bold text-[#2A1E5C]">Welcome Back</h2>
            <p className="text-slate-600 mt-1">
              Sign in to your TourGuide account
            </p>
          </div>

          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-8 space-y-5"
          >
            {/* EMAIL */}
            <div>
              <Label className="text-slate-700">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                {...form.register("email")}
                disabled={loading}
                className="bg-white/70 rounded-xl py-6 px-4"
              />
              {form.formState.errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {form.formState.errors.email.message}
                </p>
              )}
            </div>

            {/* PASSWORD */}
            <div>
              <Label className="text-slate-700">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  {...form.register("password")}
                  disabled={loading}
                  className="bg-white/70 rounded-xl py-6 px-4"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>

              {form.formState.errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {form.formState.errors.password.message}
                </p>
              )}
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-muted-foreground">or</span>
              </div>
            </div>

            <Button
              variant="outline"
              type="button"
              onClick={handleGoogleAuth}
              className="w-full cursor-pointer hover:bg-white/10 hover:text-[#2A1E5C] transition-colors"
              size={"lg"}
            >
              <GoogleColoredIcon className="mr-2 h-4 w-4" />
              {loading ? "Signing in..." : "Sign in with Google"}
            </Button>
            <Button
              type="submit"
              className="w-full h-12 text-white bg-[#2A1E5C] hover:bg-[#2A1E5C]/80 cursor-pointer rounded-full"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Signing
                  in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>

            <p className="text-center text-sm text-slate-600">
              Don&apos;t have an account?{" "}
              <Link
                href="/sign-up"
                className="text-[#2A1E5C] font-medium hover:underline"
              >
                Sign up
              </Link>
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
