import { GoogleGenAI } from '@google/genai';
import { 
  CourseCurriculum, 
  GenerateCurriculumRequest, 
  Module, 
  ModuleQuiz, 
  AssignmentBrief 
} from '../types/curriculum.ts';

const CANDIDATE_MODELS = [
  'gemini-3.8-flash',
  'gemini-3.7-flash',
  'gemini-3.6-flash',
  'gemini-3.5-flash',
];

function getAiClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY environment variable is not set. Please configure it in AI Studio Secrets.');
  }
  return new GoogleGenAI({});
}

function cleanAndParseJson(rawText: string): any {
  let clean = rawText.trim();
  // Strip markdown code fences if present
  if (clean.startsWith('```')) {
    clean = clean.replace(/^```(?:json)?\s*/i, '').replace(/```\s*$/, '').trim();
  }
  try {
    return JSON.parse(clean);
  } catch {
    // Attempt extracting between first { and last }
    const firstBrace = clean.indexOf('{');
    const lastBrace = clean.lastIndexOf('}');
    if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
      const extracted = clean.substring(firstBrace, lastBrace + 1);
      return JSON.parse(extracted);
    }
    throw new Error('Could not parse valid JSON from AI response.');
  }
}

async function callGeminiWithFallback(prompt: string, temperature = 0.3): Promise<any> {
  const ai = getAiClient();
  let lastError: any = null;

  for (const model of CANDIDATE_MODELS) {
    try {
      const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          temperature,
        },
      });

      const text = response.text?.trim();
      if (!text) {
        throw new Error(`Empty response from ${model}`);
      }

      return cleanAndParseJson(text);
    } catch (err: any) {
      lastError = err;
      console.warn(`[Gemini API] Model ${model} encountered issue, switching to next candidate:`, err?.status || err?.message || err);
      // Brief pause before trying next model in cascade
      await new Promise(r => setTimeout(r, 600));
    }
  }

  throw lastError || new Error('All AI models are currently busy. Please retry shortly.');
}

