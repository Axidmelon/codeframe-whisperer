import { Theme, Sentiment } from "@/data/dummyCodeframe";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, ThumbsUp, ThumbsDown, Minus, List, BarChart3, PieChart } from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  ResponsiveContainer, 
  Cell,
  PieChart as RechartsPieChart,
  Pie
} from "recharts";

interface ResponsesPanelProps {
  selectedTheme: Theme | null;
  themes: Theme[];
  onResponseClick: (responseId: string, responseText: string) => void;
}
const sentimentConfig: Record<Sentiment, {
  icon: typeof ThumbsUp;
  label: string;
  className: string;
}> = {
  positive: {
    icon: ThumbsUp,
    label: "Positive",
    className: "text-emerald-700 bg-emerald-700/10 border-emerald-700/30"
  },
  negative: {
    icon: ThumbsDown,
    label: "Negative",
    className: "text-red-600 bg-red-600/10 border-red-600/30"
  },
  neutral: {
    icon: Minus,
    label: "Neutral",
    className: "text-muted-foreground bg-muted/50 border-border"
  }
};
export function ResponsesPanel({
  selectedTheme,
  themes,
  onResponseClick
}: ResponsesPanelProps) {
  // Calculate theme distribution data
  const themeDistributionData = themes.map(theme => {
    const responseCount = theme.responses.length;
    return {
      name: theme.name,
      value: responseCount,
    };
  }).sort((a, b) => b.value - a.value);

  const totalResponses = themeDistributionData.reduce((sum, item) => sum + item.value, 0);
  const themeDistributionWithPercent = themeDistributionData.map(item => ({
    ...item,
    percent: totalResponses > 0 ? Math.round((item.value / totalResponses) * 100) : 0,
  }));

  // Calculate sentiment breakdown
  const sentimentCounts = { positive: 0, negative: 0, neutral: 0 };
  themes.forEach(theme => {
    theme.responses.forEach(response => {
      sentimentCounts[response.sentiment]++;
    });
  });
  const totalSentiment = sentimentCounts.positive + sentimentCounts.negative + sentimentCounts.neutral;
  
  const sentimentData = [
    { name: "Positive", value: sentimentCounts.positive, color: "hsl(var(--chart-2))" },
    { name: "Negative", value: sentimentCounts.negative, color: "hsl(var(--chart-1))" },
    { name: "Neutral", value: sentimentCounts.neutral, color: "hsl(var(--chart-3))" },
  ].filter(item => item.value > 0);

  if (!selectedTheme) {
    return (
      <Card className="h-full border-slate-200 bg-white shadow-sm overflow-hidden flex flex-col">
        <div className="flex items-center justify-between px-4 py-3 bg-slate-800 shrink-0">
          <h2 className="text-sm font-medium text-white">Overview</h2>
          <BarChart3 className="h-4 w-4 text-slate-400" />
        </div>
        <ScrollArea className="flex-1">
          <div className="p-4 space-y-6">
            {/* Theme Distribution Bar Chart */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <BarChart3 className="h-4 w-4 text-slate-500" />
                <h3 className="text-sm font-medium text-slate-700">Theme Distribution</h3>
              </div>
              <div className="space-y-3">
                {themeDistributionWithPercent.map((item, index) => (
                  <div key={item.name}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs text-slate-600 truncate max-w-[180px]">{item.name}</span>
                      <span className="text-xs font-medium text-primary">{item.percent}%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${item.percent}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sentiment Breakdown Half Pie Chart */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <PieChart className="h-4 w-4 text-slate-500" />
                <h3 className="text-sm font-medium text-slate-700">Sentiment Breakdown</h3>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-full h-[140px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={sentimentData}
                        cx="50%"
                        cy="100%"
                        startAngle={180}
                        endAngle={0}
                        innerRadius={50}
                        outerRadius={90}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {sentimentData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-center gap-4 mt-2">
                  {sentimentData.map((item) => (
                    <div key={item.name} className="flex items-center gap-1.5">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-xs text-slate-600">
                        {item.name} ({totalSentiment > 0 ? Math.round((item.value / totalSentiment) * 100) : 0}%)
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </Card>
    );
  }
  return <Card className="h-full border-slate-200 bg-white shadow-sm overflow-hidden flex flex-col">
      <div className="flex items-center justify-between px-4 py-3 bg-slate-800 shrink-0">
        <h2 className="text-sm font-medium text-white">{selectedTheme.name} ({selectedTheme.responses.length})</h2>
        <List className="h-4 w-4 text-slate-400" />
      </div>
      <div className="p-4 border-b border-slate-100 shrink-0">
        <div className="bg-slate-50 rounded-lg p-3 border border-slate-100">
          <p className="text-[13px] text-slate-600 leading-relaxed">{selectedTheme.reasoning}</p>
        </div>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-3">
          {selectedTheme.responses.map(response => {
          const sentiment = sentimentConfig[response.sentiment];
          const SentimentIcon = sentiment.icon;
          return <div key={response.id} onClick={() => onResponseClick(response.id, response.text)} className="p-3 rounded-md border border-slate-200 bg-slate-50 hover:bg-slate-100 cursor-pointer transition-colors">
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
              </div>;
        })}
        </div>
      </ScrollArea>
    </Card>;
}