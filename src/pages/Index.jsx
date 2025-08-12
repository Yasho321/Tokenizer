import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, Zap, Code2, Sparkles } from "lucide-react";
import TextInput from "@/components/TextInput";
import TokenVisualization from "@/components/TokenVisualization";
import TokenEncoding from "@/components/TokenEncoding";
import TokenDecoding from "@/components/TokenDecoding";
import TokenStats from "@/components/TokenStats";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Header */}
      <header className="relative overflow-hidden border-b border-border/50">
        <div className="absolute inset-0 bg-gradient-hero"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        
        <div className="relative container mx-auto px-6 py-12">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-glow float">
                  <Code2 className="w-8 h-8 text-black font-bold" />
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                  <Sparkles className="w-3 h-3 text-black" />
                </div>
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
                  AI Tokenizer Studio
                </h1>
                <p className="text-muted-foreground text-lg">
                  Explore how AI models break down and understand text — powered by cutting-edge tokenization
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                <Zap className="w-3 h-3 mr-1" />
                Live Demo
              </Badge>
              <Button 
                variant="outline" 
                size="sm"
                className="border-primary/20 hover:border-primary/40 hover:bg-primary/5"
                asChild
              >
                <a
                  href="https://github.com/PiyushRepos/genai-tokenizer"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="w-4 h-4 mr-2" />
                  Source Code
                </a>
              </Button>
            </div>
          </div>

          {/* Feature highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="flex items-center gap-3 p-4 bg-card/30 rounded-xl border border-border/30 backdrop-blur-sm">
              <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                <span className="text-primary font-semibold">🔤</span>
              </div>
              <div>
                <h3 className="font-semibold text-sm">Real-time Tokenization</h3>
                <p className="text-xs text-muted-foreground">See tokens as you type</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-card/30 rounded-xl border border-border/30 backdrop-blur-sm">
              <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                <span className="text-primary font-semibold">🔢</span>
              </div>
              <div>
                <h3 className="font-semibold text-sm">ID Encoding</h3>
                <p className="text-xs text-muted-foreground">Token to ID mapping</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-card/30 rounded-xl border border-border/30 backdrop-blur-sm">
              <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                <span className="text-primary font-semibold">📊</span>
              </div>
              <div>
                <h3 className="font-semibold text-sm">Smart Analytics</h3>
                <p className="text-xs text-muted-foreground">Detailed statistics</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        {/* Input & Encoding Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <Card className="bg-gradient-secondary border-border/50 shadow-card glow-border animate-slide-in-left">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                  <span className="text-primary font-bold">✏️</span>
                </div>
                Text Input
              </CardTitle>
              <CardDescription>
                Enter your text and watch the magic happen
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TextInput />
            </CardContent>
          </Card>

          <Card className="bg-gradient-secondary border-border/50 shadow-card glow-border animate-slide-up">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                  <span className="text-primary font-bold">🔐</span>
                </div>
                Token Encoding
              </CardTitle>
              <CardDescription>
                See how tokens map to numerical IDs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TokenEncoding />
            </CardContent>
          </Card>
        </div>

        {/* Visualization Section */}
        <Card className="mb-12 bg-gradient-secondary border-border/50 shadow-card overflow-hidden">
          <CardHeader className="bg-card/50 border-b border-border/30">
            <CardTitle className="flex items-center gap-3 text-xl">
              <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                <span className="text-primary font-bold">🎨</span>
              </div>
              Interactive Token Visualization
            </CardTitle>
            <CardDescription>
              Click any token to copy it • Color-coded by type • Real-time updates
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <TokenVisualization />
          </CardContent>
        </Card>

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Decoding */}
          <Card className="lg:col-span-1 bg-gradient-secondary border-border/50 shadow-card">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-lg">
                <div className="w-7 h-7 bg-primary/20 rounded-lg flex items-center justify-center">
                  <span className="text-primary font-bold text-sm">🔄</span>
                </div>
                Decode
              </CardTitle>
              <CardDescription className="text-xs">
                Convert IDs back to text
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TokenDecoding />
            </CardContent>
          </Card>

          {/* Statistics */}
          <div className="lg:col-span-3">
            <TokenStats />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-card/30 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <p className="text-sm text-muted-foreground mb-1">
                Custom tokenizer implementation • No external dependencies
              </p>
              <p className="text-sm">
                Built by{" "}
                <a 
                  href="https://x.com/_PiyushDev" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80 transition-colors font-medium"
                >
                  Yashovardhan Singh
                </a>
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <a 
                href="https://x.com/_PiyushDev" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                Twitter
              </a>
              <a 
                href="https://www.linkedin.com/in/piyushh04/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                LinkedIn
              </a>
              <a 
                href="https://github.com/PiyushRepos" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;