export async function generateCurriculumFromAI(
  req: GenerateCurriculumRequest
): Promise<CourseCurriculum> {
  const prompt = `
You are an instructional designer and academic curriculum architect.
Synthesize the user's learning objectives into a structured, production-grade course curriculum.

Course Requirements:
- Learning Objectives: "${req.learningObjectives}"
- Proposed Course Title: "${req.courseTitle || 'Determine best title based on objectives'}"
- Target Audience: "${req.targetAudience || 'Beginner to Intermediate'}"
- Course Duration: "${req.duration || '8-weeks'}"
- Weekly Commitment: "${req.weeklyHours || 5} hours per week"
- Delivery Format: "${req.deliveryFormat || 'Blended (Interactive & Self-Paced)'}"
- Prerequisites: "${req.prerequisites || 'None specified'}"
- Industry / Educational Alignment: "${req.industryAlignment || 'Standard Academic & Practical Industry Application'}"

Curriculum Architecture:
1. Progression: Structure 6 to 8 cohesive modules from Foundational -> Core -> Intermediate -> Advanced -> Capstone.
2. Units & Subtopics: Each module must have 3 to 4 subtopics with realistic estimated hours, key concepts, and teaching methods (lecture, lab, hands-on-coding, case-study, or workshop).
3. Measurable Outcomes: 3 to 4 learning outcomes per module using Bloom's Taxonomy verbs (Remember, Understand, Apply, Analyze, Evaluate, Create).
4. Assessments: Real-world assessments for each module (Quiz, Assignment, Lab Exercise, Milestone Project).
5. Capstone Project: End-of-course real-world capstone project with deliverables and evaluation rubric.

Return ONLY a valid JSON object matching this structure:
{
  "title": "Course Title",
  "tagline": "Engaging punchy subtitle",
  "courseDescription": "2-paragraph comprehensive course summary",
  "targetAudience": "Target audience description",
  "estimatedTotalHours": 40,
  "duration": "8-weeks",
  "difficultyLevel": "Beginner" | "Intermediate" | "Advanced" | "Comprehensive (Beginner to Advanced)",
  "deliveryFormat": "Blended (Interactive & Self-Paced)",
  "prerequisites": ["Prereq 1", "Prereq 2"],
  "keyTakeaways": ["Takeaway 1", "Takeaway 2", "Takeaway 3", "Takeaway 4"],
  "industryAlignment": "Alignment description",
  "modules": [
    {
      "moduleNumber": 1,
      "title": "Module Title",
      "level": "Foundational" | "Core" | "Intermediate" | "Advanced" | "Capstone",
      "durationWeeksOrHours": "Week 1 (5 hours)",
      "overview": "Module overview description",
      "learningOutcomes": [
        {
          "outcome": "Outcome starting with action verb",
          "bloomsLevel": "Understand"
        }
      ],
      "subtopics": [
        {
          "title": "Subtopic Title",
          "description": "Brief description",
          "estimatedHours": 2,
          "keyConcepts": ["Concept A", "Concept B"],
          "teachingMethod": "hands-on-coding"
        }
      ],
      "assessments": [
        {
          "type": "Quiz",
          "title": "Assessment Title",
          "description": "Assessment description",
          "weightPercentage": 10,
          "samplePromptOrQuestions": ["Sample prompt 1", "Sample prompt 2"]
        }
      ],
      "resources": [
        {
          "title": "Resource title",
          "type": "Documentation",
          "linkOrDesc": "Official documentation and guide"
        }
      ]
    }
  ],
  "finalAssessment": {
    "capstoneProjectTitle": "Capstone Project Title",
    "capstoneDescription": "Detailed scenario of capstone project",
    "deliverables": ["Deliverable 1", "Deliverable 2"],
    "evaluationCriteria": ["Criteria 1", "Criteria 2", "Criteria 3"],
    "finalExamOutline": ["Comprehensive Exam Focus Area 1", "Focus Area 2"]
  }
}
`;

  try {
    const parsed = await callGeminiWithFallback(prompt, 0.4);

    const curriculum: CourseCurriculum = {
      id: 'curr_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
      title: parsed.title || req.courseTitle || 'Generated Course Curriculum',
      tagline: parsed.tagline || 'Structured Learning Journey',
      originalObjectives: req.learningObjectives,
      courseDescription: parsed.courseDescription || 'Comprehensive curriculum designed around specified learning objectives.',
      targetAudience: parsed.targetAudience || req.targetAudience || 'Learners aiming to master this subject',
      estimatedTotalHours: parsed.estimatedTotalHours || (parsed.modules?.length ? parsed.modules.length * (req.weeklyHours || 5) : 40),
      duration: parsed.duration || req.duration || '8-weeks',
      difficultyLevel: parsed.difficultyLevel || 'Comprehensive (Beginner to Advanced)',
      deliveryFormat: parsed.deliveryFormat || req.deliveryFormat || 'Blended',
      prerequisites: Array.isArray(parsed.prerequisites) ? parsed.prerequisites : ['No prior experience strictly required'],
      keyTakeaways: Array.isArray(parsed.keyTakeaways) ? parsed.keyTakeaways : [
        'Understand foundational principles and architecture',
        'Apply industry-standard tools and techniques to solve real problems',
        'Build and deploy end-to-end practical solutions',
        'Analyze tradeoffs and evaluate best practices'
      ],
      industryAlignment: parsed.industryAlignment || req.industryAlignment || 'Practical Industry Application',
      generatedAt: new Date().toISOString(),
      modules: (parsed.modules || []).map((m: any, mIdx: number) => ({
        id: 'mod_' + (mIdx + 1) + '_' + Math.random().toString(36).substring(2, 6),
        moduleNumber: m.moduleNumber || mIdx + 1,
        title: m.title || `Module ${mIdx + 1}`,
        level: m.level || (mIdx === 0 ? 'Foundational' : mIdx === (parsed.modules?.length || 1) - 1 ? 'Capstone' : 'Core'),
        durationWeeksOrHours: m.durationWeeksOrHours || `Week ${mIdx + 1}`,
        overview: m.overview || '',
        learningOutcomes: Array.isArray(m.learningOutcomes) ? m.learningOutcomes : [],
        subtopics: (m.subtopics || []).map((st: any, sIdx: number) => ({
          id: 'sub_' + (mIdx + 1) + '_' + (sIdx + 1),
          title: st.title || `Topic ${sIdx + 1}`,
          description: st.description || '',
          estimatedHours: typeof st.estimatedHours === 'number' ? st.estimatedHours : 2,
          keyConcepts: Array.isArray(st.keyConcepts) ? st.keyConcepts : [],
          teachingMethod: st.teachingMethod || 'lecture',
        })),
        assessments: (m.assessments || []).map((as: any, aIdx: number) => ({
          id: 'as_' + (mIdx + 1) + '_' + (aIdx + 1),
          type: as.type || 'Quiz',
          title: as.title || 'Module Assessment',
          description: as.description || '',
          weightPercentage: as.weightPercentage || 10,
          samplePromptOrQuestions: Array.isArray(as.samplePromptOrQuestions) ? as.samplePromptOrQuestions : [],
        })),
        resources: (m.resources || []).map((r: any) => ({
          title: r.title || 'Recommended Reference',
          type: r.type || 'Documentation',
          linkOrDesc: r.linkOrDesc || '',
        })),
      })),
      finalAssessment: {
        capstoneProjectTitle: parsed.finalAssessment?.capstoneProjectTitle || 'Comprehensive Capstone Project',
        capstoneDescription: parsed.finalAssessment?.capstoneDescription || 'Synthesize all course skills into an end-to-end portfolio project.',
        deliverables: Array.isArray(parsed.finalAssessment?.deliverables) ? parsed.finalAssessment.deliverables : ['Project Source Code', 'Architecture Documentation', 'Demonstration Video or Presentation'],
        evaluationCriteria: Array.isArray(parsed.finalAssessment?.evaluationCriteria) ? parsed.finalAssessment.evaluationCriteria : ['Technical execution', 'Adherence to best practices', 'Problem-solving efficacy'],
        finalExamOutline: Array.isArray(parsed.finalAssessment?.finalExamOutline) ? parsed.finalAssessment.finalExamOutline : undefined,
      },
    };

    return curriculum;
  } catch (err: any) {
    console.error('Failed to generate curriculum from AI:', err);
    throw new Error(err.message || 'Error communicating with AI service');
  }
}

