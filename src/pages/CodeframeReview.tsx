import { useState } from "react";
import { ThemeCard } from "@/components/ThemeCard";
import { ChatPanel } from "@/components/ChatPanel";
import { questionLevelData, overallCodeframe, Theme } from "@/data/dummyCodeframe";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function CodeframeReview() {
  const [view, setView] = useState<"question" | "overall">("question");
  const [selectedQuestion, setSelectedQuestion] = useState(0);
  const [themes, setThemes] = useState<Theme[]>(questionLevelData[0].themes);
  const [selectedResponse, setSelectedResponse] = useState<{ id: string; text: string }>();
  const { toast } = useToast();

  const handleViewChange = (newView: "question" | "overall") => {
    setView(newView);
    if (newView === "overall") {
      setThemes(overallCodeframe.allThemes);
    } else {
      setThemes(questionLevelData[selectedQuestion].themes);
    }
  };

  const handleQuestionChange = (index: number) => {
    setSelectedQuestion(index);
    setThemes(questionLevelData[index].themes);
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
    <div className="min-h-screen bg-background">
      {/* Top Panel */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText className="h-6 w-6 text-primary" />
              <h1 className="text-2xl font-bold">Codeframe Review</h1>
            </div>

            <div className="flex items-center gap-4">
              <Tabs value={view} onValueChange={(v) => handleViewChange(v as "question" | "overall")}>
                <TabsList>
                  <TabsTrigger value="question">Question Level</TabsTrigger>
                  <TabsTrigger value="overall">Overall Codeframe</TabsTrigger>
                </TabsList>
              </Tabs>

              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>

          {view === "question" && (
            <div className="flex gap-2 mt-4">
              {questionLevelData.map((q, idx) => (
                <Button
                  key={q.id}
                  variant={selectedQuestion === idx ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleQuestionChange(idx)}
                  className="text-sm"
                >
                  Q{idx + 1}
                </Button>
              ))}
            </div>
          )}

          {view === "question" && (
            <p className="text-sm text-muted-foreground mt-3">
              {questionLevelData[selectedQuestion].text}
            </p>
          )}

          {view === "overall" && (
            <div className="flex gap-6 mt-3 text-sm text-muted-foreground">
              <span>Total Questions: {overallCodeframe.totalQuestions}</span>
              <span>Total Themes: {overallCodeframe.totalThemes}</span>
              <span>Total Responses: {overallCodeframe.totalResponses}</span>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-200px)]">
          {/* Left Panel - Themes */}
          <div className="border border-border/50 rounded-lg bg-card/30 p-4">
            <h2 className="text-lg font-semibold mb-4">Themes ({themes.length})</h2>
            <ScrollArea className="h-[calc(100%-3rem)]">
              {themes.map((theme) => (
                <ThemeCard
                  key={theme.id}
                  theme={theme}
                  onRename={handleRename}
                  onDelete={handleDelete}
                  onMerge={handleMerge}
                  onResponseClick={handleResponseClick}
                  onCodeChange={handleCodeChange}
                />
              ))}
            </ScrollArea>
          </div>

          {/* Right Panel - Chat */}
          <div className="h-full">
            <ChatPanel selectedResponse={selectedResponse} />
          </div>
        </div>
      </div>
    </div>
  );
}
