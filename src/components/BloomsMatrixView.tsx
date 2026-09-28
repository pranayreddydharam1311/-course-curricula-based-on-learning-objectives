import React from 'react';
import { CourseCurriculum, BloomsTaxonomy } from '../types/curriculum.ts';
import { BarChart3, Info, CheckCircle2, TrendingUp } from 'lucide-react';

interface BloomsMatrixViewProps {
  curriculum: CourseCurriculum;
}

const BLOOMS_LEVELS: { level: BloomsTaxonomy; description: string; color: string; bg: string; border: string }[] = [
  { level: 'Remember', description: 'Recall facts and basic concepts (Define, duplicate, list, memorize, repeat)', color: 'text-slate-700', bg: 'bg-slate-100', border: 'border-slate-300' },
  { level: 'Understand', description: 'Explain ideas or concepts (Classify, describe, discuss, explain, identify)', color: 'text-sky-700', bg: 'bg-sky-100', border: 'border-sky-300' },
  { level: 'Apply', description: 'Use information in new situations (Execute, implement, solve, use, demonstrate)', color: 'text-emerald-700', bg: 'bg-emerald-100', border: 'border-emerald-300' },
  { level: 'Analyze', description: 'Draw connections among ideas (Differentiate, organize, relate, compare, contrast)', color: 'text-indigo-700', bg: 'bg-indigo-100', border: 'border-indigo-300' },
  { level: 'Evaluate', description: 'Justify a stand or decision (Appraise, argue, defend, judge, select, critique)', color: 'text-purple-700', bg: 'bg-purple-100', border: 'border-purple-300' },
  { level: 'Create', description: 'Produce new or original work (Design, assemble, construct, formulate, author)', color: 'text-rose-700', bg: 'bg-rose-100', border: 'border-rose-300' },
];

export const BloomsMatrixView: React.FC<BloomsMatrixViewProps> = ({ curriculum }) => {
  // Compute counts
  const counts: Record<BloomsTaxonomy, number> = {
    Remember: 0,
    Understand: 0,
    Apply: 0,
    Analyze: 0,
    Evaluate: 0,
    Create: 0,
  };

  let totalOutcomes = 0;

  curriculum.modules.forEach(m => {
    m.learningOutcomes.forEach(o => {
      if (counts[o.bloomsLevel] !== undefined) {
        counts[o.bloomsLevel]++;
        totalOutcomes++;
      }
    });
  });

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <BarChart3 className="w-5 h-5 text-indigo-600" />
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">
            Bloom's Revised Taxonomy Pedagogical Distribution
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 mb-6">
          A high-quality curriculum balances foundational understanding with higher-order cognitive skills (application, analysis, evaluation, and creation).
        </p>

        {/* Cognitive Level Distribution Bars */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
          {BLOOMS_LEVELS.map(({ level, color, bg, border }) => {
            const count = counts[level] || 0;
            const percent = totalOutcomes > 0 ? Math.round((count / totalOutcomes) * 100) : 0;
            return (
              <div 
                key={level}
                className={`p-4 rounded-2xl border ${border} ${bg} flex flex-col justify-between`}
              >
                <div>
                  <span className={`text-xs font-bold uppercase tracking-wider block mb-1 ${color}`}>
                    {level}
                  </span>
                  <div className="text-2xl font-black text-slate-900">
                    {count}
                  </div>
                </div>
                <div className="mt-2 text-[11px] font-semibold text-slate-500">
                  {percent}% of outcomes
                </div>
              </div>
            );
          })}
        </div>

        {/* Module-by-Module Cognitive Progression Heatmap */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-indigo-600" />
            <span>Progression Heatmap Across Modules</span>
          </h3>

          <div className="overflow-x-auto border border-slate-200 rounded-2xl">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                  <th className="py-3 px-4 w-16">Mod</th>
                  <th className="py-3 px-4 min-w-[200px]">Module Title</th>
                  <th className="py-3 px-3 text-center">Remember</th>
                  <th className="py-3 px-3 text-center">Understand</th>
                  <th className="py-3 px-3 text-center">Apply</th>
                  <th className="py-3 px-3 text-center">Analyze</th>
                  <th className="py-3 px-3 text-center">Evaluate</th>
                  <th className="py-3 px-3 text-center">Create</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {curriculum.modules.map(mod => {
                  const modCounts: Record<BloomsTaxonomy, number> = {
                    Remember: 0,
                    Understand: 0,
                    Apply: 0,
                    Analyze: 0,
                    Evaluate: 0,
                    Create: 0,
                  };
                  mod.learningOutcomes.forEach(lo => {
                    if (modCounts[lo.bloomsLevel] !== undefined) {
                      modCounts[lo.bloomsLevel]++;
                    }
                  });

                  return (
                    <tr key={mod.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3 px-4 font-bold text-indigo-600">M{mod.moduleNumber}</td>
                      <td className="py-3 px-4 font-medium text-slate-900">{mod.title}</td>
                      {(['Remember', 'Understand', 'Apply', 'Analyze', 'Evaluate', 'Create'] as BloomsTaxonomy[]).map(lvl => {
                        const count = modCounts[lvl];
                        return (
                          <td key={lvl} className="py-3 px-3 text-center">
                            {count > 0 ? (
                              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-indigo-100 text-indigo-800 font-bold text-[11px]">
                                {count}
                              </span>
                            ) : (
                              <span className="text-slate-300">-</span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