export async function expandModuleLessonPlan(
  module: Module, 
  courseTitle: string
): Promise<NonNullable<Module['expandedLessonPlan']>> {
  const prompt = `
Create an in-depth lesson plan for this module from the course "${courseTitle}":
Module Title: "${module.title}"
Level: "${module.level}"
Overview: "${module.overview}"
Subtopics: ${module.subtopics.map(s => s.title).join(', ')}
Learning Outcomes: ${module.learningOutcomes.map(o => o.outcome).join('; ')}

Return ONLY valid JSON matching this schema:
{
  "lessonTitle": "Engaging descriptive lesson title",
  "targetDuration": "${module.durationWeeksOrHours}",
  "instructorNotes": [
    "Pedagogical strategy 1",
    "Pedagogical strategy 2",
    "Pedagogical strategy 3",
    "Common student misconception and how to address it"
  ],
  "studentActivities": [
    "Interactive warm-up or concept check",
    "Hands-on guided walkthrough",
    "Collaborative problem-solving exercise",
    "Independent challenge lab"
  ],
  "discussionQuestions": [
    "Conceptual debate prompt 1",
    "Real-world application question 2",
    "Edge-case evaluation question 3"
  ],
  "recommendedReadings": [
    "Reading recommendation 1",
    "Reading recommendation 2",
    "Documentation or standard reference"
  ]
}
`;

  const parsed = await callGeminiWithFallback(prompt, 0.3);
  return {
    lessonTitle: parsed.lessonTitle || `${module.title} Detailed Lesson Plan`,
    targetDuration: parsed.targetDuration || module.durationWeeksOrHours,
    instructorNotes: Array.isArray(parsed.instructorNotes) ? parsed.instructorNotes : ['Guide learners through core practical exercises'],
    studentActivities: Array.isArray(parsed.studentActivities) ? parsed.studentActivities : ['Hands-on implementation task'],
    discussionQuestions: Array.isArray(parsed.discussionQuestions) ? parsed.discussionQuestions : ['How does this topic apply to real-world scenarios?'],
    recommendedReadings: Array.isArray(parsed.recommendedReadings) ? parsed.recommendedReadings : ['Course documentation and primary guides'],
  };
}

