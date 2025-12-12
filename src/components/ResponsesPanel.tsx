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
  showSentiment?: boolean;
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
  themes = [],
  onResponseClick,
  showSentiment = true
}: ResponsesPanelProps) {
  // Calculate theme distribution data with sentiment breakdown
  const themeDistributionData = (themes || []).map(theme => {
    const positive = theme.responses.filter(r => r.sentiment === 'positive').length;
    const negative = theme.responses.filter(r => r.sentiment === 'negative').length;
    const neutral = theme.responses.filter(r => r.sentiment === 'neutral').length;
    const total = theme.responses.length;
    return {
      name: theme.name,
      positive,
      negative,
      neutral,
      total,
    };
  }).sort((a, b) => b.total - a.total);

  const maxResponses = Math.max(...themeDistributionData.map(d => d.total), 1);

  // Calculate sentiment breakdown
  const sentimentCounts = { positive: 0, negative: 0, neutral: 0 };
  (themes || []).forEach(theme => {
    theme.responses.forEach(response => {
      sentimentCounts[response.sentiment]++;
    });
  });
  const totalSentiment = sentimentCounts.positive + sentimentCounts.negative + sentimentCounts.neutral;
  
  const sentimentData = [
    { name: "Positive", value: sentimentCounts.positive, color: "#10b981", percent: totalSentiment > 0 ? Math.round((sentimentCounts.positive / totalSentiment) * 100) : 0 },
    { name: "Negative", value: sentimentCounts.negative, color: "#ef4444", percent: totalSentiment > 0 ? Math.round((sentimentCounts.negative / totalSentiment) * 100) : 0 },
    { name: "Neutral", value: sentimentCounts.neutral, color: "#94a3b8", percent: totalSentiment > 0 ? Math.round((sentimentCounts.neutral / totalSentiment) * 100) : 0 },
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
            {/* Theme Distribution Horizontal Bar Chart with Sentiment */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <BarChart3 className="h-4 w-4 text-slate-500" />
                <h3 className="text-sm font-medium text-slate-700">Theme Distribution</h3>
              </div>
              <div className="space-y-4">
                {themeDistributionData.map((item) => {
                  const positiveWidth = (item.positive / maxResponses) * 100;
                  const negativeWidth = (item.negative / maxResponses) * 100;
                  const neutralWidth = (item.neutral / maxResponses) * 100;
                  return (
                    <div key={item.name}>
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-sm text-slate-700 font-medium">{item.name}</span>
                        <span className="text-sm font-semibold text-slate-800">{item.total} mentions</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded h-3 flex overflow-hidden">
                        {item.positive > 0 && (
                          <div 
                            className="h-3 transition-all duration-500 ease-out"
                            style={{ width: `${positiveWidth}%`, backgroundColor: '#10b981' }}
                          />
                        )}
                        {item.negative > 0 && (
                          <div 
                            className="h-3 transition-all duration-500 ease-out"
                            style={{ width: `${negativeWidth}%`, backgroundColor: '#ef4444' }}
                          />
                        )}
                        {item.neutral > 0 && (
                          <div 
                            className="h-3 transition-all duration-500 ease-out"
                            style={{ width: `${neutralWidth}%`, backgroundColor: '#94a3b8' }}
                          />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
              {/* Legend */}
              <div className="flex justify-center gap-4 mt-4">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#10b981' }} />
                  <span className="text-xs text-slate-600">Positive</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#ef4444' }} />
                  <span className="text-xs text-slate-600">Negative</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#94a3b8' }} />
                  <span className="text-xs text-slate-600">Neutral</span>
                </div>
              </div>
            </div>

            {/* Sentiment Breakdown Half Pie Chart */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <PieChart className="h-4 w-4 text-slate-500" />
                <h3 className="text-sm font-medium text-slate-700">Sentiment Breakdown</h3>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-full h-[160px] relative">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={sentimentData}
                        cx="50%"
                        cy="90%"
                        startAngle={180}
                        endAngle={0}
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={3}
                        dataKey="value"
                      >
                        {sentimentData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                        ))}
                      </Pie>
                    </RechartsPieChart>
                  </ResponsiveContainer>
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-center">
                    <span className="text-2xl font-bold text-slate-800">{totalSentiment}</span>
                    <p className="text-xs text-slate-500">Responses</p>
                  </div>
                </div>
                <div className="flex justify-center gap-6 mt-4">
                  {sentimentData.map((item) => (
                    <div key={item.name} className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm text-slate-600">
                        {item.name} <span className="font-medium">({item.percent}%)</span>
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
                  {showSentiment && (
                    <Badge variant="outline" className={`text-xs flex items-center gap-1 ${sentiment.className}`}>
                      <SentimentIcon className="h-3 w-3" />
                      {sentiment.label}
                    </Badge>
                  )}
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