"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import Card from "@/components/ui/card";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
  const [authError, setAuthError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsLoading(true);
      setAuthError(null);

      const result = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (result?.error) {
        setAuthError("Invalid email or password");
        return;
      }

      router.push(callbackUrl);
    } catch (error) {
      setAuthError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuthSignIn = (provider: string) => {
    setIsLoading(true);
    signIn(provider, { callbackUrl });
  };
  
  const handleDemoSignIn = (email: string, password: string) => {
    setIsLoading(true);
    signIn("credentials", {
      email,
      password,
      callbackUrl,
    });
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 py-12 dark:bg-gray-900 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Greenhouse Management System
          </h1>
          <h2 className="mt-2 text-xl text-gray-600 dark:text-gray-400">
            Sign in to your account
          </h2>
        </div>

        <Card className="mt-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {authError && (
              <div className="rounded-md bg-red-50 p-4 dark:bg-red-900/20">
                <p className="text-sm text-red-800 dark:text-red-400">
                  {authError}
                </p>
              </div>
            )}

            <div>
              <Input
                id="email"
                type="email"
                label="Email address"
                autoComplete="email"
                error={errors.email?.message}
                {...register("email")}
              />
            </div>

            <div>
              <Input
                id="password"
                type="password"
                label="Password"
                autoComplete="current-password"
                error={errors.password?.message}
                {...register("password")}
              />
            </div>

            <div>
              <Button type="submit" fullWidth isLoading={isLoading}>
                Sign in
              </Button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => handleOAuthSignIn("google")}
                disabled={isLoading}
              >
                <span className="sr-only">Sign in with Google</span>
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path
                    d="M12.545 10.239v3.818h5.556c-.23 1.438-.916 2.65-1.952 3.46-1.063.81-2.525 1.29-4.183 1.29-3.226 0-5.96-2.154-6.934-5.036-.16-.468-.253-.96-.253-1.476 0-.511.094-1.003.253-1.47.974-2.886 3.708-5.039 6.934-5.039 1.814 0 3.442.645 4.71 1.916l2.999-2.997C17.651 3.149 15.25 2 12.545 2 7.021 2 2.543 6.477 2.543 12s4.478 10 10.002 10c3.007 0 5.478-.982 7.29-2.668 1.879-1.736 2.967-4.299 2.967-7.345 0-.79-.073-1.551-.212-2.292h-10.04z"
                    fill="currentColor"
                  />
                </svg>
                <span className="ml-2">Google</span>
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={() => handleOAuthSignIn("azure-ad")}
                disabled={isLoading}
              >
                <span className="sr-only">Sign in with Microsoft</span>
                <svg className="h-5 w-5" viewBox="0 0 23 23">
                  <path
                    d="M0 0h10.931v10.931H0V0zm12.069 0H23v10.931H12.069V0zM0 12.069h10.931V23H0V12.069zm12.069 0H23V23H12.069V12.069z"
                    fill="currentColor"
                  />
                </svg>
                <span className="ml-2">Microsoft</span>
              </Button>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Demo logins:
            </p>
            <div className="mt-3 grid grid-cols-3 gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleDemoSignIn("admin@example.com", "admin123")}
                disabled={isLoading}
              >
                Admin
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleDemoSignIn("inspector@example.com", "inspector123")}
                disabled={isLoading}
              >
                Inspector
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleDemoSignIn("reviewer@example.com", "reviewer123")}
                disabled={isLoading}
              >
                Reviewer
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}