export async function generateModuleQuizAI(
  module: Module, 
  courseTitle: string
): Promise<ModuleQuiz> {
  const prompt = `
Generate a 5-question multiple-choice diagnostic quiz for this module in "${courseTitle}":
Module: "${module.title}"
Topics: ${module.subtopics.map(s => s.title).join(', ')}
Outcomes: ${module.learningOutcomes.map(o => o.outcome).join('; ')}

Return ONLY valid JSON matching this schema:
{
  "moduleTitle": "${module.title}",
  "questions": [
    {
      "id": "q1",
      "question": "Clear, practical scenario or question",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctAnswerIndex": 0,
      "explanation": "Why this option is correct and others are incorrect",
      "bloomsLevel": "Apply"
    }
  ]
}
`;

  const parsed = await callGeminiWithFallback(prompt, 0.3);
  return {
    moduleTitle: parsed.moduleTitle || module.title,
    questions: (parsed.questions || []).map((q: any, i: number) => ({
      id: q.id || `q${i + 1}`,
      question: q.question || `Question ${i + 1}`,
      options: Array.isArray(q.options) && q.options.length === 4 ? q.options : ['Option A', 'Option B', 'Option C', 'Option D'],
      correctAnswerIndex: typeof q.correctAnswerIndex === 'number' && q.correctAnswerIndex >= 0 && q.correctAnswerIndex <= 3 ? q.correctAnswerIndex : 0,
      explanation: q.explanation || 'Refer to module core concepts for details.',
      bloomsLevel: q.bloomsLevel || 'Apply',
    })),
  };
}

export async function generateAssignmentRubricAI(
  module: Module, 
  courseTitle: string
): Promise<AssignmentBrief> {
  const prompt = `
Create a comprehensive assignment brief with an evaluation grading rubric for this module in "${courseTitle}":
Module: "${module.title}"
Topics: ${module.subtopics.map(s => s.title).join(', ')}
Outcomes: ${module.learningOutcomes.map(o => o.outcome).join('; ')}

Return ONLY valid JSON matching this schema:
{
  "title": "Practical Assignment Title",
  "summary": "Authentic real-world scenario setting the context and objective for this task",
  "detailedInstructions": [
    "Step 1: Setup and initial requirements",
    "Step 2: Core implementation",
    "Step 3: Verification and testing",
    "Step 4: Packaging and documentation"
  ],
  "submissionDeliverables": [
    "Source code or completed artifact",
    "Written explanation of design decisions",
    "Verification tests"
  ],
  "rubric": [
    {
      "criterion": "Technical Accuracy & Implementation",
      "weight": "40%",
      "exemplary": "Flawless execution adhering strictly to standards",
      "proficient": "Functional with minor stylistic flaws",
      "developing": "Partially functional with major gaps"
    },
    {
      "criterion": "Problem Solving & Architecture",
      "weight": "35%",
      "exemplary": "Elegant, modular, well-reasoned architecture",
      "proficient": "Adequate structure with acceptable logic",
      "developing": "Disorganized structure"
    },
    {
      "criterion": "Documentation & Testing",
      "weight": "25%",
      "exemplary": "Comprehensive test coverage and clear docs",
      "proficient": "Basic documentation and some testing",
      "developing": "Little to no documentation"
    }
  ]
}
`;

  const parsed = await callGeminiWithFallback(prompt, 0.3);
  return {
    title: parsed.title || `${module.title} Practical Assignment`,
    summary: parsed.summary || `Apply what you learned in ${module.title} to solve a practical industry challenge.`,
    detailedInstructions: Array.isArray(parsed.detailedInstructions) ? parsed.detailedInstructions : ['Complete the core exercises and verify your results.'],
    submissionDeliverables: Array.isArray(parsed.submissionDeliverables) ? parsed.submissionDeliverables : ['Completed assignment submission', 'Design notes'],
    rubric: Array.isArray(parsed.rubric) ? parsed.rubric.map((r: any) => ({
      criterion: r.criterion || 'Technical Implementation',
      weight: r.weight || '50%',
      exemplary: r.exemplary || 'Exemplary execution meeting all requirements',
      proficient: r.proficient || 'Satisfactory implementation with minor flaws',
      developing: r.developing || r.needsImprovement || 'Significant issues or incomplete requirements',
    })) : [
      {
        criterion: 'Technical Execution',
        weight: '50%',
        exemplary: 'Exemplary execution meeting all requirements',
        proficient: 'Satisfactory implementation with minor flaws',
        developing: 'Significant issues or incomplete requirements'
      },
      {
        criterion: 'Structure & Documentation',
        weight: '50%',
        exemplary: 'Clear, well-structured, and documented',
        proficient: 'Adequately documented',
        developing: 'Sparse or confusing documentation'
      }
    ]
  };
}
