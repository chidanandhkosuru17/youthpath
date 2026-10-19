import React, { useState } from 'react';
import { ResumeData } from '../types';
import { api } from '../services/api';
import { FileText, Sparkles, Printer, Plus, Trash2, CheckCircle2, ArrowRight, Loader2, RefreshCw } from 'lucide-react';

interface ResumeBuilderPageProps {
  initialResume: ResumeData;
  onSaveResume: (resume: ResumeData) => void;
}

export const ResumeBuilderPage: React.FC<ResumeBuilderPageProps> = ({
  initialResume,
  onSaveResume,
}) => {
  const [resume, setResume] = useState<ResumeData>(initialResume);
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
  const [aiLoading, setAiLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [targetRole, setTargetRole] = useState('Junior Full Stack Developer');

  const handlePersonalInfoChange = (field: string, val: string) => {
    setResume((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: val },
    }));
  };

  const handleAddEducation = () => {
    setResume((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        {
          id: `edu_${Date.now()}`,
          institution: '',
          degree: '',
          fieldOfStudy: '',
          startYear: '2022',
          endYear: '2026',
          grade: '',
        },
      ],
    }));
  };

  const handleRemoveEducation = (id: string) => {
    setResume((prev) => ({
      ...prev,
      education: prev.education.filter((e) => e.id !== id),
    }));
  };

  const handleAddProject = () => {
    setResume((prev) => ({
      ...prev,
      projects: [
        ...prev.projects,
        {
          id: `proj_${Date.now()}`,
          title: '',
          technologies: '',
          link: '',
          bullets: ['Developed key features using modern frameworks.'],
        },
      ],
    }));
  };

  const handleRemoveProject = (id: string) => {
    setResume((prev) => ({
      ...prev,
      projects: prev.projects.filter((p) => p.id !== id),
    }));
  };

  const handleAddExperience = () => {
    setResume((prev) => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          id: `exp_${Date.now()}`,
          company: '',
          role: '',
          location: '',
          startDate: '',
          endDate: '',
          isCurrent: false,
          bullets: ['Assisted in day-to-day operations and team deliveries.'],
        },
      ],
    }));
  };

  const handleRemoveExperience = (id: string) => {
    setResume((prev) => ({
      ...prev,
      experience: prev.experience.filter((e) => e.id !== id),
    }));
  };

  // AI Polish Summary
  const handleAIPolishSummary = async () => {
    if (!resume.summary.trim()) return;
    setAiLoading(true);
    try {
      const res = await api.aiImproveResume({
        type: 'summary',
        content: resume.summary,
        targetRole,
      });
      if (res.improved) {
        setResume((prev) => ({ ...prev, summary: res.improved }));
      }
    } catch (err) {
      console.error('AI summary improve error:', err);
    } finally {
      setAiLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      await api.updateResume(resume.id, resume);
      onSaveResume(resume);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error('Save resume error:', err);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-slate-50/60 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-teal-50 text-teal-800 border border-teal-200 mb-2">
              <FileText className="w-3.5 h-3.5" />
              <span>Recruiter-Approved ATS Resume Studio</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Interactive Resume Builder
            </h1>
            <p className="mt-2 text-slate-600 text-sm sm:text-base max-w-2xl">
              Create clean, ATS-compliant resumes formatted for Indian campus placements and lateral hiring. Polish bullet points with Gemini AI.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start sm:self-auto">
            <button
              onClick={handleSave}
              className="bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs px-4 py-2.5 rounded-lg transition flex items-center gap-2 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>{saveSuccess ? 'Saved to Server!' : 'Save Draft'}</span>
            </button>
            <button
              onClick={handlePrint}
              className="bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs px-4 py-2.5 rounded-lg transition flex items-center gap-2 cursor-pointer shadow-sm"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Export PDF</span>
            </button>
          </div>
        </div>

        {/* Template Selector & Toggle */}
        <div className="bg-white p-3 rounded-xl border border-slate-200/80 shadow-2xs mb-6 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-700 mr-1">ATS Template:</span>
            {(['modern', 'minimal', 'professional', 'technical'] as const).map((tmpl) => (
              <button
                key={tmpl}
                onClick={() => setResume({ ...resume, template: tmpl })}
                className={`text-xs capitalize font-semibold px-3 py-1.5 rounded-lg transition cursor-pointer ${
                  resume.template === tmpl
                    ? 'bg-teal-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {tmpl}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setActiveTab('edit')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg ${
                activeTab === 'edit' ? 'bg-slate-900 text-white' : 'text-slate-600 bg-slate-100'
              }`}
            >
              Edit Sections
            </button>
            <button
              onClick={() => setActiveTab('preview')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg ${
                activeTab === 'preview' ? 'bg-slate-900 text-white' : 'text-slate-600 bg-slate-100'
              }`}
            >
              Live Preview
            </button>
          </div>
        </div>

        {/* 2-Column Grid: Left Editor, Right Live Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Editor */}
          <div className={`lg:col-span-6 space-y-6 ${activeTab === 'preview' ? 'hidden lg:block' : 'block'}`}>
            {/* Personal Info */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-3">
              <h3 className="font-bold text-sm text-slate-900 border-b border-slate-100 pb-2">
                1. Personal Contact Details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-slate-600">Full Name</label>
                  <input
                    type="text"
                    value={resume.personalInfo.fullName}
                    onChange={(e) => handlePersonalInfoChange('fullName', e.target.value)}
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded p-2 mt-1"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-600">Email Address</label>
                  <input
                    type="email"
                    value={resume.personalInfo.email}
                    onChange={(e) => handlePersonalInfoChange('email', e.target.value)}
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded p-2 mt-1"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-600">Phone</label>
                  <input
                    type="text"
                    value={resume.personalInfo.phone}
                    onChange={(e) => handlePersonalInfoChange('phone', e.target.value)}
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded p-2 mt-1"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-600">Location (City, State)</label>
                  <input
                    type="text"
                    value={resume.personalInfo.location}
                    onChange={(e) => handlePersonalInfoChange('location', e.target.value)}
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded p-2 mt-1"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-600">LinkedIn Profile URL</label>
                  <input
                    type="text"
                    value={resume.personalInfo.linkedinUrl || ''}
                    onChange={(e) => handlePersonalInfoChange('linkedinUrl', e.target.value)}
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded p-2 mt-1"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-600">GitHub / Portfolio URL</label>
                  <input
                    type="text"
                    value={resume.personalInfo.githubUrl || ''}
                    onChange={(e) => handlePersonalInfoChange('githubUrl', e.target.value)}
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded p-2 mt-1"
                  />
                </div>
              </div>
            </div>

            {/* Professional Summary */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <h3 className="font-bold text-sm text-slate-900">2. Professional Summary</h3>
                <button
                  type="button"
                  onClick={handleAIPolishSummary}
                  disabled={aiLoading}
                  className="inline-flex items-center gap-1.5 text-xs text-teal-700 bg-teal-50 hover:bg-teal-100 px-2.5 py-1 rounded-md font-semibold transition cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{aiLoading ? 'Polishing...' : 'Gemini AI Polish'}</span>
                </button>
              </div>
              <textarea
                rows={3}
                value={resume.summary}
                onChange={(e) => setResume({ ...resume, summary: e.target.value })}
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded p-2.5 leading-relaxed"
                placeholder="2-3 sentences highlighting education, key strengths, and career orientation..."
              />
            </div>

            {/* Education */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <h3 className="font-bold text-sm text-slate-900">3. Education & Degrees</h3>
                <button
                  type="button"
                  onClick={handleAddEducation}
                  className="text-xs text-teal-700 font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Education</span>
                </button>
              </div>

              {resume.education.map((edu, idx) => (
                <div key={edu.id} className="p-3 bg-slate-50 rounded-lg border border-slate-200/80 space-y-2 relative">
                  <button
                    onClick={() => handleRemoveEducation(edu.id)}
                    className="absolute top-2 right-2 text-slate-400 hover:text-red-500"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] text-slate-500">Degree</label>
                      <input
                        type="text"
                        value={edu.degree}
                        onChange={(e) => {
                          const updated = [...resume.education];
                          updated[idx].degree = e.target.value;
                          setResume({ ...resume, education: updated });
                        }}
                        className="w-full text-xs bg-white border border-slate-200 rounded p-1.5"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-500">Institution / University</label>
                      <input
                        type="text"
                        value={edu.institution}
                        onChange={(e) => {
                          const updated = [...resume.education];
                          updated[idx].institution = e.target.value;
                          setResume({ ...resume, education: updated });
                        }}
                        className="w-full text-xs bg-white border border-slate-200 rounded p-1.5"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-500">Years (e.g. 2022 - 2026)</label>
                      <input
                        type="text"
                        value={`${edu.startYear} - ${edu.endYear}`}
                        onChange={(e) => {
                          const parts = e.target.value.split('-');
                          const updated = [...resume.education];
                          updated[idx].startYear = parts[0]?.trim() || '';
                          updated[idx].endYear = parts[1]?.trim() || '';
                          setResume({ ...resume, education: updated });
                        }}
                        className="w-full text-xs bg-white border border-slate-200 rounded p-1.5"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-500">Grade / CGPA</label>
                      <input
                        type="text"
                        value={edu.grade || ''}
                        onChange={(e) => {
                          const updated = [...resume.education];
                          updated[idx].grade = e.target.value;
                          setResume({ ...resume, education: updated });
                        }}
                        className="w-full text-xs bg-white border border-slate-200 rounded p-1.5"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Experience */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <h3 className="font-bold text-sm text-slate-900">4. Work & Internships</h3>
                <button
                  type="button"
                  onClick={handleAddExperience}
                  className="text-xs text-teal-700 font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Experience</span>
                </button>
              </div>

              {resume.experience.map((exp, idx) => (
                <div key={exp.id} className="p-3 bg-slate-50 rounded-lg border border-slate-200/80 space-y-2 relative">
                  <button
                    onClick={() => handleRemoveExperience(exp.id)}
                    className="absolute top-2 right-2 text-slate-400 hover:text-red-500"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] text-slate-500">Company</label>
                      <input
                        type="text"
                        value={exp.company}
                        onChange={(e) => {
                          const updated = [...resume.experience];
                          updated[idx].company = e.target.value;
                          setResume({ ...resume, experience: updated });
                        }}
                        className="w-full text-xs bg-white border border-slate-200 rounded p-1.5"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-500">Role Title</label>
                      <input
                        type="text"
                        value={exp.role}
                        onChange={(e) => {
                          const updated = [...resume.experience];
                          updated[idx].role = e.target.value;
                          setResume({ ...resume, experience: updated });
                        }}
                        className="w-full text-xs bg-white border border-slate-200 rounded p-1.5"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-500">Accomplishments (1 bullet per line)</label>
                    <textarea
                      rows={2}
                      value={exp.bullets.join('\n')}
                      onChange={(e) => {
                        const updated = [...resume.experience];
                        updated[idx].bullets = e.target.value.split('\n');
                        setResume({ ...resume, experience: updated });
                      }}
                      className="w-full text-xs bg-white border border-slate-200 rounded p-1.5"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Projects */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <h3 className="font-bold text-sm text-slate-900">5. Academic & Side Projects</h3>
                <button
                  type="button"
                  onClick={handleAddProject}
                  className="text-xs text-teal-700 font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Project</span>
                </button>
              </div>

              {resume.projects.map((proj, idx) => (
                <div key={proj.id} className="p-3 bg-slate-50 rounded-lg border border-slate-200/80 space-y-2 relative">
                  <button
                    onClick={() => handleRemoveProject(proj.id)}
                    className="absolute top-2 right-2 text-slate-400 hover:text-red-500"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] text-slate-500">Project Title</label>
                      <input
                        type="text"
                        value={proj.title}
                        onChange={(e) => {
                          const updated = [...resume.projects];
                          updated[idx].title = e.target.value;
                          setResume({ ...resume, projects: updated });
                        }}
                        className="w-full text-xs bg-white border border-slate-200 rounded p-1.5"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-500">Tech Stack</label>
                      <input
                        type="text"
                        value={proj.technologies}
                        onChange={(e) => {
                          const updated = [...resume.projects];
                          updated[idx].technologies = e.target.value;
                          setResume({ ...resume, projects: updated });
                        }}
                        className="w-full text-xs bg-white border border-slate-200 rounded p-1.5"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-500">Bullet points (1 per line)</label>
                    <textarea
                      rows={2}
                      value={proj.bullets.join('\n')}
                      onChange={(e) => {
                        const updated = [...resume.projects];
                        updated[idx].bullets = e.target.value.split('\n');
                        setResume({ ...resume, projects: updated });
                      }}
                      className="w-full text-xs bg-white border border-slate-200 rounded p-1.5"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Skills */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-3">
              <h3 className="font-bold text-sm text-slate-900 border-b border-slate-100 pb-2">
                6. Skills (Comma separated)
              </h3>
              <div>
                <label className="text-[11px] font-semibold text-slate-600">Technical Skills</label>
                <input
                  type="text"
                  value={resume.skills.technical.join(', ')}
                  onChange={(e) =>
                    setResume({
                      ...resume,
                      skills: {
                        ...resume.skills,
                        technical: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                      },
                    })
                  }
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded p-2 mt-1"
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-slate-600">Tools & Platforms</label>
                <input
                  type="text"
                  value={resume.skills.tools.join(', ')}
                  onChange={(e) =>
                    setResume({
                      ...resume,
                      skills: {
                        ...resume.skills,
                        tools: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                      },
                    })
                  }
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded p-2 mt-1"
                />
              </div>
            </div>
          </div>

          {/* Right Live ATS A4 Preview (Printable) */}
          <div className={`lg:col-span-6 sticky top-22 ${activeTab === 'edit' ? 'hidden lg:block' : 'block'}`}>
            <div
              id="printable-resume"
              className="bg-white border border-slate-200 shadow-xl rounded-xl p-8 min-h-[750px] font-sans text-slate-900 printable-area text-xs leading-relaxed"
            >
              {/* Header */}
              <div className="border-b-2 border-teal-600 pb-4 mb-4">
                <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                  {resume.personalInfo.fullName || 'Candidate Name'}
                </h2>
                <div className="text-[11px] text-slate-600 mt-1 flex flex-wrap gap-2">
                  <span>{resume.personalInfo.location}</span>
                  <span>•</span>
                  <span>{resume.personalInfo.email}</span>
                  <span>•</span>
                  <span>{resume.personalInfo.phone}</span>
                  {resume.personalInfo.linkedinUrl && (
                    <>
                      <span>•</span>
                      <span>LinkedIn</span>
                    </>
                  )}
                  {resume.personalInfo.githubUrl && (
                    <>
                      <span>•</span>
                      <span>GitHub</span>
                    </>
                  )}
                </div>
              </div>

              {/* Summary */}
              {resume.summary && (
                <div className="mb-4">
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-teal-800 border-b border-slate-200 pb-0.5 mb-1.5">
                    Professional Summary
                  </h4>
                  <p className="text-slate-700">{resume.summary}</p>
                </div>
              )}

              {/* Education */}
              {resume.education.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-teal-800 border-b border-slate-200 pb-0.5 mb-1.5">
                    Education
                  </h4>
                  <div className="space-y-2">
                    {resume.education.map((edu) => (
                      <div key={edu.id}>
                        <div className="flex justify-between font-bold text-slate-900">
                          <span>{edu.degree} - {edu.fieldOfStudy || edu.institution}</span>
                          <span className="text-slate-500 font-medium">{edu.startYear} - {edu.endYear}</span>
                        </div>
                        <div className="text-slate-600 text-[11px] flex justify-between">
                          <span>{edu.institution}</span>
                          {edu.grade && <span className="font-semibold text-slate-800">Score: {edu.grade}</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Experience */}
              {resume.experience.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-teal-800 border-b border-slate-200 pb-0.5 mb-1.5">
                    Experience & Internships
                  </h4>
                  <div className="space-y-2.5">
                    {resume.experience.map((exp) => (
                      <div key={exp.id}>
                        <div className="flex justify-between font-bold text-slate-900">
                          <span>{exp.role} — {exp.company}</span>
                          <span className="text-slate-500 font-medium">{exp.startDate} {exp.endDate && `- ${exp.endDate}`}</span>
                        </div>
                        <ul className="list-disc list-inside mt-1 space-y-0.5 text-slate-700">
                          {exp.bullets.filter(Boolean).map((b, i) => (
                            <li key={i}>{b}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Projects */}
              {resume.projects.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-teal-800 border-b border-slate-200 pb-0.5 mb-1.5">
                    Projects
                  </h4>
                  <div className="space-y-2.5">
                    {resume.projects.map((proj) => (
                      <div key={proj.id}>
                        <div className="flex justify-between font-bold text-slate-900">
                          <span>{proj.title} <span className="text-slate-500 font-normal">| {proj.technologies}</span></span>
                        </div>
                        <ul className="list-disc list-inside mt-0.5 space-y-0.5 text-slate-700">
                          {proj.bullets.filter(Boolean).map((b, i) => (
                            <li key={i}>{b}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Skills */}
              {(resume.skills.technical.length > 0 || resume.skills.tools.length > 0) && (
                <div className="mb-4">
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-teal-800 border-b border-slate-200 pb-0.5 mb-1.5">
                    Technical Skills & Tools
                  </h4>
                  <div className="space-y-1">
                    {resume.skills.technical.length > 0 && (
                      <div>
                        <span className="font-bold text-slate-900">Languages & Frameworks: </span>
                        <span className="text-slate-700">{resume.skills.technical.join(', ')}</span>
                      </div>
                    )}
                    {resume.skills.tools.length > 0 && (
                      <div>
                        <span className="font-bold text-slate-900">Tools & Platforms: </span>
                        <span className="text-slate-700">{resume.skills.tools.join(', ')}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
