import { useState } from "react";
import { Header } from "@/components/Header";
import { CodeframeHeader } from "@/components/CodeframeHeader";
import { ThemeCard } from "@/components/ThemeCard";
import { ResponsesPanel } from "@/components/ResponsesPanel";
import { ChatPanel } from "@/components/ChatPanel";
import { questionLevelData, overallCodeframe, Theme } from "@/data/dummyCodeframe";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Settings, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function CodeframeReview() {
  const [view, setView] = useState<"question" | "overall">("question");
  const [selectedQuestion, setSelectedQuestion] = useState(0);
  const [themes, setThemes] = useState<Theme[]>(questionLevelData[0].themes);
  const [selectedTheme, setSelectedTheme] = useState<Theme | null>(null);
  const [selectedResponse, setSelectedResponse] = useState<{ id: string; text: string }>();
  const [isChatCollapsed, setIsChatCollapsed] = useState(true);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [questionSelection, setQuestionSelection] = useState<"1" | "2" | "all">("all");
  const [demographicFilters, setDemographicFilters] = useState({
    age: [] as string[],
    gender: [] as string[],
    location: [] as string[],
    income: [] as string[],
  });
  const { toast } = useToast();

  const demographicOptions = {
    age: ["18-24", "25-34", "35-44", "45-54", "55-64", "65+"],
    gender: ["Male", "Female", "Non-binary", "Other"],
    location: ["Urban", "Suburban", "Rural"],
    income: ["<$30k", "$30k-$50k", "$50k-$100k", "$100k+"],
  };

  const toggleOption = (category: keyof typeof demographicFilters, value: string) => {
    setDemographicFilters(prev => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter(v => v !== value)
        : [...prev[category], value]
    }));
  };

  const handleRunAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      toast({
        title: "Analysis Complete",
        description: `Your codeframe has been finalized with ${themes.length} themes.`,
      });
    }, 1500);
  };

  const handleViewChange = (newView: "question" | "overall") => {
    setView(newView);
    setSelectedTheme(null);
    if (newView === "overall") {
      setThemes(overallCodeframe.allThemes);
    } else {
      setThemes(questionLevelData[selectedQuestion].themes);
    }
  };

  const handleQuestionChange = (index: number) => {
    setSelectedQuestion(index);
    setSelectedTheme(null);
    setThemes(questionLevelData[index].themes);
  };

  const handleThemeSelect = (theme: Theme) => {
    setSelectedTheme(selectedTheme?.id === theme.id ? null : theme);
  };

  const handleRename = (themeId: string, newName: string) => {
    setThemes((prev) =>
      prev.map((t) => (t.id === themeId ? { ...t, name: newName } : t))
    );
    toast({
      title: "Theme Renamed",
      description: `Theme renamed to "${newName}"`,
    });
  };

  const handleDelete = (themeId: string) => {
    setThemes((prev) => prev.filter((t) => t.id !== themeId));
    toast({
      title: "Theme Deleted",
      description: "Theme and associated responses removed",
      variant: "destructive",
    });
  };

  const handleMerge = (themeId: string) => {
    toast({
      title: "Merge Function",
      description: "Select another theme to merge with",
    });
  };

  const handleResponseClick = (responseId: string, responseText: string) => {
    setSelectedResponse({ id: responseId, text: responseText });
  };

  const handleCodeChange = (responseId: string, newCode: string) => {
    setThemes(themes.map(theme => ({
      ...theme,
      responses: theme.responses.map(response =>
        response.id === responseId ? { ...response, code: newCode } : response
      ),
    })));
    toast({
      title: "Code Updated",
      description: "Response code has been updated successfully.",
    });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Codeframe Header */}
      <CodeframeHeader
        view={view}
        onViewChange={handleViewChange}
        selectedQuestion={selectedQuestion}
        onQuestionChange={handleQuestionChange}
        questions={questionLevelData}
        overallStats={{
          totalQuestions: overallCodeframe.totalQuestions,
          totalThemes: overallCodeframe.totalThemes,
          totalResponses: overallCodeframe.totalResponses,
        }}
        isAnalyzing={isAnalyzing}
        onRunAnalysis={handleRunAnalysis}
      />

      {/* Main Content */}
      <div className="container mx-auto px-6 py-6">
        <div className={`grid grid-cols-1 gap-6 h-[calc(100vh-260px)] ${isChatCollapsed ? 'lg:grid-cols-[0.7fr_1fr_auto]' : 'lg:grid-cols-[0.7fr_1fr_1fr]'}`}>
          {/* Left Panel - Themes */}
          <div className="border border-slate-200 rounded-lg bg-white shadow-sm overflow-hidden flex flex-col">
            <div className="flex items-center justify-between px-4 py-3 bg-slate-800 shrink-0">
              <h2 className="text-sm font-medium text-white">Themes ({themes.length})</h2>
              <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
                <DialogTrigger asChild>
                  <button className="p-1 hover:bg-slate-700 rounded transition-colors">
                    <Settings className="h-4 w-4 text-slate-400 hover:text-white" />
                  </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md bg-slate-900 border-slate-700 text-white">
                  <DialogHeader>
                    <DialogTitle className="text-white">Demographic Filters</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-6 py-4">
                    {/* Question Selection */}
                    <div className="space-y-3">
                      <Label className="text-sm font-medium text-slate-300">Questions to Analyze</Label>
                      <div className="flex flex-wrap gap-2">
                        {[
                          { value: "1", label: "1 Question" },
                          { value: "2", label: "2 Questions" },
                          { value: "all", label: "All Questions" },
                        ].map((option) => (
                          <button
                            key={option.value}
                            onClick={() => setQuestionSelection(option.value as "1" | "2" | "all")}
                            className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                              questionSelection === option.value
                                ? 'bg-emerald-600 text-white'
                                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                            }`}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Demographic Filters */}
                    {(Object.keys(demographicOptions) as Array<keyof typeof demographicOptions>).map((category) => (
                      <div key={category} className="space-y-3">
                        <Label className="text-sm font-medium text-slate-300 capitalize">
                          {category === 'income' ? 'Income Level' : category === 'age' ? 'Age Group' : category}
                        </Label>
                        <div className="flex flex-wrap gap-2">
                          {demographicOptions[category].map((option) => (
                            <button
                              key={option}
                              onClick={() => toggleOption(category, option)}
                              className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                                demographicFilters[category].includes(option)
                                  ? 'bg-emerald-600 text-white'
                                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                              }`}
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <ScrollArea className="flex-1">
              <div className="p-4 space-y-2">
                {themes.map((theme) => (
                  <ThemeCard
                    key={theme.id}
                    theme={theme}
                    isSelected={selectedTheme?.id === theme.id}
                    onSelect={() => handleThemeSelect(theme)}
                    onRename={handleRename}
                    onDelete={handleDelete}
                    onMerge={handleMerge}
                    onResponseClick={handleResponseClick}
                    onCodeChange={handleCodeChange}
                  />
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Middle Panel - Responses */}
          <div className="h-full">
            <ResponsesPanel
              selectedTheme={selectedTheme}
              onResponseClick={handleResponseClick}
            />
          </div>

          {/* Right Panel - Chat */}
          <div className={`h-full ${isChatCollapsed ? 'w-16' : ''}`}>
            <ChatPanel 
              selectedResponse={selectedResponse}
              selectedQuestion={view === "question" ? {
                text: questionLevelData[selectedQuestion].text,
                themes: themes.map(t => ({ name: t.name, description: t.description }))
              } : undefined}
              isCollapsed={isChatCollapsed}
              onToggleCollapse={() => setIsChatCollapsed(!isChatCollapsed)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
