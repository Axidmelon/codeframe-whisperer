import { FileText, Download, Sparkles, Loader2 } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Question } from "@/data/dummyCodeframe";

interface CodeframeHeaderProps {
  view: "question" | "overall";
  onViewChange: (view: "question" | "overall") => void;
  selectedQuestion: number;
  onQuestionChange: (index: number) => void;
  questions: Question[];
  overallStats?: {
    totalQuestions: number;
    totalThemes: number;
    totalResponses: number;
  };
  isAnalyzing?: boolean;
  onRunAnalysis?: () => void;
}

export const CodeframeHeader = ({
  view,
  onViewChange,
  selectedQuestion,
  onQuestionChange,
  questions,
  overallStats,
  isAnalyzing = false,
  onRunAnalysis,
}: CodeframeHeaderProps) => {
  return (
    <div className="border-b border-slate-200 bg-white sticky top-[57px] z-10">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FileText className="h-5 w-5 text-emerald-700" />
            <h1 className="text-xl font-semibold text-slate-900">Codeframe Review</h1>
          </div>

          <div className="flex items-center gap-4">
            <Tabs value={view} onValueChange={(v) => onViewChange(v as "question" | "overall")}>
              <TabsList className="bg-slate-100 border border-slate-200">
                <TabsTrigger 
                  value="question" 
                  className="data-[state=active]:bg-white data-[state=active]:text-emerald-700 data-[state=active]:shadow-sm"
                >
                  Question Level
                </TabsTrigger>
                <TabsTrigger 
                  value="overall"
                  className="data-[state=active]:bg-white data-[state=active]:text-emerald-700 data-[state=active]:shadow-sm"
                >
                  Overall Codeframe
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" className="border-slate-200 text-slate-600 hover:bg-slate-50">
                    <Download className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Export</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        {view === "question" && (
          <div className="mt-4 flex items-center justify-between">
            <Select
              value={selectedQuestion.toString()}
              onValueChange={(value) => onQuestionChange(parseInt(value))}
            >
              <SelectTrigger className="w-[450px] bg-white border-slate-200 text-slate-700">
                <SelectValue placeholder="Select a question" />
              </SelectTrigger>
              <SelectContent className="bg-white border-slate-200">
                {questions.map((q, idx) => (
                  <SelectItem key={q.id} value={idx.toString()} className="text-slate-700">
                    Q{idx + 1}: {q.text}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              onClick={onRunAnalysis}
              disabled={isAnalyzing}
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 mr-2" />
                  Run Analysis
                </>
              )}
            </Button>
          </div>
        )}

        {view === "overall" && overallStats && (
          <div className="mt-3 flex items-center justify-between">
            <div className="flex gap-6 text-sm text-slate-500">
              <span>Total Questions: {overallStats.totalQuestions}</span>
              <span>Total Themes: {overallStats.totalThemes}</span>
              <span>Total Responses: {overallStats.totalResponses}</span>
            </div>
            <Button
              onClick={onRunAnalysis}
              disabled={isAnalyzing}
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 mr-2" />
                  Run Analysis
                </>
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
