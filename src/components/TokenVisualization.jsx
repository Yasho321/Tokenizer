import { Badge } from "@/components/ui/badge";
import { useTokenizerStore } from "@/store/tokenizerStore";
import { useToast } from "@/hooks/use-toast";
import { TOKEN_TYPES } from "@/lib/tokenizer";
import { Copy, Eye } from "lucide-react";

const TokenVisualization = () => {
  const { tokens, copyToClipboard } = useTokenizerStore();
  const { toast } = useToast();

  const getTokenColorClass = (type) => {
    const colorMap = {
      [TOKEN_TYPES.WORD]: 'bg-token-word/15 text-token-word border-token-word/30 hover:bg-token-word/25 hover:border-token-word/50 hover:shadow-lg hover:shadow-token-word/20',
      [TOKEN_TYPES.NUMBER]: 'bg-token-number/15 text-token-number border-token-number/30 hover:bg-token-number/25 hover:border-token-number/50 hover:shadow-lg hover:shadow-token-number/20',
      [TOKEN_TYPES.PUNCTUATION]: 'bg-token-punctuation/15 text-token-punctuation border-token-punctuation/30 hover:bg-token-punctuation/25 hover:border-token-punctuation/50 hover:shadow-lg hover:shadow-token-punctuation/20',
      [TOKEN_TYPES.WHITESPACE]: 'bg-token-whitespace/15 text-token-whitespace border-token-whitespace/30 hover:bg-token-whitespace/25 hover:border-token-whitespace/50 hover:shadow-lg hover:shadow-token-whitespace/20',
      [TOKEN_TYPES.SPECIAL]: 'bg-token-special/15 text-token-special border-token-special/30 hover:bg-token-special/25 hover:border-token-special/50 hover:shadow-lg hover:shadow-token-special/20'
    };
    return colorMap[type] || 'bg-muted/20 text-muted-foreground border-border';
  };

  const getTokenIcon = (type) => {
    const iconMap = {
      [TOKEN_TYPES.WORD]: '🔤',
      [TOKEN_TYPES.NUMBER]: '🔢',
      [TOKEN_TYPES.PUNCTUATION]: '⚡',
      [TOKEN_TYPES.WHITESPACE]: '␣',
      [TOKEN_TYPES.SPECIAL]: '✨'
    };
    return iconMap[type] || '🎯';
  };

  const handleTokenClick = async (token) => {
    const success = await copyToClipboard(token.text);
    if (success) {
      toast({
        title: "Token Copied!",
        description: `"${token.text}" copied to clipboard`,
        duration: 2000,
      });
    }
  };

  const renderToken = (token) => {
    const displayText = token.type === TOKEN_TYPES.WHITESPACE 
      ? token.text.replace(/ /g, '·').replace(/\t/g, '→').replace(/\n/g, '↵')
      : token.text;

    return displayText;
  };

  if (tokens.length === 0) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-center space-y-4">
          <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-primary/10 border border-primary/20 flex items-center justify-center mb-6">
            <Eye className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Ready to Tokenize</h3>
            <p className="text-muted-foreground">Enter some text above to see the magic happen</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Token display */}
      <div className="relative">
        <div className="flex flex-wrap gap-3 p-6 bg-muted/10 rounded-xl border border-border/30 backdrop-blur-sm">
          {tokens.map((token, index) => (
            <div
              key={index}
              className={`group relative cursor-pointer transition-all duration-200 transform hover:scale-105 ${getTokenColorClass(token.type)} rounded-lg px-3 py-2 border font-mono text-sm flex items-center gap-2`}
              onClick={() => handleTokenClick(token)}
              title={`Type: ${token.type} | Click to copy`}
            >
              <span className="opacity-60 text-xs">{getTokenIcon(token.type)}</span>
              <span className="font-medium">{renderToken(token)}</span>
              <Copy className="w-3 h-3 opacity-0 group-hover:opacity-60 transition-opacity duration-200" />
            </div>
          ))}
        </div>
        
        {/* Floating stats */}
        <div className="absolute -top-3 -right-3 bg-primary/90 text-primary-foreground rounded-full px-3 py-1 text-xs font-semibold shadow-lg">
          {tokens.length} tokens
        </div>
      </div>
      
      {/* Enhanced legend */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {Object.values(TOKEN_TYPES).map((type) => (
          <div key={type} className="flex items-center gap-2 p-3 bg-card/30 rounded-lg border border-border/20">
            <span className="text-lg">{getTokenIcon(type)}</span>
            <div>
              <div className={`w-3 h-3 rounded-full ${getTokenColorClass(type).split(' ')[0]}`}></div>
              <span className="text-xs font-medium capitalize">{type}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TokenVisualization;