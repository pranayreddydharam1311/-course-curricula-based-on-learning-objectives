import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  SlidersHorizontal, 
  Layers, 
  Target, 
  Clock, 
  GraduationCap, 
  CheckCircle2, 
  Code, 
  Globe, 
  Cpu, 
  Palette, 
  Shield, 
  ChevronDown, 
  ChevronUp,
  BrainCircuit,
  Workflow
} from 'lucide-react';
import { GenerateCurriculumRequest } from '../types/curriculum.ts';
import { PRESET_OBJECTIVES, ObjectivePreset } from '../data/presets.ts';

interface ObjectiveInputFormProps {
  onGenerate: (data: GenerateCurriculumRequest) => Promise<void>;
  isLoading: boolean;
  onSelectPresetDirectly?: (preset: ObjectivePreset) => void;
}

export const ObjectiveInputForm: React.FC<ObjectiveInputFormProps> = ({
  onGenerate,
  isLoading,
}) => {
  const [learningObjectives, setLearningObjectives] = useState('');
  const [courseTitle, setCourseTitle] = useState('');
  const [targetAudience, setTargetAudience] = useState('Beginner to Intermediate learners');
  const [duration, setDuration] = useState('8-weeks');
  const [weeklyHours, setWeeklyHours] = useState(6);
  const [deliveryFormat, setDeliveryFormat] = useState('Blended (Lectures & Hands-on Labs)');
  const [prerequisites, setPrerequisites] = useState('');
  const [industryAlignment, setIndustryAlignment] = useState('Practical Industry Standards & Certification');
  const [showAdvanced, setShowAdvanced] = useState(false);

  const applyPreset = (preset: ObjectivePreset) => {
    setLearningObjectives(preset.objectives);
    setCourseTitle(preset.title);
    setTargetAudience(preset.targetAudience);
    setDuration(preset.duration);
    setWeeklyHours(preset.weeklyHours);
    setDeliveryFormat(preset.deliveryFormat);
    setPrerequisites(preset.prerequisites);
    setIndustryAlignment(preset.industryAlignment);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!learningObjectives.trim() || isLoading) return;

    onGenerate({
      learningObjectives: learningObjectives.trim(),
      courseTitle: courseTitle.trim() || undefined,
      targetAudience,
      duration,
      weeklyHours,
      deliveryFormat,
      prerequisites: prerequisites.trim() || undefined,
      industryAlignment: industryAlignment.trim() || undefined,
    });
  };

  const getPresetIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code': return <Code className="w-3.5 h-3.5" />;
      case 'Globe': return <Globe className="w-3.5 h-3.5" />;
      case 'Cpu': return <Cpu className="w-3.5 h-3.5" />;
      case 'Palette': return <Palette className="w-3.5 h-3.5" />;
      case 'Shield': return <Shield className="w-3.5 h-3.5" />;
      default: return <GraduationCap className="w-3.5 h-3.5" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
      {/* Hero Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold mb-4 shadow-xs">
          <BrainCircuit className="w-3.5 h-3.5 text-indigo-600 animate-pulse" />
          <span>Curriculum Architecture Engine</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
          AI-Powered Course <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-indigo-600 via-sky-600 to-indigo-700 bg-clip-text text-transparent">
            Curriculum Generator
          </span>
        </h1>
        <p className="mt-3.5 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Provide your target learning objectives and let AI engineer an accredited-quality course structure with progressive modules, measurable Bloom's taxonomy outcomes, and assessment rubrics.
        </p>
      </div>

      {/* Preset Inspirations */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Quick Start Objective Presets:
          </span>
          <span className="text-xs text-slate-400">Click to autofill</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {PRESET_OBJECTIVES.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => applyPreset(p)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-white hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 border border-slate-200 hover:border-indigo-200 transition-all shadow-xs hover:shadow-sm"
            >
              <span className="text-indigo-600">{getPresetIcon(p.iconName)}</span>
              <span>{p.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Generator Form Card */}
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden transition-all">
        <div className="p-6 sm:p-8 space-y-6">
          {/* Learning Objectives Input */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="objectives" className="flex items-center gap-2 text-sm font-bold text-slate-900">
                <Target className="w-4 h-4 text-indigo-600" />
                <span>Input Learning Objectives & Goals</span>
                <span className="text-rose-500">*</span>
              </label>
              <span className="text-xs text-slate-400">Describe what students should master</span>
            </div>

            <textarea
              id="objectives"
              rows={4}
              value={learningObjectives}
              onChange={(e) => setLearningObjectives(e.target.value)}
              placeholder="e.g., 'Students should understand Python programming, master syntax, data collections, write object-oriented code, handle file operations, and build functional end-to-end applications.'"
              required
              disabled={isLoading}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-3 focus:ring-indigo-500/15 text-slate-800 text-sm sm:text-base placeholder-slate-400 transition-all resize-y shadow-inner"
            />
            <p className="mt-1.5 text-xs text-slate-500">
              💡 Tip: Include both high-level goals and specific tools or practical outcomes for sharper module segmentation.
            </p>
          </div>

          {/* Optional Course Title */}
          <div>
            <label htmlFor="title" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Course Title <span className="text-slate-400 font-normal lowercase">(optional - AI will generate if blank)</span>
            </label>
            <input
              id="title"
              type="text"
              value={courseTitle}
              onChange={(e) => setCourseTitle(e.target.value)}
              placeholder="e.g., Python Programming: From Syntax to Real-World Applications"
              disabled={isLoading}
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/15 text-sm text-slate-800 placeholder-slate-400"
            />
          </div>

          {/* Pedagogical Parameters Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Target Audience
              </label>
              <select
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                disabled={isLoading}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-xs sm:text-sm text-slate-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/15"
              >
                <option value="Beginners with zero background">Beginners (Zero Background)</option>
                <option value="Beginner to Intermediate learners">Beginner to Intermediate</option>
                <option value="Intermediate Practitioners">Intermediate Practitioners</option>
                <option value="Advanced / Professional Engineers">Advanced / Industry Professionals</option>
                <option value="Undergraduate College Students">Undergraduate College Students</option>
                <option value="High School STEM Students">High School STEM Students</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Course Duration
              </label>
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                disabled={isLoading}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-xs sm:text-sm text-slate-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/15"
              >
                <option value="4-weeks (Accelerated / Mini-course)">4 Weeks (Accelerated / Mini-course)</option>
                <option value="6-weeks (Standard Short Course)">6 Weeks (Standard Short Course)</option>
                <option value="8-weeks (Comprehensive Foundation)">8 Weeks (Comprehensive Foundation)</option>
                <option value="12-weeks (Full Semester / Bootcamp)">12 Weeks (Full Semester / Bootcamp)</option>
                <option value="16-weeks (Academic Semester)">16 Weeks (Academic Semester)</option>
                <option value="Self-Paced Mastery">Self-Paced Mastery</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Weekly Hours ({weeklyHours} hrs/wk)
              </label>
              <input
                type="range"
                min="2"
                max="20"
                step="1"
                value={weeklyHours}
                onChange={(e) => setWeeklyHours(Number(e.target.value))}
                disabled={isLoading}
                className="w-full accent-indigo-600 mt-2"
              />
              <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                <span>2 hrs (Light)</span>
                <span>8 hrs (Balanced)</span>
                <span>20 hrs (Intensive)</span>
              </div>
            </div>
          </div>

          {/* Advanced Customizations Accordion */}
          <div className="border-t border-slate-200/80 pt-4">
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="flex items-center justify-between w-full text-xs font-semibold uppercase tracking-wider text-slate-600 hover:text-indigo-600 transition-colors"
            >
              <span className="flex items-center gap-1.5">
                <SlidersHorizontal className="w-3.5 h-3.5" />
                Additional Pedagogical Settings (Prerequisites, Format, Industry Standards)
              </span>
              {showAdvanced ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {showAdvanced && (
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200/70">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Delivery Format
                  </label>
                  <select
                    value={deliveryFormat}
                    onChange={(e) => setDeliveryFormat(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-xs text-slate-800"
                  >
                    <option value="Blended (Lectures & Hands-on Labs)">Blended (Lectures & Hands-on Labs)</option>
                    <option value="100% Online Asynchronous">100% Online Asynchronous (Self-Paced)</option>
                    <option value="Live Virtual Bootcamp">Live Virtual Bootcamp</option>
                    <option value="In-Person University Lecture & Lab">In-Person University Lecture & Lab</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Industry / Certification Target
                  </label>
                  <input
                    type="text"
                    value={industryAlignment}
                    onChange={(e) => setIndustryAlignment(e.target.value)}
                    placeholder="e.g. Associate Developer Certification, Portfolio-Ready"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-xs text-slate-800"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Prerequisites (if any)
                  </label>
                  <input
                    type="text"
                    value={prerequisites}
                    onChange={(e) => setPrerequisites(e.target.value)}
                    placeholder="e.g. Basic algebra, familiarity with using a computer command line"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-xs text-slate-800"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Form Footer & Submit Action */}
        <div className="bg-slate-50 px-6 sm:px-8 py-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-500 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
            <span>Structured progression: Foundational &rarr; Core &rarr; Intermediate &rarr; Advanced &rarr; Capstone</span>
          </div>

          <button
            type="submit"
            disabled={!learningObjectives.trim() || isLoading}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-indigo-600 via-indigo-700 to-sky-600 hover:from-indigo-500 hover:to-sky-500 shadow-md shadow-indigo-600/30 transition-all transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Architecting Curriculum...</span>
              </>
            ) : (
              <>
                <span>Generate Complete Curriculum</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </form>

      {/* How it works 7-Step Pipeline Infographic */}
      <div className="mt-12 bg-white/70 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-2 mb-4">
          <Workflow className="w-5 h-5 text-indigo-600" />
          <h2 className="text-base font-bold text-slate-900 tracking-tight">How the AI Curriculum Architecture Engine Works</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/60">
            <div className="flex items-center gap-2 font-bold text-indigo-900 mb-1">
              <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px]">1</span>
              <span>Input Learning Objectives</span>
            </div>
            <p className="text-slate-600 leading-relaxed">Enter skills, target competencies, and subject areas students must learn.</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/60">
            <div className="flex items-center gap-2 font-bold text-indigo-900 mb-1">
              <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px]">2</span>
              <span>AI Analysis & Topics</span>
            </div>
            <p className="text-slate-600 leading-relaxed">AI performs semantic decomposition to identify critical domain concepts.</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/60">
            <div className="flex items-center gap-2 font-bold text-indigo-900 mb-1">
              <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px]">3</span>
              <span>Progression Structuring</span>
            </div>
            <p className="text-slate-600 leading-relaxed">Sequences modules systematically from foundational to advanced capstone.</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/60">
            <div className="flex items-center gap-2 font-bold text-indigo-900 mb-1">
              <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px]">4</span>
              <span>Outcomes & Assessments</span>
            </div>
            <p className="text-slate-600 leading-relaxed">Attaches Bloom's taxonomy outcomes, quizzes, labs, assignments, and projects.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
