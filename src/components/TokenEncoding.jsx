import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTokenizerStore } from "@/store/tokenizerStore";
import { useToast } from "@/hooks/use-toast";
import { Copy, FileText, Hash, ArrowRight } from "lucide-react";

const TokenEncoding = () => {
  const { encodedTokens, inputText, getEncodedIds, copyToClipboard } = useTokenizerStore();
  const { toast } = useToast();

  const handleCopyIds = async () => {
    const ids = getEncodedIds();
    const idsString = ids.join(', ');
    const success = await copyToClipboard(idsString);
    
    if (success) {
      toast({
        title: "Encoded IDs Copied!",
        description: `${ids.length} token IDs copied to clipboard`,
        duration: 2000,
      });
    }
  };

  const handleCopyText = async () => {
    const success = await copyToClipboard(inputText);
    
    if (success) {
      toast({
        title: "Original Text Copied!",
        description: "Text copied to clipboard",
        duration: 2000,
      });
    }
  };

  if (encodedTokens.length === 0) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-center space-y-4">
          <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-primary/10 border border-primary/20 flex items-center justify-center mb-6">
            <Hash className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Ready to Encode</h3>
            <p className="text-muted-foreground">Text will be encoded into numerical IDs here</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Control buttons */}
      <div className="grid grid-cols-2 gap-3">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleCopyIds}
          className="bg-primary/5 border-primary/20 hover:bg-primary/10 hover:border-primary/40 text-primary"
        >
          <Copy className="w-4 h-4 mr-2" />
          Copy IDs
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleCopyText}
          className="bg-muted/20 border-border/40 hover:bg-muted/30"
        >
          <FileText className="w-4 h-4 mr-2" />
          Copy Text
        </Button>
      </div>

      {/* Token mapping display */}
      <div className="space-y-4">
        <div className="space-y-3 max-h-64 overflow-y-auto scrollbar-thin">
          {encodedTokens.map((token, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-muted/10 rounded-lg border border-border/30 hover:bg-muted/20 transition-colors duration-200 group"
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <Badge 
                  variant="outline" 
                  className="font-mono text-xs shrink-0 bg-card border-border/50"
                >
                  {token.text === ' ' ? '·' : token.text === '\n' ? '↵' : token.text}
                </Badge>
                <ArrowRight className="w-3 h-3 text-muted-foreground shrink-0" />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">ID:</span>
                <Badge className="bg-primary/20 text-primary border-primary/30 font-mono font-semibold">
                  {token.id}
                </Badge>
              </div>
            </div>
          ))}
        </div>

        {/* Encoded sequence display */}
        <div className="p-4 bg-gradient-secondary rounded-lg border border-border/30">
          <div className="flex items-center gap-2 mb-3">
            <Hash className="w-4 h-4 text-primary" />
            <p className="text-sm font-medium text-foreground">Encoded Sequence</p>
          </div>
          <div className="font-mono text-sm bg-muted/20 p-4 rounded-md border border-border/30 break-all">
            <span className="text-muted-foreground">[</span>
            {getEncodedIds().map((id, index) => (
              <span key={index}>
                <span className="text-primary font-semibold">{id}</span>
                {index < getEncodedIds().length - 1 && <span className="text-muted-foreground">, </span>}
              </span>
            ))}
            <span className="text-muted-foreground">]</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenEncoding;