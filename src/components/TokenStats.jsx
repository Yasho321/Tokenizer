import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useTokenizerStore } from "@/store/tokenizerStore";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, 
  Hash, 
  Type, 
  Calculator,
  Dot,
  Space,
  Sparkles,
  FileText,
  Database,
  TrendingUp
} from "lucide-react";

const TokenStats = () => {
  const { stats } = useTokenizerStore();

  const statItems = [
    {
      icon: Hash,
      label: "Total Tokens",
      value: stats.totalTokens,
      color: "text-primary",
      bgColor: "bg-primary/10",
      description: "Total number of tokens"
    },
    {
      icon: Type,
      label: "Words",
      value: stats.words,
      color: "text-token-word",
      bgColor: "bg-token-word/10",
      description: "Alphabetic tokens"
    },
    {
      icon: Calculator,
      label: "Numbers",
      value: stats.numbers,
      color: "text-token-number",
      bgColor: "bg-token-number/10",
      description: "Numeric tokens"
    },
    {
      icon: Dot,
      label: "Punctuation",
      value: stats.punctuation,
      color: "text-token-punctuation",
      bgColor: "bg-token-punctuation/10",
      description: "Punctuation marks"
    },
    {
      icon: Space,
      label: "Whitespace",
      value: stats.whitespace,
      color: "text-token-whitespace",
      bgColor: "bg-token-whitespace/10",
      description: "Spaces and breaks"
    },
    {
      icon: Sparkles,
      label: "Special",
      value: stats.special,
      color: "text-token-special",
      bgColor: "bg-token-special/10",
      description: "Special characters"
    }
  ];

  const overviewStats = [
    {
      icon: FileText,
      label: "Characters",
      value: stats.characters,
      description: "Including spaces"
    },
    {
      icon: FileText,
      label: "Chars (no spaces)",
      value: stats.charactersWithoutSpaces,
      description: "Excluding whitespace"
    },
    {
      icon: Database,
      label: "Unique Tokens",
      value: stats.vocabularySize,
      description: "In current input"
    },
    {
      icon: TrendingUp,
      label: "Total Vocabulary",
      value: stats.totalVocabularySize,
      description: "Learned across session"
    }
  ];

  return (
    <div className="grid grid-cols-1 gap-6">
      {/* Token type breakdown */}
      <Card className="bg-gradient-secondary border-border/50 shadow-card">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3 text-xl">
            <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-primary" />
            </div>
            Token Breakdown
          </CardTitle>
          <CardDescription>
            Analysis by token type with detailed counts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {statItems.map((item) => {
              const Icon = item.icon;
              return (
                <div 
                  key={item.label} 
                  className="group p-4 bg-card/30 rounded-xl border border-border/30 hover:border-border/50 transition-all duration-200 hover:shadow-lg backdrop-blur-sm"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-10 h-10 ${item.bgColor} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                      <Icon className={`w-5 h-5 ${item.color}`} />
                    </div>
                    <Badge className="bg-foreground/10 text-foreground border-border/50 font-mono text-lg font-bold px-3">
                      {item.value}
                    </Badge>
                  </div>
                  <div>
                    <p className="font-semibold text-sm mb-1">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Overview statistics */}
      <Card className="bg-gradient-secondary border-border/50 shadow-card">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3 text-xl">
            <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
              <Database className="w-5 h-5 text-primary" />
            </div>
            Overview Statistics
          </CardTitle>
          <CardDescription>
            Character counts and vocabulary metrics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {overviewStats.map((item) => {
              const Icon = item.icon;
              return (
                <div 
                  key={item.label} 
                  className="flex items-center justify-between p-4 bg-card/30 rounded-xl border border-border/30 hover:border-border/50 transition-all duration-200 hover:shadow-lg group backdrop-blur-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-200">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{item.label}</p>
                      <p className="text-xs text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                  <Badge className="bg-primary/20 text-primary border-primary/30 font-mono text-lg font-bold px-3">
                    {item.value}
                  </Badge>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TokenStats;