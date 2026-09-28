import React, { useState } from 'react';
import { 
  CourseCurriculum, 
  Module, 
  ModuleQuiz, 
  AssignmentBrief 
} from '../types/curriculum.ts';
import { ModuleCard } from './ModuleCard.tsx';
import { BloomsMatrixView } from './BloomsMatrixView.tsx';
import { AssessmentPlanView } from './AssessmentPlanView.tsx';
import { SyllabusPrintView } from './SyllabusPrintView.tsx';
import { 
  Clock, 
  Calendar, 
  Users, 
  GraduationCap, 
  Award, 
  Sparkles, 
  FileText, 
  CheckCircle, 
  Plus, 
  Layers, 
  BarChart3, 
  CheckSquare, 
  BookMarked,
  Printer,
  Download,
  Share2,
  Check
} from 'lucide-react';

interface CurriculumOverviewProps {
  curriculum: CourseCurriculum;
  onUpdateCurriculum: (updated: CourseCurriculum) => void;
  onExpandLessonPlan: (module: Module) => void;
  onGenerateQuiz: (module: Module) => void;
  onGenerateAssignment: (module: Module) => void;
  onExport: () => void;
  onPrint: () => void;
  onSaveToLibrary: () => void;
  isSaved: boolean;
}

export type ViewTab = 'modules' | 'matrix' | 'assessments' | 'syllabus';

