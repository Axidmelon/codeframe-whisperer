import { useState } from "react";
import { ThemeCard } from "@/components/ThemeCard";
import { ResponsesPanel } from "@/components/ResponsesPanel";
import { ChatPanel } from "@/components/ChatPanel";
import { questionLevelData, overallCodeframe, Theme } from "@/data/dummyCodeframe";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function CodeframeReview() {
  const [view, setView] = useState<"question" | "overall">("question");
  const [selectedQuestion, setSelectedQuestion] = useState(0);
  const [themes, setThemes] = useState<Theme[]>(questionLevelData[0].themes);
  const [selectedTheme, setSelectedTheme] = useState<Theme | null>(null);
  const [selectedResponse, setSelectedResponse] = useState<{ id: string; text: string }>();
  const [isChatCollapsed, setIsChatCollapsed] = useState(true);
  const { toast } = useToast();

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
      {/* Top Panel */}
      <header className="border-b border-slate-200 bg-white sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-emerald-700" />
              <h1 className="text-xl font-semibold text-slate-900">Codeframe Review</h1>
            </div>

            <div className="flex items-center gap-4">
              <Tabs value={view} onValueChange={(v) => handleViewChange(v as "question" | "overall")}>
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

              <Button variant="outline" size="sm" className="border-slate-200 text-slate-600 hover:bg-slate-50">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>

          {view === "question" && (
            <div className="mt-4">
              <Select
                value={selectedQuestion.toString()}
                onValueChange={(value) => handleQuestionChange(parseInt(value))}
              >
                <SelectTrigger className="w-[450px] bg-white border-slate-200 text-slate-700">
                  <SelectValue placeholder="Select a question" />
                </SelectTrigger>
                <SelectContent className="bg-white border-slate-200">
                  {questionLevelData.map((q, idx) => (
                    <SelectItem key={q.id} value={idx.toString()} className="text-slate-700">
                      Q{idx + 1}: {q.text}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}


          {view === "overall" && (
            <div className="flex gap-6 mt-3 text-sm text-slate-500">
              <span>Total Questions: {overallCodeframe.totalQuestions}</span>
              <span>Total Themes: {overallCodeframe.totalThemes}</span>
              <span>Total Responses: {overallCodeframe.totalResponses}</span>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-6">
        <div className={`grid grid-cols-1 gap-6 h-[calc(100vh-200px)] ${isChatCollapsed ? 'lg:grid-cols-[1fr_1fr_auto]' : 'lg:grid-cols-3'}`}>
          {/* Left Panel - Themes */}
          <div className="border border-slate-200 rounded-lg bg-white p-4 shadow-sm">
            <h2 className="text-base font-semibold text-slate-800 mb-4">Themes ({themes.length})</h2>
            <ScrollArea className="h-[calc(100%-3rem)]">
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
              isCollapsed={isChatCollapsed}
              onToggleCollapse={() => setIsChatCollapsed(!isChatCollapsed)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
