import { Theme, Sentiment } from "@/data/dummyCodeframe";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, ThumbsUp, ThumbsDown, Minus } from "lucide-react";

interface ResponsesPanelProps {
  selectedTheme: Theme | null;
  onResponseClick: (responseId: string, responseText: string) => void;
}

const sentimentConfig: Record<Sentiment, { icon: typeof ThumbsUp; label: string; className: string }> = {
  positive: { icon: ThumbsUp, label: "Positive", className: "text-green-500 bg-green-500/10 border-green-500/30" },
  negative: { icon: ThumbsDown, label: "Negative", className: "text-red-500 bg-red-500/10 border-red-500/30" },
  neutral: { icon: Minus, label: "Neutral", className: "text-muted-foreground bg-muted/50 border-border" },
};

export function ResponsesPanel({ selectedTheme, onResponseClick }: ResponsesPanelProps) {
  if (!selectedTheme) {
    return (
      <Card className="h-full flex items-center justify-center border-border/50 bg-card/30">
        <div className="text-center text-muted-foreground p-6">
          <MessageSquare className="h-12 w-12 mx-auto mb-3 opacity-50" />
          <p className="text-sm">Select a theme to view responses</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="h-full border-border/50 bg-card/30">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <span>{selectedTheme.name}</span>
          <Badge variant="secondary" className="text-xs">
            {selectedTheme.responses.length} responses
          </Badge>
        </CardTitle>
        <p className="text-sm text-muted-foreground">{selectedTheme.description}</p>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[calc(100%-5rem)] px-6 pb-4">
          <div className="space-y-3">
            {selectedTheme.responses.map((response) => {
              const sentiment = sentimentConfig[response.sentiment];
              const SentimentIcon = sentiment.icon;
              return (
                <div
                  key={response.id}
                  onClick={() => onResponseClick(response.id, response.text)}
                  className="p-3 rounded-md border border-border/50 bg-background/50 hover:bg-accent/50 cursor-pointer transition-colors"
                >
                  <p className="text-sm mb-2">{response.text}</p>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs font-mono">
                      {response.code}
                    </Badge>
                    <Badge variant="outline" className={`text-xs flex items-center gap-1 ${sentiment.className}`}>
                      <SentimentIcon className="h-3 w-3" />
                      {sentiment.label}
                    </Badge>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
