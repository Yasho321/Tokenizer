import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTokenizerStore } from "@/store/tokenizerStore";
import { RotateCcw, ArrowDown, Hash } from "lucide-react";

const TokenDecoding = () => {
  const { decodeInput, decodedText, setDecodeInput, resetVocabulary } = useTokenizerStore();

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {/* Input section */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Hash className="w-4 h-4 text-primary" />
            <label className="text-sm font-medium text-foreground">Token IDs</label>
          </div>
          <Input
            placeholder="1, 2, 3, 4..."
            value={decodeInput}
            onChange={(e) => setDecodeInput(e.target.value)}
            className="font-mono bg-muted/20 border-border/50 focus:border-primary/50 focus:ring-primary/20"
          />
          <p className="text-xs text-muted-foreground">
            Enter comma-separated token IDs
          </p>
        </div>

        {/* Arrow indicator */}
        {decodeInput && (
          <div className="flex justify-center">
            <div className="flex items-center justify-center w-8 h-8 bg-primary/20 rounded-full border border-primary/30">
              <ArrowDown className="w-4 h-4 text-primary" />
            </div>
          </div>
        )}

        {/* Decoded output */}
        {decodedText && (
          <div className="p-4 bg-gradient-secondary rounded-lg border border-border/30">
            <p className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
              <span className="text-primary">📝</span>
              Decoded Text
            </p>
            <div className="p-3 bg-muted/20 rounded-md border border-border/30 font-mono text-sm min-h-[60px] flex items-center">
              {decodedText || (
                <span className="text-muted-foreground italic">
                  No valid IDs to decode
                </span>
              )}
            </div>
          </div>
        )}

        {/* Reset section */}
        <div className="pt-4 border-t border-border/30">
          <Button 
            variant="outline" 
            onClick={resetVocabulary}
            className="w-full bg-destructive/5 border-destructive/20 text-destructive hover:bg-destructive/10 hover:border-destructive/40"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset Vocabulary
          </Button>
          <p className="text-xs text-muted-foreground text-center mt-2">
            Clears all learned tokens and resets the vocabulary
          </p>
        </div>
      </div>
    </div>
  );
};

export default TokenDecoding;