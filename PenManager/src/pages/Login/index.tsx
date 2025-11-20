import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate, Link } from "react-router-dom";
import { z } from "zod";
import { useState } from "react";

import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";

import { authService } from "@/lib/queries/auth/authService";
import { getToken, saveToken, TOKEN_ID } from "@/lib/queries/token";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});
type LoginSchema = z.infer<typeof loginSchema>;

function Login() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loginForm = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLogin: SubmitHandler<LoginSchema> = async (data) => {
    setIsLoading(true);
    setError(null);

    try {
      // Get API URL from localStorage or use default
      const apiUrl = getToken(TOKEN_ID.API_URL) || import.meta.env.VITE_API_URL || "http://localhost:8080";
      
      // Ensure API URL is saved
      if (!getToken(TOKEN_ID.API_URL)) {
        saveToken({ url: apiUrl });
      }

      const result = await authService.login({
        url: apiUrl,
        email: data.email,
        password: data.password,
      });

      if (result) {
        navigate("/manager/");
      } else {
        setError("Invalid email or password");
      }
    } catch (error: any) {
      setError(error.response?.data?.message || "Login failed. Please try again.");
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
            <CardTitle className="text-center">{t("login.title", "Welcome Back")}</CardTitle>
            <CardDescription className="text-center">
              {t("login.description", "Sign in to manage your WhatsApp instances")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...loginForm}>
              <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-4">
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <FormField
                  control={loginForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("login.email", "Email")}</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder={t("login.emailPlaceholder", "Enter your email")}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={loginForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("login.password", "Password")}</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder={t("login.passwordPlaceholder", "Enter your password")}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? t("login.signingIn", "Signing in...") : t("login.signIn", "Sign In")}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <div className="text-sm text-center">
              {t("login.noAccount", "Don't have an account?")}{" "}
              <Link to="/manager/register" className="text-blue-500 hover:underline">
                {t("login.signUp", "Sign up")}
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
      <Footer />
    </div>
  );
}

export default Login;