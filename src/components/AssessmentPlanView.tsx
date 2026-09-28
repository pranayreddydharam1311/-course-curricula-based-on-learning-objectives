import React from 'react';
import { CourseCurriculum, Module, AssessmentItem } from '../types/curriculum.ts';
import { 
  CheckSquare, 
  Award, 
  HelpCircle, 
  Code2, 
  FileText, 
  Sparkles, 
  ArrowRight 
} from 'lucide-react';

interface AssessmentPlanViewProps {
  curriculum: CourseCurriculum;
  onGenerateQuiz: (module: Module) => void;
  onGenerateAssignment: (module: Module) => void;
}

export const AssessmentPlanView: React.FC<AssessmentPlanViewProps> = ({
  curriculum,
  onGenerateQuiz,
  onGenerateAssignment,
}) => {
  // Aggregate all assessments
  const allAssessments: { module: Module; assessment: AssessmentItem }[] = [];
  curriculum.modules.forEach(module => {
    module.assessments.forEach(assessment => {
      allAssessments.push({ module, assessment });
    });
  });

  const getAssessmentTypeBadge = (type: string) => {
    switch (type) {
      case 'Quiz':
        return <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-sky-100 text-sky-800">Quiz</span>;
      case 'Assignment':
        return <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-indigo-100 text-indigo-800">Assignment</span>;
      case 'Lab Exercise':
        return <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-100 text-emerald-800">Lab Exercise</span>;
      case 'Milestone Project':
        return <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-purple-100 text-purple-800">Milestone</span>;
      default:
        return <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-slate-100 text-slate-800">{type}</span>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <CheckSquare className="w-5 h-5 text-indigo-600" />
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">
              Course Assessment Strategy & Grading Plan
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600">
            Formative and summative assessment roadmap across all modules designed to validate both conceptual mastery and applied execution.
          </p>
        </div>

        {/* Master Assessments Table */}
        <div className="border border-slate-200 rounded-2xl overflow-hidden">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                <th className="py-3 px-4 w-24">Module</th>
                <th className="py-3 px-3 w-28">Type</th>
                <th className="py-3 px-4">Title & Description</th>
                <th className="py-3 px-3 w-24 text-right">Weight</th>
                <th className="py-3 px-4 w-32 text-center no-print">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {allAssessments.map(({ module, assessment }, idx) => (
                <tr key={assessment.id || idx} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-indigo-600 align-top">
                    M{module.moduleNumber}
                  </td>
                  <td className="py-3.5 px-3 align-top">
                    {getAssessmentTypeBadge(assessment.type)}
                  </td>
                  <td className="py-3.5 px-4 align-top">
                    <div className="font-semibold text-slate-900 mb-1">
                      {assessment.title}
                    </div>
                    <div className="text-slate-600 text-[11px] leading-relaxed">
                      {assessment.description}
                    </div>
                    {assessment.samplePromptOrQuestions && assessment.samplePromptOrQuestions.length > 0 && (
                      <div className="mt-1.5 text-[10px] text-slate-500 italic bg-slate-50 p-1.5 rounded border border-slate-200/50">
                        "{assessment.samplePromptOrQuestions[0]}"
                      </div>
                    )}
                  </td>
                  <td className="py-3.5 px-3 text-right font-bold text-slate-700 align-top">
                    {assessment.weightPercentage ? `${assessment.weightPercentage}%` : '-'}
                  </td>
                  <td className="py-3.5 px-4 text-center align-top no-print">
                    {assessment.type === 'Quiz' ? (
                      <button
                        onClick={() => onGenerateQuiz(module)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-semibold bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-colors border border-indigo-200"
                      >
                        <Sparkles className="w-3 h-3 text-indigo-600" />
                        <span>Run Quiz</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => onGenerateAssignment(module)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors border border-emerald-200"
                      >
                        <Award className="w-3 h-3 text-emerald-600" />
                        <span>Rubric</span>
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Capstone Evaluation Deep Dive */}
        <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-7 shadow-lg">
          <div className="flex items-center gap-2 mb-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
            <Award className="w-4 h-4" />
            <span>Summative Evaluation: Capstone Project</span>
          </div>

          <h3 className="text-xl font-bold mb-2">
            {curriculum.finalAssessment.capstoneProjectTitle}
          </h3>

          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6">
            {curriculum.finalAssessment.capstoneDescription}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs pt-4 border-t border-slate-800">
            <div>
              <span className="font-bold text-slate-200 uppercase tracking-wider block mb-2">
                Required Submissions & Artifacts
              </span>
              <ul className="space-y-1.5 text-slate-400">
                {curriculum.finalAssessment.deliverables.map((del, dIdx) => (
                  <li key={dIdx} className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>{del}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <span className="font-bold text-slate-200 uppercase tracking-wider block mb-2">
                Grading Rubric Matrix
              </span>
              <ul className="space-y-1.5 text-slate-400">
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
    </div>
  );
};
