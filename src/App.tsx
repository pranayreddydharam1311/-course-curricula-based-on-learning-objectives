/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { ObjectiveInputForm } from './components/ObjectiveInputForm.tsx';
import { CurriculumOverview } from './components/CurriculumOverview.tsx';
import { QuizModal } from './components/QuizModal.tsx';
import { AssignmentModal } from './components/AssignmentModal.tsx';
import { LessonPlanModal } from './components/LessonPlanModal.tsx';
import { ExportModal } from './components/ExportModal.tsx';
import { HistoryDrawer } from './components/HistoryDrawer.tsx';
import { 
  CourseCurriculum, 
  GenerateCurriculumRequest, 
  Module, 
  ModuleQuiz, 
  AssignmentBrief 
} from './types/curriculum.ts';
import { SAMPLE_PYTHON_CURRICULUM } from './data/presets.ts';
import { 
  generateCurriculumAPI, 
  expandModuleAPI, 
  generateQuizAPI, 
  generateAssignmentAPI 
} from './services/apiClient.ts';
import { AlertCircle, X, Sparkles } from 'lucide-react';

const STORAGE_KEY = 'curricula_ai_saved_v1';

export default function App() {
  const [currentCurriculum, setCurrentCurriculum] = useState<CourseCurriculum | null>(SAMPLE_PYTHON_CURRICULUM);
  const [savedCurricula, setSavedCurricula] = useState<CourseCurriculum[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Modals state
  const [quizData, setQuizData] = useState<ModuleQuiz | null>(null);
  const [isQuizLoading, setIsQuizLoading] = useState(false);
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);

  const [assignmentData, setAssignmentData] = useState<AssignmentBrief | null>(null);
  const [isAssignmentLoading, setIsAssignmentLoading] = useState(false);
  const [isAssignmentModalOpen, setIsAssignmentModalOpen] = useState(false);

  const [lessonPlanModule, setLessonPlanModule] = useState<Module | null>(null);
  const [lessonPlanData, setLessonPlanData] = useState<NonNullable<Module['expandedLessonPlan']> | null>(null);
  const [isLessonPlanLoading, setIsLessonPlanLoading] = useState(false);
  const [isLessonPlanModalOpen, setIsLessonPlanModalOpen] = useState(false);

  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  // Load saved from local storage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setSavedCurricula(parsed);
          // if first visit, show the latest saved or sample
        } else {
          setSavedCurricula([SAMPLE_PYTHON_CURRICULUM]);
        }
      } else {
        setSavedCurricula([SAMPLE_PYTHON_CURRICULUM]);
      }
    } catch (e) {
      console.error('Failed to parse saved curricula', e);
      setSavedCurricula([SAMPLE_PYTHON_CURRICULUM]);
    }
  }, []);

  const saveToStorage = (list: CourseCurriculum[]) => {
    setSavedCurricula(list);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch (e) {
      console.error('Error saving to storage', e);
    }
  };

  const handleGenerate = async (request: GenerateCurriculumRequest) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await generateCurriculumAPI(request);
      setCurrentCurriculum(result);

      // Auto add to saved list if not exists
      const exists = savedCurricula.some(c => c.id === result.id);
      if (!exists) {
        saveToStorage([result, ...savedCurricula]);
      }
    } catch (err: any) {
      console.error('Generation error:', err);
      setError(err.message || 'An error occurred during curriculum generation.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleExpandLessonPlan = async (module: Module) => {
    setLessonPlanModule(module);
    setLessonPlanData(module.expandedLessonPlan || null);
    setIsLessonPlanModalOpen(true);

    if (!module.expandedLessonPlan) {
      setIsLessonPlanLoading(true);
      try {
        const plan = await expandModuleAPI(module, currentCurriculum?.title || 'Course');
        setLessonPlanData(plan);
        // cache in current curriculum state
        if (currentCurriculum) {
          const updatedModules = currentCurriculum.modules.map(m => 
            m.id === module.id ? { ...m, expandedLessonPlan: plan } : m
          );
          const updated = { ...currentCurriculum, modules: updatedModules };
          setCurrentCurriculum(updated);
        }
      } catch (err: any) {
        console.error('Failed to expand lesson plan:', err);
        setError('Failed to generate detailed lesson plan: ' + err.message);
      } finally {
        setIsLessonPlanLoading(false);
      }
    }
  };

  const handleGenerateQuiz = async (module: Module) => {
    setQuizData(null);
    setIsQuizLoading(true);
    setIsQuizModalOpen(true);
    try {
      const quiz = await generateQuizAPI(module, currentCurriculum?.title || 'Course');
      setQuizData(quiz);
    } catch (err: any) {
      console.error('Quiz error:', err);
      setError('Failed to generate diagnostic quiz: ' + err.message);
      setIsQuizModalOpen(false);
    } finally {
      setIsQuizLoading(false);
    }
  };

  const handleGenerateAssignment = async (module: Module) => {
    setAssignmentData(null);
    setIsAssignmentLoading(true);
    setIsAssignmentModalOpen(true);
    try {
      const assignment = await generateAssignmentAPI(module, currentCurriculum?.title || 'Course');
      setAssignmentData(assignment);
    } catch (err: any) {
      console.error('Assignment error:', err);
      setError('Failed to generate assignment rubric: ' + err.message);
      setIsAssignmentModalOpen(false);
    } finally {
      setIsAssignmentLoading(false);
    }
  };

  const handleSaveToLibrary = () => {
    if (!currentCurriculum) return;
    const exists = savedCurricula.some(c => c.id === currentCurriculum.id);
    if (!exists) {
      saveToStorage([currentCurriculum, ...savedCurricula]);
    } else {
      // update existing
      const updated = savedCurricula.map(c => 
        c.id === currentCurriculum.id ? currentCurriculum : c
      );
      saveToStorage(updated);
    }
  };

  const handleDeleteSaved = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = savedCurricula.filter(c => c.id !== id);
    saveToStorage(updated);
    if (currentCurriculum?.id === id) {
      setCurrentCurriculum(updated[0] || null);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const isCurrentSaved = !!currentCurriculum && savedCurricula.some(c => c.id === currentCurriculum.id);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans selection:bg-indigo-500 selection:text-white">
      {/* Navigation Header */}
      <Navbar
        currentCurriculum={currentCurriculum}
        onNewCurriculum={() => setCurrentCurriculum(null)}
        onOpenHistory={() => setIsHistoryOpen(true)}
        onLoadExample={() => setCurrentCurriculum(SAMPLE_PYTHON_CURRICULUM)}
        onExport={() => setIsExportOpen(true)}
        onPrint={handlePrint}
        savedCount={savedCurricula.length}
      />

      {/* Error alert toast */}
      {error && (
        <div className="max-w-4xl mx-auto px-4 mt-4 w-full no-print">
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 flex items-start justify-between gap-3 shadow-sm">
            <div className="flex items-start gap-2.5">
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-sm block">System Notification</span>
                <p className="text-xs text-rose-700 leading-relaxed mt-0.5">{error}</p>
              </div>
            </div>
            <button
              onClick={() => setError(null)}
              className="text-rose-400 hover:text-rose-700 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Main Content View: Form or Curriculum */}
      <main className="flex-1 pb-16">
        {currentCurriculum ? (
          <CurriculumOverview
            curriculum={currentCurriculum}
            onUpdateCurriculum={(updated) => {
              setCurrentCurriculum(updated);
              // Also update in saved if already there
              if (savedCurricula.some(c => c.id === updated.id)) {
                saveToStorage(savedCurricula.map(c => c.id === updated.id ? updated : c));
              }
            }}
            onExpandLessonPlan={handleExpandLessonPlan}
            onGenerateQuiz={handleGenerateQuiz}
            onGenerateAssignment={handleGenerateAssignment}
            onExport={() => setIsExportOpen(true)}
            onPrint={handlePrint}
            onSaveToLibrary={handleSaveToLibrary}
            isSaved={isCurrentSaved}
          />
        ) : (
          <ObjectiveInputForm
            onGenerate={handleGenerate}
            isLoading={isLoading}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500 no-print">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 font-medium text-slate-700">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>CurriculaAI • Course Curriculum Architecture System</span>
          </div>
          <span>Powered by Gemini 3.8 Flash • Accredited Instructional Design Standards</span>
        </div>
      </footer>

      {/* Modals & Drawers */}
      <QuizModal
        quiz={quizData}
        isLoading={isQuizLoading}
        onClose={() => setIsQuizModalOpen(false)}
      />

      <AssignmentModal
        assignment={assignmentData}
        isLoading={isAssignmentLoading}
        onClose={() => setIsAssignmentModalOpen(false)}
      />

      <LessonPlanModal
        module={lessonPlanModule}
        lessonPlan={lessonPlanData}
        isLoading={isLessonPlanLoading}
        onClose={() => setIsLessonPlanModalOpen(false)}
      />

      {currentCurriculum && isExportOpen && (
        <ExportModal
          curriculum={currentCurriculum}
          onClose={() => setIsExportOpen(false)}
        />
      )}

      <HistoryDrawer
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        savedCurricula={savedCurricula}
        onSelect={(curr) => setCurrentCurriculum(curr)}
        onDelete={handleDeleteSaved}
        currentId={currentCurriculum?.id}
      />
    </div>
  );
}
