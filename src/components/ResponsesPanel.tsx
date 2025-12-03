import { Theme } from "@/data/dummyCodeframe";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { MessageSquare } from "lucide-react";

interface ResponsesPanelProps {
  selectedTheme: Theme | null;
  onResponseClick: (responseId: string, responseText: string) => void;
}

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
            {selectedTheme.responses.map((response) => (
              <div
                key={response.id}
                onClick={() => onResponseClick(response.id, response.text)}
                className="p-3 rounded-md border border-border/50 bg-background/50 hover:bg-accent/50 cursor-pointer transition-colors"
              >
                <p className="text-sm mb-2">{response.text}</p>
                <Badge variant="outline" className="text-xs font-mono">
                  {response.code}
                </Badge>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
