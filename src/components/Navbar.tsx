import React from 'react';
import { 
  BookOpen, 
  Sparkles, 
  History, 
  PlusCircle, 
  FileCode2, 
  Printer, 
  Download, 
  Share2 
} from 'lucide-react';
import { CourseCurriculum } from '../types/curriculum.ts';

interface NavbarProps {
  currentCurriculum: CourseCurriculum | null;
  onNewCurriculum: () => void;
  onOpenHistory: () => void;
  onLoadExample: () => void;
  onExport: () => void;
  onPrint: () => void;
  savedCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentCurriculum,
  onNewCurriculum,
  onOpenHistory,
  onLoadExample,
  onExport,
  onPrint,
  savedCount,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 transition-all no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={onNewCurriculum}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-sky-500 flex items-center justify-center shadow-md shadow-indigo-500/20 text-white">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-800 bg-clip-text text-transparent">
                  CurriculaAI
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase bg-indigo-50 text-indigo-700 rounded-full border border-indigo-200/60">
                  <Sparkles className="w-2.5 h-2.5" />
                  Gemini 3.8
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block">AI-Powered Course Curriculum Architect</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onLoadExample}
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/60 rounded-lg transition-colors border border-transparent hover:border-indigo-100"
              title="Load standard Python Programming curriculum example"
            >
              <FileCode2 className="w-3.5 h-3.5 text-indigo-500" />
              <span>Python 101 Example</span>
            </button>

            <button
              onClick={onOpenHistory}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/80 rounded-lg transition-colors border border-slate-200/70"
            >
              <History className="w-3.5 h-3.5 text-slate-500" />
              <span>Saved</span>
              {savedCount > 0 && (
                <span className="px-1.5 py-0.2 text-[10px] bg-indigo-600 text-white rounded-full font-bold">
                  {savedCount}
                </span>
              )}
            </button>

            {currentCurriculum && (
              <>
                <button
                  onClick={onPrint}
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 hover:text-indigo-600 bg-white hover:bg-indigo-50 border border-slate-200 rounded-lg transition-colors shadow-xs"
                  title="Print or save as PDF"
                >
                  <Printer className="w-3.5 h-3.5 text-slate-500" />
                  <span>Print Syllabus</span>
                </button>

                <button
                  onClick={onExport}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200/70 rounded-lg transition-colors shadow-xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export</span>
                </button>
              </>
            )}

            <button
              onClick={onNewCurriculum}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm shadow-indigo-600/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">New Curriculum</span>
              <span className="sm:hidden">New</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
