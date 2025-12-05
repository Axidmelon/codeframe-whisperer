import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreVertical, Pencil, Merge, Trash2 } from "lucide-react";
import { Theme } from "@/data/dummyCodeframe";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
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
export const ThemeCard = ({
  theme,
  isSelected,
  onSelect,
  onRename,
  onDelete,
  onMerge,
  onResponseClick,
  onCodeChange
}: ThemeCardProps) => {
  
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
  return <Card className={`border border-slate-200/80 hover:border-slate-300 hover:shadow-md transition-all duration-200 cursor-pointer bg-white rounded-xl ${isSelected ? 'border-emerald-500 ring-2 ring-emerald-500/20 shadow-md' : 'shadow-sm'}`} onClick={onSelect}>
      <CardHeader className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3">
              <CardTitle className="text-[15px] font-semibold text-slate-800 leading-tight">
                {theme.name}
              </CardTitle>
              <Badge variant="secondary" className="shrink-0 h-6 min-w-[28px] flex items-center justify-center rounded-full bg-slate-100 text-slate-600 text-xs font-medium border-0">
                {theme.responses.length}
              </Badge>
            </div>
            <CardDescription className="text-[13px] mt-2 text-slate-500 leading-relaxed line-clamp-2">
              {theme.description}
            </CardDescription>
          </div>
          <div className="shrink-0" onClick={e => e.stopPropagation()}>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem onClick={() => setIsEditOpen(true)} className="text-sm">
                  <Pencil className="h-4 w-4 mr-2" />
                  Rename
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onMerge(theme.id)} className="text-sm">
                  <Merge className="h-4 w-4 mr-2" />
                  Merge
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setIsDeleteOpen(true)} className="text-destructive text-sm">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
              <Input id="theme-name" value={editName} onChange={e => setEditName(e.target.value)} className="mt-2" />
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
        <AlertDialog open={editingCodeId !== null} onOpenChange={open => !open && setEditingCodeId(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Edit Response Code</AlertDialogTitle>
              <AlertDialogDescription>
                Update or remove the code for this response.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="py-4">
              <Label htmlFor="response-code">Code</Label>
              <Input id="response-code" value={editCode} onChange={e => setEditCode(e.target.value)} className="mt-2" placeholder="Enter code (e.g., Q1_1)" />
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleCodeSave}>Save Code</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardHeader>

    </Card>;
};