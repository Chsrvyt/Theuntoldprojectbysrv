import React from 'react';
import { Search, Plus, Info, Moon, Sun } from 'lucide-react';

interface HeaderProps {
  onAddClick: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export function Header({ onAddClick, searchQuery, setSearchQuery }: HeaderProps) {
  const [isDark, setIsDark] = React.useState(false);

  const toggleDarkMode = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-black/5 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between gap-3 md:gap-8">
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 bg-black dark:bg-white rounded-lg flex items-center justify-center shrink-0">
            <div className="w-3 h-3 bg-white dark:bg-black rotate-45" />
          </div>
          <span className="text-[16px] md:text-[18px] font-medium tracking-tight dark:text-white hidden sm:block">The Unsent Archive</span>
        </div>

        <div className="flex-1 max-w-xl relative group min-w-0">
          <Search className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-30 dark:opacity-50 group-focus-within:opacity-100 transition-opacity dark:text-white" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search..."
            className="w-full bg-black/5 dark:bg-white/10 dark:text-white rounded-full py-2 md:py-2.5 pl-9 md:pl-11 pr-4 text-[13px] md:text-[14px] focus:bg-transparent dark:focus:bg-transparent focus:ring-1 focus:ring-black/20 dark:focus:ring-white/20 outline-none transition-all placeholder:opacity-50"
          />
        </div>

        <div className="flex items-center gap-1.5 md:gap-3 shrink-0">
          <button 
            onClick={toggleDarkMode}
            className="p-2 md:p-2.5 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors dark:text-white"
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <button className="hidden md:flex p-2.5 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors dark:text-white">
            <Info className="w-5 h-5" />
          </button>
          <button
            onClick={onAddClick}
            className="flex items-center justify-center w-10 h-10 md:w-auto md:h-auto md:px-5 md:py-2.5 bg-black text-white rounded-full hover:bg-zinc-800 transition-colors"
          >
            <Plus className="w-5 h-5 md:w-4 md:h-4" />
            <span className="hidden md:inline text-[14px] font-medium ml-2">Add Message</span>
          </button>
        </div>
      </div>
    </header>
  );
}