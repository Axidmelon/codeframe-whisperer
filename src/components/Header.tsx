import { Bell, Grid3X3, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Header = () => {
  return (
    <header className="border-b border-slate-200 bg-white sticky top-0 z-20">
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Left - Logo & Navigation */}
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded bg-emerald-700 flex items-center justify-center">
                <span className="text-white font-bold text-sm">H</span>
              </div>
              <span className="font-semibold text-slate-800">Harris Quest Research</span>
            </div>
            <nav className="flex items-center gap-6">
              <a href="#" className="text-sm text-slate-600 hover:text-slate-900">Home</a>
              <a href="#" className="text-sm text-emerald-700 font-medium">Studies</a>
            </nav>
          </div>

          {/* Right - Search & Icons */}
          <div className="flex items-center gap-4">
            <Input 
              placeholder="Search..." 
              className="w-40 h-8 text-sm border-slate-200"
            />
            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500">
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500">
              <User className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
