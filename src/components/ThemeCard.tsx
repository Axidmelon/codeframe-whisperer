import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Edit2, Trash2, Merge, Bot } from "lucide-react";
import { Theme } from "@/data/dummyCodeframe";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ThemeCardProps {
  theme: Theme;
  onRename: (themeId: string, newName: string) => void;
  onDelete: (themeId: string) => void;
  onMerge: (themeId: string) => void;
  onResponseClick: (responseId: string, responseText: string) => void;
}

export const ThemeCard = ({ theme, onRename, onDelete, onMerge, onResponseClick }: ThemeCardProps) => {
  const [expanded, setExpanded] = useState(false);
  const [editName, setEditName] = useState(theme.name);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleRename = () => {
    onRename(theme.id, editName);
    setIsEditOpen(false);
  };

  return (
    <Card className="mb-3 border-border/50 hover:border-primary/50 transition-all">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg flex items-center gap-2">
              {theme.name}
              <Badge variant="secondary" className="ml-2">
                {theme.responses.length}
              </Badge>
            </CardTitle>
            <CardDescription className="text-sm mt-1">{theme.description}</CardDescription>
          </div>
          <div className="flex gap-1 ml-2">
            <AlertDialog open={isEditOpen} onOpenChange={setIsEditOpen}>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Edit2 className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Rename Theme</AlertDialogTitle>
                  <AlertDialogDescription>
                    Update the theme name below.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="py-4">
                  <Label htmlFor="theme-name">Theme Name</Label>
                  <Input
                    id="theme-name"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="mt-2"
                  />
                </div>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleRename}>Save</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onMerge(theme.id)}>
              <Merge className="h-4 w-4" />
            </Button>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Theme</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete "{theme.name}"? This will remove all associated responses.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => onDelete(theme.id)} className="bg-destructive text-destructive-foreground">
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </CardHeader>

      {expanded && (
        <CardContent className="pt-0 space-y-3">
          <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
            <h4 className="text-sm font-semibold text-primary mb-2 flex items-center gap-2">
              <Bot className="h-4 w-4" />
              LLM Reasoning
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {theme.reasoning}
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-foreground">Responses ({theme.responses.length})</h4>
            {theme.responses.map((response) => (
            <div
              key={response.id}
              className="p-3 rounded-md bg-muted/50 hover:bg-muted cursor-pointer transition-colors border border-border/30"
              onClick={() => onResponseClick(response.id, response.text)}
            >
              <p className="text-sm mb-1">{response.text}</p>
              <Badge variant="outline" className="text-xs">
                {response.code}
              </Badge>
            </div>
            ))}
          </div>
        </CardContent>
      )}
    </Card>
  );
};
