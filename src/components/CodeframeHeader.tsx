import { FileText, Download, Sparkles, Loader2, ChevronDown } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Question } from "@/data/dummyCodeframe";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface CodeframeHeaderProps {
  view: "question" | "overall";
  onViewChange: (view: "question" | "overall") => void;
  selectedQuestions: number[];
  onQuestionChange: (indices: number[]) => void;
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
  selectedQuestions,
  onQuestionChange,
  questions,
  overallStats,
  isAnalyzing = false,
  onRunAnalysis,
}: CodeframeHeaderProps) => {
  const toggleQuestion = (idx: number) => {
    if (selectedQuestions.includes(idx)) {
      if (selectedQuestions.length > 1) {
        onQuestionChange(selectedQuestions.filter(i => i !== idx));
      }
    } else {
      onQuestionChange([...selectedQuestions, idx]);
    }
  };

  const selectAll = () => {
    onQuestionChange(questions.map((_, idx) => idx));
  };

  const getDisplayText = () => {
    if (selectedQuestions.length === questions.length) {
      return "All Questions Selected";
    }
    if (selectedQuestions.length === 1) {
      return `Q${selectedQuestions[0] + 1}: ${questions[selectedQuestions[0]].text}`;
    }
    return `${selectedQuestions.length} Questions Selected`;
  };

  return (
    <div className="border-b border-slate-200 bg-white sticky top-0 z-10">
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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-[450px] justify-between bg-white border-slate-200 text-slate-700">
                  <span className="truncate">{getDisplayText()}</span>
                  <ChevronDown className="h-4 w-4 ml-2 shrink-0" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[450px] bg-white border-slate-200 p-2" align="start">
                <div className="flex items-center justify-between px-2 py-1.5 mb-2">
                  <span className="text-sm font-medium text-slate-700">Select Questions</span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={selectAll}
                    className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 h-auto py-1 px-2"
                  >
                    Select All
                  </Button>
                </div>
                <div className="space-y-1 max-h-[300px] overflow-y-auto">
                  {questions.map((q, idx) => (
                    <div
                      key={q.id}
                      className="flex items-center gap-3 px-2 py-2 rounded hover:bg-slate-50 cursor-pointer"
                      onClick={() => toggleQuestion(idx)}
                    >
                      <Checkbox 
                        checked={selectedQuestions.includes(idx)}
                        onCheckedChange={() => toggleQuestion(idx)}
                        className="border-slate-300 data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600"
                      />
                      <span className="text-sm text-slate-700">Q{idx + 1}: {q.text}</span>
                    </div>
                  ))}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
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