export const CurriculumOverview: React.FC<CurriculumOverviewProps> = ({
  curriculum,
  onUpdateCurriculum,
  onExpandLessonPlan,
  onGenerateQuiz,
  onGenerateAssignment,
  onExport,
  onPrint,
  onSaveToLibrary,
  isSaved,
}) => {
  const [activeTab, setActiveTab] = useState<ViewTab>('modules');

  const handleUpdateModule = (updatedModule: Module) => {
    const updatedModules = curriculum.modules.map(m => 
      m.id === updatedModule.id ? updatedModule : m
    );
    onUpdateCurriculum({
      ...curriculum,
      modules: updatedModules,
    });
  };

  const handleAddNewModule = () => {
    const newModNum = curriculum.modules.length + 1;
    const newModule: Module = {
      id: 'mod_' + Date.now(),
      moduleNumber: newModNum,
      title: `Module ${newModNum}: Custom Advanced Topic`,
      level: 'Intermediate',
      durationWeeksOrHours: `Week ${newModNum}`,
      overview: 'Newly added course module to expand specialized knowledge.',
      learningOutcomes: [
        { outcome: 'Analyze core principles of this domain', bloomsLevel: 'Analyze' },
        { outcome: 'Apply best practices in real-world scenarios', bloomsLevel: 'Apply' },
      ],
      subtopics: [
        {
          id: 'sub_' + Date.now() + '_1',
          title: 'Foundational Principles',
          description: 'Key principles and architectural patterns.',
          estimatedHours: 2,
          keyConcepts: ['Core Concepts', 'Methodology'],
          teachingMethod: 'lecture',
        },
      ],
      assessments: [
        {
          id: 'as_' + Date.now() + '_1',
          type: 'Assignment',
          title: 'Practical Project Milestone',
          description: 'Construct a prototype applying concepts.',
          weightPercentage: 10,
        },
      ],
      resources: [],
    };

    onUpdateCurriculum({
      ...curriculum,
      modules: [...curriculum.modules, newModule],
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Course Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-indigo-100/50 to-sky-100/30 rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-indigo-100 text-indigo-800 border border-indigo-200">
                {curriculum.difficultyLevel}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-500" />
                {curriculum.duration}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                ~{curriculum.estimatedTotalHours} Total Hours
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-slate-500" />
                {curriculum.targetAudience}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {curriculum.title}
            </h1>

            {curriculum.tagline && (
              <p className="text-sm sm:text-base font-medium text-indigo-700 leading-snug">
                {curriculum.tagline}
              </p>
            )}

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-4xl pt-1">
              {curriculum.courseDescription}
            </p>
          </div>

          {/* Action Toolbar */}
          <div className="flex flex-wrap lg:flex-col items-stretch gap-2.5 shrink-0 no-print">
            <button
              onClick={onSaveToLibrary}
              className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-xs ${
                isSaved 
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-300' 
                  : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-300'
              }`}
            >
              {isSaved ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Saved to Library</span>
                </>
              ) : (
                <>
                  <BookMarked className="w-4 h-4 text-slate-500" />
                  <span>Save Curriculum</span>
                </>
              )}
            </button>

            <button
              onClick={onPrint}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 transition-all shadow-xs"
            >
              <Printer className="w-4 h-4 text-slate-500" />
              <span>Print / PDF Syllabus</span>
            </button>

            <button
              onClick={onExport}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-all shadow-xs shadow-indigo-600/20"
            >
              <Download className="w-4 h-4" />
              <span>Export (MD, JSON)</span>
            </button>
          </div>
        </div>

        {/* Competencies & Prerequisites Strip */}
        <div className="mt-6 pt-6 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {curriculum.keyTakeaways && curriculum.keyTakeaways.length > 0 && (
            <div className="bg-indigo-50/50 p-4 rounded-2xl border border-indigo-100/70">
              <span className="font-bold text-indigo-950 uppercase tracking-wider text-[11px] block mb-2 flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-indigo-600" />
                Key Competencies Mastered
              </span>
              <ul className="space-y-1.5 text-slate-700">
                {curriculum.keyTakeaways.map((takeaway, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-indigo-500 font-bold">•</span>
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {curriculum.prerequisites && curriculum.prerequisites.length > 0 && (
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/70">
              <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px] block mb-2 flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-slate-500" />
                Recommended Prerequisites
              </span>
              <ul className="space-y-1.5 text-slate-600">
                {curriculum.prerequisites.map((prereq, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-slate-400 font-bold">•</span>
                    <span>{prereq}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Navigation View Tabs */}
      <div className="flex items-center justify-between border-b border-slate-200 no-print">
        <div className="flex gap-2 sm:gap-4 overflow-x-auto pb-1">
          <button
            onClick={() => setActiveTab('modules')}
            className={`flex items-center gap-2 py-3 px-3 sm:px-4 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'modules'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Modules Roadmap ({curriculum.modules.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('matrix')}
            className={`flex items-center gap-2 py-3 px-3 sm:px-4 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'matrix'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Bloom's Taxonomy Matrix</span>
          </button>

          <button
            onClick={() => setActiveTab('assessments')}
            className={`flex items-center gap-2 py-3 px-3 sm:px-4 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'assessments'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <CheckSquare className="w-4 h-4" />
            <span>Assessment & Capstone Plan</span>
          </button>

          <button
            onClick={() => setActiveTab('syllabus')}
            className={`flex items-center gap-2 py-3 px-3 sm:px-4 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'syllabus'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Academic Syllabus View</span>
          </button>
        </div>

        {activeTab === 'modules' && (
          <button
            onClick={handleAddNewModule}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white hover:bg-indigo-50 text-indigo-700 border border-indigo-200 transition-colors shadow-2xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Module</span>
          </button>
        )}
      </div>

      {/* Tab Contents */}
      {activeTab === 'modules' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Sequenced from Foundational to Advanced & Capstone Project</span>
            <span className="font-medium text-slate-700">Total {curriculum.modules.length} Modules</span>
          </div>

          <div className="space-y-4">
            {curriculum.modules.map((module) => (
              <ModuleCard
                key={module.id}
                module={module}
                courseTitle={curriculum.title}
                onExpandLessonPlan={onExpandLessonPlan}
                onGenerateQuiz={onGenerateQuiz}
                onGenerateAssignment={onGenerateAssignment}
                onUpdateModule={handleUpdateModule}
              />
            ))}
          </div>

          {/* End-of-Course Capstone Summary Card */}
          <div className="bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl">
            <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider text-indigo-300 mb-2">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Final Capstone Project & Evaluation</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold tracking-tight mb-2">
              {curriculum.finalAssessment.capstoneProjectTitle}
            </h3>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6 max-w-3xl">
              {curriculum.finalAssessment.capstoneDescription}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-indigo-800/80 text-xs">
              <div>
                <span className="font-bold text-indigo-200 uppercase tracking-wider block mb-2">
                  Student Deliverables
                </span>
                <ul className="space-y-1.5 text-slate-300">
                  {curriculum.finalAssessment.deliverables.map((del, dIdx) => (
                    <li key={dIdx} className="flex items-start gap-2">
                      <span className="text-amber-400 font-bold">✓</span>
                      <span>{del}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <span className="font-bold text-indigo-200 uppercase tracking-wider block mb-2">
                  Grading & Evaluation Criteria
                </span>
                <ul className="space-y-1.5 text-slate-300">
                  {curriculum.finalAssessment.evaluationCriteria.map((crit, cIdx) => (
                    <li key={cIdx} className="flex items-start gap-2">
                      <span className="text-indigo-400 font-bold">•</span>
                      <span>{crit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'matrix' && (
        <BloomsMatrixView curriculum={curriculum} />
      )}

      {activeTab === 'assessments' && (
        <AssessmentPlanView 
          curriculum={curriculum}
          onGenerateQuiz={onGenerateQuiz}
          onGenerateAssignment={onGenerateAssignment}
        />
      )}

      {activeTab === 'syllabus' && (
        <SyllabusPrintView curriculum={curriculum} onPrint={onPrint} />
      )}
    </div>
  );
};
