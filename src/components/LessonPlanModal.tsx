import React, { useState } from 'react';
import { Module } from '../types/curriculum.ts';
import { X, FileText, Check, Copy, Clock, Lightbulb, Users, MessageSquare, BookOpen } from 'lucide-react';

interface LessonPlanModalProps {
  module: Module | null;
  lessonPlan: NonNullable<Module['expandedLessonPlan']> | null;
  isLoading: boolean;
  onClose: () => void;
}

export const LessonPlanModal: React.FC<LessonPlanModalProps> = ({
  module,
  lessonPlan,
  isLoading,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);

  if (!module && !isLoading) return null;

  const handleCopy = () => {
    if (!lessonPlan) return;
    const text = `
# ${lessonPlan.lessonTitle}
Duration: ${lessonPlan.targetDuration}

## Instructor Notes & Pedagogical Strategy
${lessonPlan.instructorNotes.map(n => `- ${n}`).join('\n')}

## Student Active Learning Exercises
${lessonPlan.studentActivities.map(a => `- ${a}`).join('\n')}

## Discussion & Conceptual Debate Prompts
${lessonPlan.discussionQuestions.map(q => `- ${q}`).join('\n')}

## Recommended Readings
${lessonPlan.recommendedReadings.map(r => `- ${r}`).join('\n')}
    `.trim();

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden my-8">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-indigo-900 to-slate-900 text-white flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-indigo-300 text-xs font-bold uppercase tracking-wider mb-1">
              <FileText className="w-3.5 h-3.5" />
              <span>Modular Lesson Plan Deep Dive</span>
            </div>
            <h2 className="text-xl font-bold tracking-tight">
              {lessonPlan?.lessonTitle || module?.title || 'Synthesizing Detailed Lesson Plan...'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-800">
          {isLoading ? (
            <div className="py-16 text-center space-y-4">
              <div className="w-10 h-10 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto" />
              <div className="text-sm font-semibold text-slate-700">
                Generating comprehensive lesson plan with instructor guidance...
              </div>
              <p className="text-xs text-slate-400 max-w-xs mx-auto">
                Synthesizing student learning activities, debate questions, and reading lists.
              </p>
            </div>
          ) : lessonPlan ? (
            <>
              {/* Duration pill */}
              <div className="flex items-center gap-2 text-xs text-indigo-700 bg-indigo-50 border border-indigo-100 p-2.5 rounded-xl font-semibold">
                <Clock className="w-4 h-4" />
                <span>Estimated Target Instructional Time: {lessonPlan.targetDuration}</span>
              </div>

              {/* Instructor Notes */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                  <span>Pedagogical Instructor Strategy</span>
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-700 bg-amber-50/40 p-4 rounded-2xl border border-amber-100/70">
                  {lessonPlan.instructorNotes.map((note, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-amber-500 font-bold">•</span>
                      <span className="leading-relaxed">{note}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Student Activities */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Active Learning & Collaborative Exercises</span>
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-700 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  {lessonPlan.studentActivities.map((act, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-indigo-600 font-bold">1.{idx + 1}</span>
                      <span className="leading-relaxed">{act}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Discussion Questions */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-sky-600" />
                  <span>Socratic Discussion & Conceptual Debates</span>
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-700 bg-sky-50/40 p-4 rounded-2xl border border-sky-100/70">
                  {lessonPlan.discussionQuestions.map((q, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-sky-600 font-bold">Q:</span>
                      <span className="leading-relaxed italic">"{q}"</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Recommended Readings */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Curated Readings & Media</span>
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-700 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  {lessonPlan.recommendedReadings.map((r, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold">📖</span>
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          ) : null}
        </div>

        {/* Footer */}
        {lessonPlan && !isLoading && (
          <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg shadow-2xs"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
              <span>{copied ? 'Copied Markdown' : 'Copy Lesson Plan'}</span>
            </button>

            <button
              onClick={onClose}
              className="px-5 py-2 text-xs font-bold text-white bg-slate-800 hover:bg-slate-900 rounded-xl shadow-xs"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
