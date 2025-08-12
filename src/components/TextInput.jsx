import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTokenizerStore, EXAMPLE_TEXTS } from "@/store/tokenizerStore";
import { Trash2, Sparkles, Zap } from "lucide-react";

const TextInput = () => {
  const { inputText, setInputText, clearInput, stats } = useTokenizerStore();

  const handleExampleClick = (example) => {
    setInputText(example);
  };

  return (
    <div className="space-y-6">
      {/* Example chips */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-primary" />
          <p className="text-sm font-medium text-foreground">Quick Examples</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {EXAMPLE_TEXTS.slice(0, 3).map((example, index) => (
            <Badge
              key={index}
              variant="outline"
              className="cursor-pointer bg-muted/30 border-border/50 hover:bg-primary/10 hover:border-primary/30 hover:text-primary transition-all duration-200 text-xs px-3 py-1"
              onClick={() => handleExampleClick(example)}
            >
              {example}
            </Badge>
          ))}
        </div>
      </div>

      {/* Main text input */}
      <div className="space-y-4">
        <div className="relative">
          <Textarea
            placeholder="Type or paste your text here to see the tokenization magic..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="min-h-[140px] resize-none font-mono text-sm bg-muted/20 border-border/50 focus:border-primary/50 focus:ring-primary/20 transition-all duration-200 placeholder:text-muted-foreground/60"
          />
          {inputText && (
            <div className="absolute top-3 right-3">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse-glow"></div>
            </div>
          )}
        </div>
        
        {/* Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Zap className="w-3 h-3 text-primary" />
              <span>{stats.characters} characters</span>
            </div>
            {stats.totalTokens > 0 && (
              <div className="flex items-center gap-1">
                <span className="w-1 h-1 bg-primary rounded-full"></span>
                <span>{stats.totalTokens} tokens</span>
              </div>
            )}
          </div>
          
          {inputText && (
            <Button
              variant="outline"
              size="sm"
              onClick={clearInput}
              className="h-8 bg-destructive/10 border-destructive/20 text-destructive hover:bg-destructive/20 hover:border-destructive/40"
            >
              <Trash2 className="w-3 h-3 mr-1" />
              Clear
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TextInput;