import React, { useState } from 'react';
import { 
  ChevronDown, 
  ChevronUp, 
  Clock, 
  BookOpen, 
  Target, 
  CheckCircle2, 
  HelpCircle, 
  Sparkles, 
  FileText, 
  Award, 
  ExternalLink, 
  Code2, 
  FlaskConical, 
  Users2, 
  Presentation, 
  Check, 
  Edit3 
} from 'lucide-react';
import { Module, BloomsTaxonomy, CourseLevel, TeachingMethod } from '../types/curriculum.ts';

interface ModuleCardProps {
  module: Module;
  courseTitle: string;
  onExpandLessonPlan: (module: Module) => void;
  onGenerateQuiz: (module: Module) => void;
  onGenerateAssignment: (module: Module) => void;
  onUpdateModule?: (updated: Module) => void;
  defaultExpanded?: boolean;
}

export const ModuleCard: React.FC<ModuleCardProps> = ({
  module,
  courseTitle,
  onExpandLessonPlan,
  onGenerateQuiz,
  onGenerateAssignment,
  onUpdateModule,
  defaultExpanded = true,
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(module.title);
  const [editedOverview, setEditedOverview] = useState(module.overview);

  const getLevelBadge = (level: CourseLevel) => {
    switch (level) {
      case 'Foundational':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">Foundational</span>;
      case 'Core':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 border border-blue-200">Core</span>;
      case 'Intermediate':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-100 text-purple-800 border border-purple-200">Intermediate</span>;
      case 'Advanced':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-200">Advanced</span>;
      case 'Capstone':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-100 text-rose-800 border border-rose-200">Capstone Project</span>;
      default:
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-800 border border-slate-200">{level}</span>;
    }
  };

  const getBloomsBadge = (level: BloomsTaxonomy) => {
    const colors: Record<BloomsTaxonomy, string> = {
      Remember: 'bg-slate-100 text-slate-700 border-slate-200',
      Understand: 'bg-sky-100 text-sky-800 border-sky-200',
      Apply: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      Analyze: 'bg-indigo-100 text-indigo-800 border-indigo-200',
      Evaluate: 'bg-purple-100 text-purple-800 border-purple-200',
      Create: 'bg-rose-100 text-rose-800 border-rose-200',
    };
    return (
      <span className={`px-2 py-0.5 text-[11px] font-bold rounded-md border ${colors[level] || 'bg-slate-100 text-slate-700'}`}>
        {level}
      </span>
    );
  };

  const getTeachingIcon = (method: TeachingMethod) => {
    switch (method) {
      case 'lab':
      case 'hands-on-coding':
        return <Code2 className="w-3.5 h-3.5 text-indigo-600" />;
      case 'case-study':
        return <FlaskConical className="w-3.5 h-3.5 text-amber-600" />;
      case 'discussion':
      case 'workshop':
        return <Users2 className="w-3.5 h-3.5 text-emerald-600" />;
      default:
        return <Presentation className="w-3.5 h-3.5 text-blue-600" />;
    }
  };

  const handleSaveEdit = () => {
    if (onUpdateModule) {
      onUpdateModule({
        ...module,
        title: editedTitle,
        overview: editedOverview,
      });
    }
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden print-avoid-break">
      {/* Module Header Bar */}
      <div className="p-5 sm:p-6 bg-gradient-to-r from-slate-50/90 via-white to-slate-50/50 border-b border-slate-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start sm:items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white font-black flex items-center justify-center text-sm shadow-xs shrink-0">
              M{module.moduleNumber}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                {getLevelBadge(module.level)}
                <span className="text-xs font-medium text-slate-500 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {module.durationWeeksOrHours}
                </span>
              </div>

              {isEditing ? (
                <div className="flex items-center gap-2 mt-1">
                  <input
                    type="text"
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                    className="font-bold text-base sm:text-lg text-slate-900 px-2 py-1 border border-indigo-300 rounded-md focus:ring-2 focus:ring-indigo-500/20"
                  />
                  <button
                    onClick={handleSaveEdit}
                    className="px-2 py-1 text-xs bg-indigo-600 text-white rounded font-medium hover:bg-indigo-700"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <h3 className="font-bold text-base sm:text-lg text-slate-900 tracking-tight flex items-center gap-2">
                  <span>{module.title}</span>
                  {onUpdateModule && (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="opacity-0 group-hover:opacity-100 hover:opacity-100 text-slate-400 hover:text-slate-600 p-1 no-print"
                      title="Edit title"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </h3>
              )}
            </div>
          </div>

          {/* Module Action Pills */}
          <div className="flex items-center gap-2 self-end sm:self-auto no-print">
            <button
              onClick={() => onGenerateQuiz(module)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200 transition-colors"
              title="Generate interactive diagnostic quiz"
            >
              <Sparkles className="w-3 h-3 text-indigo-600" />
              <span>Quiz</span>
            </button>

            <button
              onClick={() => onGenerateAssignment(module)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 transition-colors"
              title="Generate practical assignment & grading rubric"
            >
              <Award className="w-3 h-3 text-emerald-600" />
              <span>Assignment</span>
            </button>

            <button
              onClick={() => onExpandLessonPlan(module)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200 transition-colors"
              title="Generate detailed lesson plan"
            >
              <FileText className="w-3 h-3 text-slate-600" />
              <span>Lesson Plan</span>
            </button>

            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Toggle module details"
            >
              {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Overview sentence */}
        {module.overview && (
          <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
            {module.overview}
          </p>
        )}
      </div>

      {/* Expanded Module Body */}
      {isExpanded && (
        <div className="p-5 sm:p-6 space-y-6">
          {/* Subtopics Grid */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-indigo-500" />
                <span>Units & Subtopics ({module.subtopics.length})</span>
              </h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {module.subtopics.map((st, idx) => (
                <div 
                  key={st.id || idx}
                  className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/80 hover:bg-white hover:border-indigo-200 hover:shadow-xs transition-all"
                >
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <span className="font-semibold text-xs text-slate-900 leading-tight">
                      {st.title}
                    </span>
                    <span className="text-[11px] font-medium text-slate-500 shrink-0 bg-white px-2 py-0.5 rounded border border-slate-200 flex items-center gap-1">
                      <Clock className="w-2.5 h-2.5" />
                      {st.estimatedHours}h
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-600 mb-2.5 leading-normal line-clamp-2">
                    {st.description}
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 text-[10px]">
                    <span className="capitalize font-medium text-indigo-700 flex items-center gap-1 bg-indigo-50/70 px-2 py-0.5 rounded">
                      {getTeachingIcon(st.teachingMethod)}
                      <span>{st.teachingMethod.replace(/-/g, ' ')}</span>
                    </span>

                    {st.keyConcepts && st.keyConcepts.length > 0 && (
                      <span className="text-slate-400 truncate max-w-[120px]" title={st.keyConcepts.join(', ')}>
                        {st.keyConcepts[0]}
                        {st.keyConcepts.length > 1 ? ` +${st.keyConcepts.length - 1}` : ''}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Learning Outcomes & Assessments Columns */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2 border-t border-slate-100">
            {/* Outcomes */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5 mb-3">
                <Target className="w-3.5 h-3.5 text-emerald-500" />
                <span>Measurable Learning Outcomes</span>
              </h4>

              <ul className="space-y-2.5">
                {module.learningOutcomes.map((lo, idx) => (
                  <li 
                    key={idx}
                    className="flex items-start gap-2.5 text-xs text-slate-700 bg-emerald-50/30 p-2.5 rounded-lg border border-emerald-100/60"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <span className="leading-relaxed">{lo.outcome}</span>
                    </div>
                    {lo.bloomsLevel && (
                      <div className="shrink-0">{getBloomsBadge(lo.bloomsLevel)}</div>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Assessments */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5 mb-3">
                <HelpCircle className="w-3.5 h-3.5 text-indigo-500" />
                <span>Assessment Recommendations</span>
              </h4>

              <div className="space-y-2.5">
                {module.assessments.map((as, idx) => (
                  <div 
                    key={as.id || idx}
                    className="p-2.5 rounded-lg bg-indigo-50/30 border border-indigo-100/60 text-xs"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-slate-900">{as.title}</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-100 text-indigo-800">
                        {as.type}
                        {as.weightPercentage ? ` • ${as.weightPercentage}%` : ''}
                      </span>
                    </div>
                    <p className="text-slate-600 leading-relaxed text-[11px]">
                      {as.description}
                    </p>
                    {as.samplePromptOrQuestions && as.samplePromptOrQuestions.length > 0 && (
                      <div className="mt-2 text-[10px] text-slate-500 bg-white p-2 rounded border border-slate-100">
                        <span className="font-semibold text-slate-700">Sample prompt: </span>
                        <span>"{as.samplePromptOrQuestions[0]}"</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Resources & References (if any) */}
          {module.resources && module.resources.length > 0 && (
            <div className="pt-2 border-t border-slate-100">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-2">
                Recommended Resources & Readings
              </span>
              <div className="flex flex-wrap gap-2">
                {module.resources.map((res, rIdx) => (
                  <span 
                    key={rIdx}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] bg-slate-100 text-slate-700 border border-slate-200/80"
                  >
                    <span className="font-bold text-indigo-600">[{res.type}]</span>
                    <span>{res.title}</span>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
