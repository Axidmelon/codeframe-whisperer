import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, MoreVertical, Pencil, Merge, Trash2 } from "lucide-react";
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
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ThemeCardProps {
  theme: Theme;
  isSelected?: boolean;
  onSelect?: () => void;
  onRename: (themeId: string, newName: string) => void;
  onDelete: (themeId: string) => void;
  onMerge: (themeId: string) => void;
  onResponseClick: (responseId: string, responseText: string) => void;
  onCodeChange: (responseId: string, newCode: string) => void;
}

export const ThemeCard = ({ theme, isSelected, onSelect, onRename, onDelete, onMerge, onResponseClick, onCodeChange }: ThemeCardProps) => {
  const [expanded, setExpanded] = useState(false);
  const [editName, setEditName] = useState(theme.name);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [editingCodeId, setEditingCodeId] = useState<string | null>(null);
  const [editCode, setEditCode] = useState("");

  const handleRename = () => {
    onRename(theme.id, editName);
    setIsEditOpen(false);
  };

  const handleCodeEdit = (responseId: string, currentCode: string) => {
    setEditingCodeId(responseId);
    setEditCode(currentCode);
  };

  const handleCodeSave = () => {
    if (editingCodeId) {
      onCodeChange(editingCodeId, editCode);
      setEditingCodeId(null);
    }
  };

  return (
    <Card 
      className={`mb-3 border-border/50 hover:border-primary/50 transition-all cursor-pointer ${isSelected ? 'border-primary ring-1 ring-primary' : ''}`}
      onClick={onSelect}
    >
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
          <div className="flex gap-1 ml-2" onClick={(e) => e.stopPropagation()}>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setIsEditOpen(true)}>
                  <Pencil className="h-4 w-4 mr-2" />
                  Rename
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onMerge(theme.id)}>
                  <Merge className="h-4 w-4 mr-2" />
                  Merge
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setIsDeleteOpen(true)} className="text-destructive">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

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

        {/* Rename Dialog */}
        <AlertDialog open={isEditOpen} onOpenChange={setIsEditOpen}>
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

        {/* Delete Dialog */}
        <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
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

        {/* Code Edit Dialog */}
        <AlertDialog open={editingCodeId !== null} onOpenChange={(open) => !open && setEditingCodeId(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Edit Response Code</AlertDialogTitle>
              <AlertDialogDescription>
                Update or remove the code for this response.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="py-4">
              <Label htmlFor="response-code">Code</Label>
              <Input
                id="response-code"
                value={editCode}
                onChange={(e) => setEditCode(e.target.value)}
                className="mt-2"
                placeholder="Enter code (e.g., Q1_1)"
              />
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleCodeSave}>Save Code</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardHeader>

      {expanded && (
        <CardContent className="pt-0 space-y-3">
          <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
            <h4 className="text-sm font-semibold text-primary mb-2">
              Why this theme name?
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
              <Badge 
                variant="outline" 
                className="text-xs cursor-pointer hover:bg-accent"
                onClick={(e) => {
                  e.stopPropagation();
                  handleCodeEdit(response.id, response.code);
                }}
              >
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
