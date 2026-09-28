import { 
  CourseCurriculum, 
  GenerateCurriculumRequest, 
  Module, 
  ModuleQuiz, 
  AssignmentBrief 
} from '../types/curriculum.ts';

export async function checkServerHealth(): Promise<boolean> {
  try {
    const res = await fetch('/api/health');
    if (!res.ok) return false;
    const data = await res.json();
    return !!data?.hasGeminiKey;
  } catch {
    return false;
  }
}

export async function generateCurriculumAPI(
  request: GenerateCurriculumRequest
): Promise<CourseCurriculum> {
  let response: Response;
  try {
    response = await fetch('/api/generate-curriculum', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
    });
  } catch (err: any) {
    console.error('Fetch network error:', err);
    throw new Error('Connection failed while generating curriculum. Please ensure the dev server is active and try again.');
  }

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData.error || `Server error (${response.status}): Failed to generate curriculum`);
  }

  const data = await response.json().catch(() => ({}));
  if (!data?.curriculum) {
    throw new Error('Invalid response received from curriculum generator');
  }

  return data.curriculum;
}

export async function expandModuleAPI(
  module: Module, 
  courseTitle: string
): Promise<NonNullable<Module['expandedLessonPlan']>> {
  let response: Response;
  try {
    response = await fetch('/api/expand-module', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ module, courseTitle }),
    });
  } catch (err: any) {
    throw new Error('Connection lost while contacting AI for lesson plan.');
  }

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData.error || 'Failed to expand module lesson plan');
  }

  const data = await response.json().catch(() => ({}));
  if (!data?.lessonPlan) {
    throw new Error('No lesson plan data received.');
  }
  return data.lessonPlan;
}

export async function generateQuizAPI(
  module: Module, 
  courseTitle: string
): Promise<ModuleQuiz> {
  let response: Response;
  try {
    response = await fetch('/api/generate-quiz', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ module, courseTitle }),
    });
  } catch (err: any) {
    throw new Error('Connection lost while generating quiz.');
  }

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData.error || 'Failed to generate module quiz');
  }

  const data = await response.json().catch(() => ({}));
  if (!data?.quiz) {
    throw new Error('No quiz data received.');
  }
  return data.quiz;
}

export async function generateAssignmentAPI(
  module: Module, 
  courseTitle: string
): Promise<AssignmentBrief> {
  let response: Response;
  try {
    response = await fetch('/api/generate-assignment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ module, courseTitle }),
    });
  } catch (err: any) {
    throw new Error('Connection lost while generating assignment rubric.');
  }

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData.error || 'Failed to generate assignment rubric');
  }

  const data = await response.json().catch(() => ({}));
  if (!data?.assignment) {
    throw new Error('No assignment data received.');
  }
  return data.assignment;
}
