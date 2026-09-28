import React from 'react';
import { CourseCurriculum } from '../types/curriculum.ts';
import { Printer, GraduationCap, CheckCircle, Calendar, Clock, BookOpen, Layers } from 'lucide-react';

interface SyllabusPrintViewProps {
  curriculum: CourseCurriculum;
  onPrint: () => void;
}

export const SyllabusPrintView: React.FC<SyllabusPrintViewProps> = ({ curriculum, onPrint }) => {
  return (
    <div className="space-y-6">
      {/* Top action banner for screen only */}
      <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-4 flex items-center justify-between no-print">
        <div className="flex items-center gap-2 text-indigo-900 text-xs sm:text-sm font-medium">
          <BookOpen className="w-4 h-4 text-indigo-600" />
          <span>Academic Syllabus Ready for Printing or PDF Export</span>
        </div>
        <button
          onClick={onPrint}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 text-white hover:bg-indigo-700 shadow-xs"
        >
          <Printer className="w-4 h-4" />
          <span>Print / Save as PDF</span>
        </button>
      </div>

      {/* Printable Syllabus Document Body */}
      <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 shadow-sm font-sans space-y-8 text-slate-900 print:border-none print:shadow-none print:p-0">
        {/* Document Header */}
        <div className="border-b-2 border-slate-900 pb-6">
          <div className="text-xs font-bold uppercase tracking-widest text-indigo-700 mb-1">
            OFFICIAL COURSE SYLLABUS & CURRICULUM SPECIFICATION
          </div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900">
            {curriculum.title}
          </h1>
          {curriculum.tagline && (
            <p className="text-sm font-medium text-slate-600 mt-1 italic">
              {curriculum.tagline}
            </p>
          )}

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-4 border-t border-slate-200 text-xs">
            <div>
              <span className="font-bold text-slate-500 uppercase tracking-wider block">Duration</span>
              <span className="font-semibold text-slate-900">{curriculum.duration}</span>
            </div>
            <div>
              <span className="font-bold text-slate-500 uppercase tracking-wider block">Total Hours</span>
              <span className="font-semibold text-slate-900">~{curriculum.estimatedTotalHours} Hours</span>
            </div>
            <div>
              <span className="font-bold text-slate-500 uppercase tracking-wider block">Audience Level</span>
              <span className="font-semibold text-slate-900">{curriculum.difficultyLevel}</span>
            </div>
            <div>
              <span className="font-bold text-slate-500 uppercase tracking-wider block">Delivery Format</span>
              <span className="font-semibold text-slate-900">{curriculum.deliveryFormat}</span>
            </div>
          </div>
        </div>

        {/* Section 1: Course Description & Original Objectives */}
        <div className="space-y-3">
          <h2 className="text-sm font-black uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1">
            1. Course Description & Learning Objectives
          </h2>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            {curriculum.courseDescription}
          </p>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 mt-3 text-xs">
            <span className="font-bold text-slate-900 block mb-1">Target Learning Objectives Provided:</span>
            <p className="text-slate-700 italic">"{curriculum.originalObjectives}"</p>
          </div>
        </div>

        {/* Section 2: Key Competencies & Prerequisites */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {curriculum.keyTakeaways && curriculum.keyTakeaways.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 mb-2">
                2. Key Competencies Mastered
              </h3>
              <ul className="text-xs space-y-1.5 text-slate-700 list-disc list-inside">
                {curriculum.keyTakeaways.map((k, i) => (
                  <li key={i}>{k}</li>
                ))}
              </ul>
            </div>
          )}

          {curriculum.prerequisites && curriculum.prerequisites.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 mb-2">
                3. Course Prerequisites
              </h3>
              <ul className="text-xs space-y-1.5 text-slate-700 list-disc list-inside">
                {curriculum.prerequisites.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Section 3: Schedule of Modules */}
        <div className="space-y-4 pt-4">
          <h2 className="text-sm font-black uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1">
            4. Detailed Modular Course Schedule
          </h2>

          <div className="space-y-6">
            {curriculum.modules.map(mod => (
              <div key={mod.id} className="border border-slate-200 rounded-xl p-5 print-avoid-break">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-3">
                  <div>
                    <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider mr-2">
                      Module {mod.moduleNumber} [{mod.level}]
                    </span>
                    <h3 className="text-base font-bold text-slate-900 inline">
                      {mod.title}
                    </h3>
                  </div>
                  <span className="text-xs font-semibold text-slate-500">
                    {mod.durationWeeksOrHours}
                  </span>
                </div>

                <p className="text-xs text-slate-600 mb-3">{mod.overview}</p>

                {/* Subtopics */}
                <div className="mb-3">
                  <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1">
                    Units & Subtopics:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {mod.subtopics.map(st => (
                      <div key={st.id} className="bg-slate-50 p-2 rounded border border-slate-200/60">
                        <div className="font-semibold text-slate-800">{st.title} ({st.estimatedHours}h)</div>
                        <div className="text-[11px] text-slate-500 line-clamp-1">{st.description}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Outcomes & Assessments */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2 border-t border-slate-100">
                  <div>
                    <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1">
                      Target Learning Outcomes:
                    </span>
                    <ul className="space-y-1 list-disc list-inside text-slate-600 text-[11px]">
                      {mod.learningOutcomes.map((lo, lIdx) => (
                        <li key={lIdx}>
                          <span className="font-medium text-slate-800">[{lo.bloomsLevel}]</span> {lo.outcome}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1">
                      Assessments:
                    </span>
                    <ul className="space-y-1 text-slate-600 text-[11px]">
                      {mod.assessments.map((as, aIdx) => (
                        <li key={aIdx} className="flex items-center gap-1.5">
                          <span className="font-semibold text-indigo-700">[{as.type}]</span>
                          <span>{as.title} {as.weightPercentage ? `(${as.weightPercentage}%)` : ''}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 4: Final Capstone & Grading Policy */}
        <div className="space-y-3 pt-4 print-avoid-break">
          <h2 className="text-sm font-black uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1">
            5. Final Capstone Project & Evaluation Rubric
          </h2>
          <div className="border border-slate-300 rounded-xl p-5 bg-slate-50">
            <h3 className="text-base font-bold text-slate-900 mb-1">
              {curriculum.finalAssessment.capstoneProjectTitle}
            </h3>
            <p className="text-xs text-slate-700 leading-relaxed mb-4">
              {curriculum.finalAssessment.capstoneDescription}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="font-bold text-slate-900 block mb-1">Required Deliverables:</span>
                <ul className="list-disc list-inside text-slate-700 space-y-1">
                  {curriculum.finalAssessment.deliverables.map((del, dIdx) => (
                    <li key={dIdx}>{del}</li>
                  ))}
                </ul>
              </div>

              <div>
                <span className="font-bold text-slate-900 block mb-1">Evaluation Criteria:</span>
                <ul className="list-disc list-inside text-slate-700 space-y-1">
                  {curriculum.finalAssessment.evaluationCriteria.map((crit, cIdx) => (
                    <li key={cIdx}>{crit}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
