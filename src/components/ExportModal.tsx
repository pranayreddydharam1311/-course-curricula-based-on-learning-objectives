import React, { useState } from 'react';
import { CourseCurriculum } from '../types/curriculum.ts';
import { X, Download, Copy, Check, FileCode, FileText, CheckCircle2 } from 'lucide-react';

interface ExportModalProps {
  curriculum: CourseCurriculum;
  onClose: () => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({ curriculum, onClose }) => {
  const [copiedType, setCopiedType] = useState<string | null>(null);

  const generateMarkdown = () => {
    let md = `# ${curriculum.title}\n`;
    if (curriculum.tagline) md += `*${curriculum.tagline}*\n\n`;
    md += `**Duration:** ${curriculum.duration} | **Total Hours:** ~${curriculum.estimatedTotalHours} hrs | **Level:** ${curriculum.difficultyLevel}\n\n`;
    md += `## Course Overview\n${curriculum.courseDescription}\n\n`;
    md += `**Target Learning Objectives:**\n> "${curriculum.originalObjectives}"\n\n`;

    if (curriculum.keyTakeaways?.length) {
      md += `### Key Competencies\n`;
      curriculum.keyTakeaways.forEach(k => {
        md += `- ${k}\n`;
      });
      md += `\n`;
    }

    if (curriculum.prerequisites?.length) {
      md += `### Prerequisites\n`;
      curriculum.prerequisites.forEach(p => {
        md += `- ${p}\n`;
      });
      md += `\n`;
    }

    md += `## Course Curriculum Modules\n\n`;
    curriculum.modules.forEach(m => {
      md += `### Module ${m.moduleNumber}: ${m.title} (${m.durationWeeksOrHours}) [${m.level}]\n`;
      md += `${m.overview}\n\n`;

      md += `#### Subtopics & Units:\n`;
      m.subtopics.forEach(st => {
        md += `- **${st.title}** (${st.estimatedHours}h, ${st.teachingMethod}): ${st.description}\n`;
      });
      md += `\n`;

      md += `#### Learning Outcomes (Bloom's Taxonomy):\n`;
      m.learningOutcomes.forEach(lo => {
        md += `- [${lo.bloomsLevel}] ${lo.outcome}\n`;
      });
      md += `\n`;

      md += `#### Assessments:\n`;
      m.assessments.forEach(as => {
        md += `- **[${as.type}]** ${as.title}${as.weightPercentage ? ` (${as.weightPercentage}%)` : ''}: ${as.description}\n`;
      });
      md += `\n---\n\n`;
    });

    md += `## Final Capstone Project & Evaluation\n`;
    md += `### ${curriculum.finalAssessment.capstoneProjectTitle}\n`;
    md += `${curriculum.finalAssessment.capstoneDescription}\n\n`;

    md += `#### Deliverables:\n`;
    curriculum.finalAssessment.deliverables.forEach(d => {
      md += `- ${d}\n`;
    });
    md += `\n`;

    md += `#### Evaluation Criteria:\n`;
    curriculum.finalAssessment.evaluationCriteria.forEach(c => {
      md += `- ${c}\n`;
    });

    return md;
  };

  const handleDownloadMarkdown = () => {
    const md = generateMarkdown();
    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${curriculum.title.toLowerCase().replace(/[^a-z0-9]+/g, '_')}_curriculum.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadJSON = () => {
    const jsonStr = JSON.stringify(curriculum, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${curriculum.title.toLowerCase().replace(/[^a-z0-9]+/g, '_')}_curriculum.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopy = (type: 'md' | 'json') => {
    const text = type === 'md' ? generateMarkdown() : JSON.stringify(curriculum, null, 2);
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden">
        <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Download className="w-5 h-5 text-indigo-400" />
            <h3 className="font-bold text-lg">Export Course Curriculum</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <p className="text-xs text-slate-600">
            Export the complete curriculum for documentation, Learning Management Systems (LMS), syllabus distribution, or team sharing.
          </p>

          {/* Markdown Option */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText className="w-8 h-8 text-indigo-600 shrink-0" />
              <div>
                <span className="font-bold text-sm text-slate-900 block">Markdown Document (.md)</span>
                <span className="text-xs text-slate-500">Formatted with headings, lists & tables</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleCopy('md')}
                className="p-2 text-xs font-medium text-slate-700 hover:text-indigo-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-100"
                title="Copy to clipboard"
              >
                {copiedType === 'md' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
              <button
                onClick={handleDownloadMarkdown}
                className="px-3 py-1.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-xs flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Save</span>
              </button>
            </div>
          </div>

          {/* JSON Option */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileCode className="w-8 h-8 text-sky-600 shrink-0" />
              <div>
                <span className="font-bold text-sm text-slate-900 block">Structured JSON (.json)</span>
                <span className="text-xs text-slate-500">Raw data for LMS or API programmatic import</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleCopy('json')}
                className="p-2 text-xs font-medium text-slate-700 hover:text-sky-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-100"
                title="Copy to clipboard"
              >
                {copiedType === 'json' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
              <button
                onClick={handleDownloadJSON}
                className="px-3 py-1.5 text-xs font-bold text-white bg-sky-600 hover:bg-sky-700 rounded-lg shadow-xs flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Save</span>
              </button>
            </div>
          </div>
        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold text-slate-700 hover:text-slate-900"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
