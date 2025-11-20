import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { authService } from "@/lib/queries/auth/authService";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").optional(),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8080";
      const result = await authService.register({
        url: apiUrl,
        email: data.email,
        password: data.password,
        name: data.name,
      });

      if (result) {
        setSuccess("Account created successfully! Redirecting to dashboard...");
        setTimeout(() => {
          navigate("/manager/");
        }, 2000);
      } else {
        setError("Registration failed. Please try again.");
      }
    } catch (error: any) {
      setError(error.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex items-center justify-center pt-2">
        <div className="flex items-center gap-1 h-10">
          <span className="text-blue-500 font-bold text-2xl">Pen</span>
          <span className="text-white font-bold text-2xl">Api</span>
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center p-8">
        <Card className="b-none w-[400px] shadow-none">
          <CardHeader>
            <CardTitle className="text-center">{t("register.title", "Create Account")}</CardTitle>
            <CardDescription className="text-center">
              {t("register.description", "Join PenApi and start managing your WhatsApp instances")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                {success && (
                  <Alert>
                    <AlertDescription>{success}</AlertDescription>
                  </Alert>
                )}

                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("register.name", "Name (Optional)")}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t("register.namePlaceholder", "Enter your name")}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("register.email", "Email")}</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder={t("register.emailPlaceholder", "Enter your email")}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("register.password", "Password")}</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder={t("register.passwordPlaceholder", "Enter your password")}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("register.confirmPassword", "Confirm Password")}</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder={t("register.confirmPasswordPlaceholder", "Confirm your password")}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? t("register.creating", "Creating Account...") : t("register.create", "Create Account")}
                </Button>
              </form>
            </Form>

            <div className="mt-6 text-center text-sm">
              {t("register.hasAccount", "Already have an account?")}{" "}
              <Link to="/manager/login" className="text-blue-500 hover:underline">
                {t("register.signIn", "Sign in")}
              </Link>
            </div>

            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-sm mb-2">{t("register.plans.title", "Available Plans")}</h4>
              <div className="space-y-1 text-xs text-gray-600">
                <div>• <strong>FREE:</strong> 1 instance</div>
                <div>• <strong>BASIC:</strong> 5 instances - $3/month</div>
                <div>• <strong>PREMIUM:</strong> 8 instances - $10/month</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}