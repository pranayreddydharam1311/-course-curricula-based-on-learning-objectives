import React, { useState } from 'react';
import { ModuleQuiz, QuizQuestion } from '../types/curriculum.ts';
import { 
  X, 
  CheckCircle, 
  XCircle, 
  HelpCircle, 
  RotateCcw, 
  Award, 
  Eye, 
  EyeOff, 
  Sparkles 
} from 'lucide-react';

interface QuizModalProps {
  quiz: ModuleQuiz | null;
  isLoading: boolean;
  onClose: () => void;
}

export const QuizModal: React.FC<QuizModalProps> = ({ quiz, isLoading, onClose }) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [showAnswerKey, setShowAnswerKey] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!quiz && !isLoading) return null;

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    if (submitted) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setSubmitted(false);
    setShowAnswerKey(false);
  };

  const calculateScore = () => {
    if (!quiz) return { correct: 0, total: 0 };
    let correct = 0;
    quiz.questions.forEach(q => {
      if (selectedAnswers[q.id] === q.correctAnswerIndex) {
        correct++;
      }
    });
    return { correct, total: quiz.questions.length };
  };

  const { correct, total } = calculateScore();
  const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden my-8">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-indigo-900 to-slate-900 text-white flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-indigo-300 text-xs font-bold uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Diagnostic Assessment Quiz</span>
            </div>
            <h2 className="text-xl font-bold tracking-tight">
              {quiz?.moduleTitle || 'Generating Diagnostic Quiz...'}
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
                Generating 5 diagnostic questions with Bloom's Taxonomy evaluation...
              </div>
              <p className="text-xs text-slate-400 max-w-xs mx-auto">
                Synthesizing targeted multiple choice items and detailed reasoning.
              </p>
            </div>
          ) : quiz ? (
            <>
              {/* Controls bar */}
              <div className="flex items-center justify-between text-xs pb-3 border-b border-slate-100">
                <span className="font-semibold text-slate-600">
                  {quiz.questions.length} Questions
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowAnswerKey(!showAnswerKey)}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                  >
                    {showAnswerKey ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    <span>{showAnswerKey ? 'Hide Answers' : 'Reveal Answer Key'}</span>
                  </button>
                  <button
                    onClick={handleReset}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset</span>
                  </button>
                </div>
              </div>

              {/* Submitted Score Banner */}
              {submitted && (
                <div className={`p-4 rounded-2xl border ${percentage >= 70 ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-amber-50 border-amber-200 text-amber-900'} flex items-center justify-between`}>
                  <div className="flex items-center gap-3">
                    <Award className="w-7 h-7 shrink-0" />
                    <div>
                      <span className="font-bold text-sm block">Quiz Results</span>
                      <span className="text-xs">
                        You scored {correct} out of {total} ({percentage}%)
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={handleReset}
                    className="px-3 py-1.5 text-xs font-bold rounded-lg bg-white border border-slate-200 shadow-2xs hover:bg-slate-50"
                  >
                    Try Again
                  </button>
                </div>
              )}

              {/* Questions List */}
              <div className="space-y-6">
                {quiz.questions.map((q, qIdx) => {
                  const userSelection = selectedAnswers[q.id];
                  const isRevealed = submitted || showAnswerKey;

                  return (
                    <div 
                      key={q.id || qIdx} 
                      className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                          Question {qIdx + 1}
                        </span>
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider bg-white px-2 py-0.5 rounded border border-slate-200">
                          Bloom's: {q.bloomsLevel}
                        </span>
                      </div>

                      <h4 className="font-bold text-sm text-slate-900 leading-snug">
                        {q.question}
                      </h4>

                      {/* Options */}
                      <div className="space-y-2 pt-1">
                        {q.options.map((opt, optIdx) => {
                          const isSelected = userSelection === optIdx;
                          const isCorrect = optIdx === q.correctAnswerIndex;

                          let optionClass = 'bg-white hover:bg-indigo-50/50 border-slate-200 text-slate-700';

                          if (isRevealed) {
                            if (isCorrect) {
                              optionClass = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-semibold';
                            } else if (isSelected && !isCorrect) {
                              optionClass = 'bg-rose-50 border-rose-400 text-rose-900 line-through';
                            } else {
                              optionClass = 'bg-white border-slate-200 text-slate-400 opacity-60';
                            }
                          } else if (isSelected) {
                            optionClass = 'bg-indigo-50 border-indigo-600 text-indigo-900 font-semibold ring-1 ring-indigo-500';
                          }

                          return (
                            <button
                              key={optIdx}
                              type="button"
                              onClick={() => handleSelectOption(q.id, optIdx)}
                              disabled={submitted}
                              className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm transition-all flex items-center justify-between gap-3 cursor-pointer ${optionClass}`}
                            >
                              <div className="flex items-center gap-2.5">
                                <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px] font-bold shrink-0">
                                  {String.fromCharCode(65 + optIdx)}
                                </span>
                                <span>{opt}</span>
                              </div>

                              {isRevealed && isCorrect && (
                                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                              )}
                              {isRevealed && isSelected && !isCorrect && (
                                <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                              )}
                            </button>
                          );
                        })}
                      </div>

                      {/* Explanation */}
                      {isRevealed && (
                        <div className="mt-3 p-3 rounded-xl bg-indigo-50/60 border border-indigo-100 text-xs text-indigo-950">
                          <span className="font-bold block mb-1">Explanation:</span>
                          <p className="text-slate-700 leading-relaxed">{q.explanation}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </>
          ) : null}
        </div>

        {/* Footer */}
        {quiz && !isLoading && (
          <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
            <span className="text-xs text-slate-500">
              {Object.keys(selectedAnswers).length} of {quiz.questions.length} answered
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
              >
                Close
              </button>
              {!submitted && (
                <button
                  onClick={() => setSubmitted(true)}
                  disabled={Object.keys(selectedAnswers).length === 0}
                  className="px-5 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs disabled:opacity-50"
                >
                  Submit & Check Answers
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
