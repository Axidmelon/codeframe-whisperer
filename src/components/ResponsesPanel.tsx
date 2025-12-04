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
  positive: { icon: ThumbsUp, label: "Positive", className: "text-emerald-700 bg-emerald-700/10 border-emerald-700/30" },
  negative: { icon: ThumbsDown, label: "Negative", className: "text-red-600 bg-red-600/10 border-red-600/30" },
  neutral: { icon: Minus, label: "Neutral", className: "text-muted-foreground bg-muted/50 border-border" },
};

export function ResponsesPanel({ selectedTheme, onResponseClick }: ResponsesPanelProps) {
  if (!selectedTheme) {
    return (
      <Card className="h-full flex items-center justify-center border-slate-200 bg-white shadow-sm">
        <div className="text-center text-slate-400 p-6">
          <MessageSquare className="h-12 w-12 mx-auto mb-3 opacity-50" />
          <p className="text-sm">Select a theme to view responses</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="h-full border-slate-200 bg-white shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold text-slate-800 flex items-center gap-2">
          <span>{selectedTheme.name}</span>
          <Badge variant="secondary" className="text-xs bg-slate-100 text-slate-600 border-slate-200">
            {selectedTheme.responses.length} responses
          </Badge>
        </CardTitle>
        <p className="text-sm text-slate-500">{selectedTheme.description}</p>
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
                  className="p-3 rounded-md border border-slate-200 bg-slate-50 hover:bg-slate-100 cursor-pointer transition-colors"
                >
                  <p className="text-sm text-slate-700 mb-2">{response.text}</p>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className={`text-xs flex items-center gap-1 ${sentiment.className}`}>
                      <SentimentIcon className="h-3 w-3" />
                      {sentiment.label}
                    </Badge>
                    <Badge variant="outline" className="text-xs font-mono bg-white text-slate-600 border-slate-200">
                      {response.code}
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
