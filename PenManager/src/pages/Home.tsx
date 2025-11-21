import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ModeToggle } from "@/components/mode-toggle";
import { LanguageToggle } from "@/components/language-toggle";

export default function Home() {
  const navigate = useNavigate();

  const handleGoToManager = () => {
    navigate("/manager");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header with theme toggle */}
      <header className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center gap-0 h-10">
          <span className="text-blue-500 font-bold text-2xl">PenApi</span>
        </div>
        <div className="flex items-center gap-4">
          <LanguageToggle />
          <ModeToggle />
        </div>
      </header>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="flex items-center gap-0 h-12">
                <span className="text-blue-500 font-bold text-4xl">PenApi</span>
              </div>
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-4">
              PenApi Manager
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              Modern web interface for WhatsApp API management
            </p>
            <Badge variant="secondary" className="text-sm px-3 py-1">
              Version 2.0.0
            </Badge>
          </div>

          {/* Main Card */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                Welcome to PenApi Manager
              </CardTitle>
              <CardDescription>
                A powerful, modern dashboard for managing your WhatsApp API instances
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="pt-6 border-t border-border">
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Button
                    onClick={handleGoToManager}
                    size="lg"
                    className="px-8 py-3"
                  >
                    Access Manager Dashboard
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
