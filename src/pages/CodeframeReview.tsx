import { useState } from "react";
import { Header } from "@/components/Header";
import { CodeframeHeader } from "@/components/CodeframeHeader";
import { ThemeCard } from "@/components/ThemeCard";
import { ResponsesPanel } from "@/components/ResponsesPanel";
import { ChatPanel } from "@/components/ChatPanel";
import { questionLevelData, overallCodeframe, Theme } from "@/data/dummyCodeframe";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileText } from "lucide-react";
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
      {/* Global Header */}
      <Header />

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
      />

      {/* Main Content */}
      <div className="container mx-auto px-6 py-6">
        <div className={`grid grid-cols-1 gap-6 h-[calc(100vh-260px)] ${isChatCollapsed ? 'lg:grid-cols-[0.7fr_1fr_auto]' : 'lg:grid-cols-[0.7fr_1fr_1fr]'}`}>
          {/* Left Panel - Themes */}
          <div className="border border-slate-200 rounded-lg bg-white shadow-sm overflow-hidden flex flex-col">
            <div className="flex items-center justify-between px-4 py-3 bg-slate-800 shrink-0">
              <h2 className="text-sm font-medium text-white">Themes ({themes.length})</h2>
              <FileText className="h-4 w-4 text-slate-400" />
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
