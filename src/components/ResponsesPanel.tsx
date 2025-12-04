import { Theme, Sentiment } from "@/data/dummyCodeframe";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, ThumbsUp, ThumbsDown, Minus, List } from "lucide-react";

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
      <Card className="h-full border-slate-200 bg-white shadow-sm overflow-hidden flex flex-col">
        <div className="flex items-center justify-between px-4 py-3 bg-slate-800 shrink-0">
          <h2 className="text-sm font-medium text-white">Select a Theme</h2>
          <List className="h-4 w-4 text-slate-400" />
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center text-slate-400 p-6">
            <MessageSquare className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p className="text-sm">Select a theme to view responses</p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="h-full border-slate-200 bg-white shadow-sm overflow-hidden flex flex-col">
      <div className="flex items-center justify-between px-4 py-3 bg-slate-800 shrink-0">
        <h2 className="text-sm font-medium text-white">{selectedTheme.name} ({selectedTheme.responses.length})</h2>
        <List className="h-4 w-4 text-slate-400" />
      </div>
      <div className="p-4 pb-2 border-b border-slate-200 shrink-0">
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="text-xs bg-slate-100 text-slate-600 border-slate-200">
            {selectedTheme.responses.length} responses
          </Badge>
        </div>
        <p className="text-sm text-slate-500 mt-1">{selectedTheme.reasoning}</p>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-3">
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
    </Card>
  );
}
