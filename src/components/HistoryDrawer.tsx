import React from 'react';
import { CourseCurriculum } from '../types/curriculum.ts';
import { X, Trash2, Calendar, Clock, BookOpen, ChevronRight } from 'lucide-react';

interface HistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedCurricula: CourseCurriculum[];
  onSelect: (curriculum: CourseCurriculum) => void;
  onDelete: (id: string, e: React.MouseEvent) => void;
  currentId?: string;
}

export const HistoryDrawer: React.FC<HistoryDrawerProps> = ({
  isOpen,
  onClose,
  savedCurricula,
  onSelect,
  onDelete,
  currentId,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 backdrop-blur-xs">
      <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col border-l border-slate-200">
        {/* Drawer Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-indigo-600" />
            <h3 className="font-bold text-base text-slate-900">Saved Curricula</h3>
            <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-800">
              {savedCurricula.length}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="p-4 overflow-y-auto flex-1 space-y-3">
          {savedCurricula.length === 0 ? (
            <div className="py-16 text-center text-slate-400 space-y-2">
              <BookOpen className="w-8 h-8 mx-auto text-slate-300" />
              <p className="text-sm font-medium">No saved curricula yet</p>
              <p className="text-xs">Generate a curriculum and click "Save Curriculum" to store it here.</p>
            </div>
          ) : (
            savedCurricula.map((curr) => {
              const isSelected = curr.id === currentId;
              const dateStr = curr.generatedAt ? new Date(curr.generatedAt).toLocaleDateString() : '';

              return (
                <div
                  key={curr.id}
                  onClick={() => {
                    onSelect(curr);
                    onClose();
                  }}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer group flex items-start justify-between gap-3 ${
                    isSelected
                      ? 'bg-indigo-50/70 border-indigo-300 ring-1 ring-indigo-500/20'
                      : 'bg-white hover:bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                      <span>{curr.difficultyLevel}</span>
                      <span>•</span>
                      <span>{curr.duration}</span>
                      {dateStr && (
                        <>
                          <span>•</span>
                          <span>{dateStr}</span>
                        </>
                      )}
                    </div>

                    <h4 className="font-bold text-sm text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2">
                      {curr.title}
                    </h4>

                    <p className="text-xs text-slate-500 line-clamp-1 italic">
                      "{curr.originalObjectives}"
                    </p>
                  </div>

                  <div className="flex items-center gap-1 shrink-0 self-center">
                    <button
                      onClick={(e) => onDelete(curr.id, e)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                      title="Delete from saved"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-600 transition-colors" />
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
