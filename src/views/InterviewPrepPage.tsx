import React, { useState, useEffect } from 'react';
import { InterviewSession } from '../types';
import { api } from '../services/api';
import { Mic, Sparkles, CheckCircle2, AlertTriangle, ArrowRight, RotateCcw, Award, Check, Loader2, BookOpen, Clock } from 'lucide-react';

interface InterviewPrepPageProps {
  initialRole?: string;
}

export const InterviewPrepPage: React.FC<InterviewPrepPageProps> = ({ initialRole }) => {
  const [role, setRole] = useState(initialRole || 'Junior Full Stack Developer');
  const [category, setCategory] = useState<'Technical' | 'HR' | 'Coding' | 'Aptitude' | 'Behavioral'>('Technical');
  const [difficulty, setDifficulty] = useState<'Entry-Level / Fresher' | 'Mid-Level'>('Entry-Level / Fresher');

  const [activeSession, setActiveSession] = useState<InterviewSession | null>(null);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isStarting, setIsStarting] = useState(false);
  const [history, setHistory] = useState<InterviewSession[]>([]);
  const [errorMsg, setErrorMsg] = useState('');

  const commonRoles = [
    'Junior Full Stack Developer',
    'Graduate Data Analyst',
    'Associate Cloud & DevOps Engineer',
    'UI/UX Product Designer',
    'Financial Analyst Trainee',
    'Associate Business Development Executive',
    'Cybersecurity Analyst L1',
    'HR & Talent Acquisition Trainee'
  ];

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const res = await api.getInterviewHistory();
      if (res.sessions) {
        setHistory(res.sessions);
      }
    } catch (err) {
      console.warn('Could not load interview history:', err);
    }
  };

  const handleStartInterview = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsStarting(true);
    setErrorMsg('');
    try {
      const session = await api.startInterview({ role, category, difficulty });
      setActiveSession(session);
      setCurrentAnswer('');
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to start interview session.');
    } finally {
      setIsStarting(false);
    }
  };

  const handleSubmitAnswer = async () => {
    if (!activeSession || !currentAnswer.trim() || isSubmitting) return;

    setIsSubmitting(true);
    setErrorMsg('');
    try {
      const qIndex = activeSession.currentQuestionIndex;
      const res = await api.submitInterviewAnswer(activeSession.id, qIndex, currentAnswer.trim());

      const updatedQuestions = [...activeSession.questions];
      updatedQuestions[qIndex] = {
        ...updatedQuestions[qIndex],
        userAnswer: currentAnswer.trim(),
        aiFeedback: res.feedback,
      };

      setActiveSession({
        ...activeSession,
        questions: updatedQuestions,
        currentQuestionIndex: res.nextQuestionIndex,
      });

      if (res.isFinished) {
        const finishRes = await api.finishInterview(activeSession.id);
        setActiveSession(finishRes.session);
        loadHistory();
      } else {
        setCurrentAnswer('');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to evaluate answer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setActiveSession(null);
    setCurrentAnswer('');
  };

  return (
    <div className="bg-slate-50/60 min-h-screen py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-teal-50 text-teal-800 border border-teal-200 mb-2">
            <Mic className="w-3.5 h-3.5" />
            <span>Turn-by-Turn AI Interview Simulator</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Practice Real Job Interviews
          </h1>
          <p className="mt-2 text-slate-600 text-sm sm:text-base">
            Simulate realistic Indian campus and corporate interview rounds. Receive turn-by-turn scores, strengths, and improved model answers powered by Gemini.
          </p>
        </div>

        {errorMsg && (
          <div className="mb-6 p-3.5 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {!activeSession ? (
          /* Step 1: Configuration Form */
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-8 max-w-2xl mx-auto">
            <h2 className="text-lg font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">
              Configure Your Mock Interview
            </h2>

            <form onSubmit={handleStartInterview} className="space-y-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Target Role
                </label>
                <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="e.g. Junior Full Stack Developer"
                  className="w-full text-sm bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition mb-2"
                  required
                />
                <div className="flex flex-wrap gap-1.5">
                  {commonRoles.slice(0, 4).map((r) => (
                    <button
                      type="button"
                      key={r}
                      onClick={() => setRole(r)}
                      className="text-[11px] bg-slate-100 hover:bg-teal-50 hover:text-teal-700 text-slate-600 px-2.5 py-1 rounded-md transition cursor-pointer"
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Interview Category
                  </label>
                  <select
                    value={category}
                    onChange={(e: any) => setCategory(e.target.value)}
                    className="w-full text-sm bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                  >
                    <option value="Technical">Technical Round</option>
                    <option value="HR">HR & Cultural Fit</option>
                    <option value="Coding">Coding Problem Solving</option>
                    <option value="Aptitude">Aptitude & Logic</option>
                    <option value="Behavioral">Behavioral (STAR Method)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Experience Level
                  </label>
                  <select
                    value={difficulty}
                    onChange={(e: any) => setDifficulty(e.target.value)}
                    className="w-full text-sm bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                  >
                    <option value="Entry-Level / Fresher">Entry-Level / Fresher</option>
                    <option value="Mid-Level">Mid-Level (1-3 yrs)</option>
                  </select>
                </div>
              </div>

              <div className="bg-teal-50/70 p-4 rounded-xl border border-teal-100 text-xs text-teal-900 leading-relaxed">
                <strong>How it works:</strong> Gemini will ask you 4 tailored interview questions one at a time. After each answer, you will see objective feedback, a score out of 10, and a sample model answer. At the end, a comprehensive readiness scorecard is generated.
              </div>

              <button
                type="submit"
                disabled={isStarting}
                className="w-full bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white font-semibold py-3 rounded-xl text-sm sm:text-base shadow-sm transition flex items-center justify-center gap-2 cursor-pointer"
              >
                {isStarting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Generating Interview Room...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    <span>Begin AI Mock Interview</span>
                  </>
                )}
              </button>
            </form>
          </div>
        ) : activeSession.finalScorecard ? (
          /* Step 3: End of Session Scorecard */
          <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-6 sm:p-8 space-y-6 animate-in fade-in duration-300">
            <div className="text-center pb-6 border-b border-slate-100">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto mb-3">
                <Award className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">
                Mock Interview Complete!
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                {activeSession.role} • {activeSession.category} Round
              </p>
            </div>

            {/* Scorecard Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-xs font-semibold text-slate-500 uppercase">Overall Score</div>
                <div className="text-3xl font-extrabold text-teal-600 mt-1">
                  {activeSession.finalScorecard.overallScore}%
                </div>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-xs font-semibold text-slate-500 uppercase">Communication</div>
                <div className="text-3xl font-extrabold text-slate-800 mt-1">
                  {activeSession.finalScorecard.communicationScore}%
                </div>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-xs font-semibold text-slate-500 uppercase">Job Readiness</div>
                <div className="text-xl font-bold text-emerald-700 mt-2">
                  {activeSession.finalScorecard.readinessRating}
                </div>
              </div>
            </div>

            {/* Strengths & Recommendations */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 mb-2 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Key Strengths
                </h4>
                <ul className="space-y-1.5 text-xs text-emerald-950">
                  {activeSession.finalScorecard.strengths.map((s, i) => (
                    <li key={i}>• {s}</li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-800 mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  Actionable Recommendations
                </h4>
                <ul className="space-y-1.5 text-xs text-amber-950">
                  {activeSession.finalScorecard.recommendations.map((r, i) => (
                    <li key={i}>• {r}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Q&A Review */}
            <div>
              <h4 className="text-sm font-bold text-slate-900 mb-3">Round Summary Review</h4>
              <div className="space-y-3">
                {activeSession.questions.map((q, idx) => (
                  <div key={q.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                    <div className="flex items-center justify-between font-bold text-slate-900 mb-1">
                      <span>Question {idx + 1}: {q.questionText}</span>
                      <span className="text-teal-700 bg-white px-2 py-0.5 rounded border border-slate-200">
                        Score: {q.aiFeedback?.scoreOutOfTen || 0}/10
                      </span>
                    </div>
                    <p className="text-slate-600 mt-1 mb-2 italic">"{q.userAnswer}"</p>
                    {q.aiFeedback && (
                      <div className="bg-white p-2.5 rounded-lg border border-slate-200 text-slate-700 leading-relaxed">
                        <strong className="text-slate-900">Model Answer: </strong>
                        {q.aiFeedback.sampleBetterAnswer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={handleReset}
                className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-4 py-2.5 rounded-lg flex items-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Start Another Session</span>
              </button>
              <button
                onClick={() => window.print()}
                className="border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold px-4 py-2.5 rounded-lg cursor-pointer"
              >
                Print Scorecard
              </button>
            </div>
          </div>
        ) : (
          /* Step 2: Interactive Question & Evaluation Simulator */
          <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-6 sm:p-8 space-y-6">
            {/* Round info bar */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <span className="text-xs font-semibold text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded">
                  {activeSession.role}
                </span>
                <span className="text-xs text-slate-400 ml-2">
                  Question {activeSession.currentQuestionIndex + 1} of {activeSession.questions.length}
                </span>
              </div>
              <button
                onClick={handleReset}
                className="text-xs text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                End Session
              </button>
            </div>

            {/* Current Question */}
            {activeSession.questions[activeSession.currentQuestionIndex] && (
              <div className="bg-slate-900 text-white p-5 rounded-xl space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-teal-400">
                  {activeSession.questions[activeSession.currentQuestionIndex].category}
                </span>
                <h3 className="text-base sm:text-lg font-bold leading-snug">
                  {activeSession.questions[activeSession.currentQuestionIndex].questionText}
                </h3>
              </div>
            )}

            {/* Previous feedback if available */}
            {activeSession.currentQuestionIndex > 0 &&
              activeSession.questions[activeSession.currentQuestionIndex - 1]?.aiFeedback && (
                <div className="p-4 bg-teal-50/70 border border-teal-100 rounded-xl space-y-2 text-xs">
                  <div className="flex items-center justify-between font-bold text-teal-900">
                    <span>Feedback on Previous Answer:</span>
                    <span className="bg-teal-600 text-white px-2 py-0.5 rounded text-[11px]">
                      Score: {activeSession.questions[activeSession.currentQuestionIndex - 1].aiFeedback?.scoreOutOfTen}/10
                    </span>
                  </div>
                  <p className="text-slate-700 leading-relaxed">
                    {activeSession.questions[activeSession.currentQuestionIndex - 1].aiFeedback?.evaluationSummary}
                  </p>
                  <div className="bg-white p-3 rounded-lg border border-teal-100 mt-2">
                    <span className="font-semibold text-teal-800">Sample Model Response: </span>
                    <span className="text-slate-600">
                      {activeSession.questions[activeSession.currentQuestionIndex - 1].aiFeedback?.sampleBetterAnswer}
                    </span>
                  </div>
                </div>
              )}

            {/* Answer Input */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Your Answer
              </label>
              <textarea
                rows={5}
                value={currentAnswer}
                onChange={(e) => setCurrentAnswer(e.target.value)}
                placeholder="Type your response here... (Structure your answer using the STAR method: Situation, Task, Action, Result)"
                className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl p-3.5 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition leading-relaxed"
                disabled={isSubmitting}
              />
            </div>

            {/* Submit Action */}
            <div className="flex items-center justify-between pt-2">
              <div className="text-xs text-slate-400">
                Tip: Speak with specific technical tools, metrics, and outcomes.
              </div>
              <button
                onClick={handleSubmitAnswer}
                disabled={!currentAnswer.trim() || isSubmitting}
                className="bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white font-semibold px-5 py-2.5 rounded-lg text-sm flex items-center gap-2 transition cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Evaluating Answer with Gemini...</span>
                  </>
                ) : (
                  <>
                    <span>Submit & Get Feedback</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Previous Practice History */}
        {history.length > 0 && !activeSession && (
          <div className="mt-12 bg-white rounded-2xl border border-slate-200 p-6">
            <h3 className="font-bold text-sm text-slate-900 mb-3">Your Completed Interview Sessions</h3>
            <div className="space-y-2.5">
              {history.map((s) => (
                <div key={s.id} className="p-3 bg-slate-50 rounded-lg flex items-center justify-between text-xs border border-slate-100">
                  <div>
                    <span className="font-bold text-slate-800">{s.role}</span>
                    <span className="text-slate-400 ml-2">({s.category})</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-teal-700">
                      Score: {s.finalScorecard?.overallScore || 70}%
                    </span>
                    <span className="text-slate-400">
                      {new Date(s.startedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
