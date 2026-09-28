import React from 'react';
import { AssignmentBrief } from '../types/curriculum.ts';
import { X, Award, CheckCircle2, FileText, Table } from 'lucide-react';

interface AssignmentModalProps {
  assignment: AssignmentBrief | null;
  isLoading: boolean;
  onClose: () => void;
}

export const AssignmentModal: React.FC<AssignmentModalProps> = ({
  assignment,
  isLoading,
  onClose,
}) => {
  if (!assignment && !isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden my-8">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-1">
              <Award className="w-3.5 h-3.5" />
              <span>Practical Assignment & Evaluation Rubric</span>
            </div>
            <h2 className="text-xl font-bold tracking-tight">
              {assignment?.title || 'Architecting Assignment & Rubric...'}
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
              <div className="w-10 h-10 border-3 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto" />
              <div className="text-sm font-semibold text-slate-700">
                Crafting assignment instructions and analytic rubric...
              </div>
              <p className="text-xs text-slate-400 max-w-xs mx-auto">
                Designing authentic evaluation matrix with performance tiers.
              </p>
            </div>
          ) : assignment ? (
            <>
              {/* Scenario Summary */}
              <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100 text-xs sm:text-sm text-slate-800 leading-relaxed">
                <span className="font-bold text-emerald-950 block mb-1">Project Scenario & Objectives:</span>
                {assignment.summary}
              </div>

              {/* Instructions */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Step-by-Step Requirements</span>
                </h4>
                <ol className="space-y-2 text-xs sm:text-sm text-slate-700 list-decimal list-inside bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  {assignment.detailedInstructions.map((instruction, idx) => (
                    <li key={idx} className="leading-relaxed pl-1">
                      {instruction}
                    </li>
                  ))}
                </ol>
              </div>

              {/* Deliverables */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Submission Deliverables</span>
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-700 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  {assignment.submissionDeliverables.map((deliv, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span>{deliv}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Rubric Grid */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
                  <Table className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Analytical Grading Rubric Matrix</span>
                </h4>

                <div className="border border-slate-200 rounded-2xl overflow-hidden text-xs">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-100/80 border-b border-slate-200 text-slate-700 font-bold">
                        <th className="p-3 w-1/4">Criterion</th>
                        <th className="p-3 w-16 text-center">Weight</th>
                        <th className="p-3 bg-emerald-50/50 text-emerald-900">Exemplary (90-100%)</th>
                        <th className="p-3 bg-blue-50/50 text-blue-900">Proficient (75-89%)</th>
                        <th className="p-3 bg-slate-50 text-slate-700">Developing (&lt;75%)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {assignment.rubric.map((row, rIdx) => (
                        <tr key={rIdx} className="hover:bg-slate-50/50">
                          <td className="p-3 font-semibold text-slate-900 align-top">
                            {row.criterion}
                          </td>
                          <td className="p-3 font-bold text-center text-slate-600 align-top">
                            {row.weight}
                          </td>
                          <td className="p-3 text-[11px] text-slate-700 align-top bg-emerald-50/20">
                            {row.exemplary}
                          </td>
                          <td className="p-3 text-[11px] text-slate-700 align-top bg-blue-50/20">
                            {row.proficient}
                          </td>
                          <td className="p-3 text-[11px] text-slate-600 align-top bg-slate-50/30">
                            {row.developing}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          ) : null}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-bold text-white bg-slate-800 hover:bg-slate-900 rounded-xl shadow-xs"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
