"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ArrowLeft, Compass, Loader2 } from "lucide-react";
import { useState } from "react";
import GoogleColoredIcon from "../assets/google-colored-icon";
import { googleAuth, signup } from "@/api/actions/auth";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion"
import { Header } from "@/components/Header";

const signupSchema = z
  .object({
    email: z.string().email("Please enter a valid email"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .max(32, "Password must not exceed 32 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[\S]{8,32}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character"
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type SignUpFormType = z.infer<typeof signupSchema>;

export default function SignUpPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<SignUpFormType>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: SignUpFormType) => {
    setError("");
    setLoading(true);

    try {
      await signup(data);
      toast.success("Registration successful! Redirecting to dashboard...", {
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
          : "An error occurred while signing up. Please try again.";
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
        <Link href="/">
          <Button
            variant="outline"
            className="border-teal-500/30 text-teal-600 hover:bg-teal-500/10 px-6 h-11 rounded-full text-base bg-white/50 backdrop-blur-sm shadow-sm mt-6 mb-4"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Go Back
          </Button>
        </Link>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative w-full max-w-md rounded-3xl bg-white/70 backdrop-blur-xl shadow-2xl border border-white/50 p-8"
      >
        <div className="text-center mb-6">
          <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-linear-to-br from-brand-teal to-brand-sky flex items-center justify-center shadow-lg">
            <Compass className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900">Create an Account</h2>
          <p className="text-slate-600 mt-1">Join TourGuide and get started</p>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* EMAIL */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-slate-700">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              {...form.register("email")}
              disabled={loading}
              className="bg-white/70 backdrop-blur-sm"
            />
            {form.formState.errors.email && (
              <p className="text-red-500 text-sm">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>

          {/* PASSWORD */}
          <div className="space-y-2">
            <Label htmlFor="password" className="text-slate-700">Password</Label>

            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                {...form.register("password")}
                disabled={loading}
                className="pr-10 bg-white/70 backdrop-blur-sm"
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff className="h-5 w-5"/> : <Eye className="h-5 w-5"/>}
              </button>
            </div>

            {form.formState.errors.password && (
              <p className="text-red-500 text-sm">
                {form.formState.errors.password.message}
              </p>
            )}
          </div>

          {/* CONFIRM PASSWORD */}
          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-slate-700">Confirm Password</Label>

            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                {...form.register("confirmPassword")}
                disabled={loading}
                className="pr-10 bg-white/70 backdrop-blur-sm"
              />

              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showConfirmPassword ? <EyeOff className="h-5 w-5"/> : <Eye className="h-5 w-5"/>}
              </button>
            </div>

            {form.formState.errors.confirmPassword && (
              <p className="text-red-500 text-sm">
                {form.formState.errors.confirmPassword.message}
              </p>
            )}
          </div>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-muted-foreground">
                    or
                  </span>
                </div>
              </div>

            <Button
              variant="outline"
              type="button"
              onClick={handleGoogleAuth}
              className="w-full cursor-pointer hover:bg-white/10 transition-colors"
              size={"lg"}
            >
              <GoogleColoredIcon className="mr-2 h-4 w-4" />
              {loading ? "Signing up..." : "Sign up with Google"}
            </Button>
            <Button
            type="submit"
            className="w-full h-12 text-white text-lg bg-linear-to-r from-brand-teal via-brand-blush to-brand-sky hover:opacity-90 shadow-xl cursor-pointer rounded-full"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin"/> Creating account...
              </>
            ) : (
              "Sign Up"
            )}
          </Button>

          <p className="text-center text-sm text-slate-600">
            Already have an account?{" "}
            <Link href="/login" className="text-brand-teal font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </form>
        </motion.div>
        </div>
    </div>
  );

}
