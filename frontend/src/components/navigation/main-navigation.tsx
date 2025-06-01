import { Button } from "@/components/ui/button";
import { Antenna, Rocket, Users, Database, Menu, X } from "lucide-react";

interface MainNavigationProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export const MainNavigation = ({
  mobileMenuOpen,
  setMobileMenuOpen,
}: MainNavigationProps) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-700/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Antenna className="w-8 h-8 text-cyan-400" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                ExoArchive
              </h1>
              <p className="text-xs text-gray-400 -mt-1">
                A Universe by Many Eyes
              </p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <Button
              variant="ghost"
              className="text-gray-300 hover:text-cyan-400 hover:bg-slate-800/50"
            >
              <Rocket className="w-4 h-4 mr-2" />
              Launch <span className="ml-2 text-xs text-gray-500">[L]</span>
            </Button>
            <Button
              variant="ghost"
              className="text-gray-300 hover:text-cyan-400 hover:bg-slate-800/50"
            >
              <Users className="w-4 h-4 mr-2" />
              Crew <span className="ml-2 text-xs text-gray-500">[C]</span>
            </Button>
            <Button
              variant="ghost"
              className="text-gray-300 hover:text-cyan-400 hover:bg-slate-800/50"
            >
              <Database className="w-4 h-4 mr-2" />
              Archive <span className="ml-2 text-xs text-gray-500">[A]</span>
            </Button>
            <Button
              variant="ghost"
              className="text-gray-300 hover:text-cyan-400 hover:bg-slate-800/50"
            >
              Community <span className="ml-2 text-xs text-gray-500">[M]</span>
            </Button>
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="md:hidden text-gray-300"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </Button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-700/50">
            <div className="flex flex-col gap-2">
              <Button
                variant="ghost"
                className="justify-start text-gray-300 hover:text-cyan-400"
              >
                <Rocket className="w-4 h-4 mr-2" />
                Launch
              </Button>
              <Button
                variant="ghost"
                className="justify-start text-gray-300 hover:text-cyan-400"
              >
                <Users className="w-4 h-4 mr-2" />
                Crew
              </Button>
              <Button
                variant="ghost"
                className="justify-start text-gray-300 hover:text-cyan-400"
              >
                <Database className="w-4 h-4 mr-2" />
                Archive
              </Button>
              <Button
                variant="ghost"
                className="justify-start text-gray-300 hover:text-cyan-400"
              >
                Community
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
