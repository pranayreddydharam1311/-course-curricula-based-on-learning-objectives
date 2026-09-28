export type BloomsTaxonomy = 
  | 'Remember' 
  | 'Understand' 
  | 'Apply' 
  | 'Analyze' 
  | 'Evaluate' 
  | 'Create';

export type CourseLevel = 'Foundational' | 'Core' | 'Intermediate' | 'Advanced' | 'Capstone';

export type TeachingMethod = 
  | 'lecture' 
  | 'lab' 
  | 'discussion' 
  | 'case-study' 
  | 'hands-on-coding' 
  | 'workshop';

export type AssessmentType = 
  | 'Quiz' 
  | 'Assignment' 
  | 'Lab Exercise' 
  | 'Milestone Project' 
  | 'Discussion' 
  | 'Exam';

export interface LearningOutcome {
  outcome: string;
  bloomsLevel: BloomsTaxonomy;
}

export interface Subtopic {
  id: string;
  title: string;
  description: string;
  estimatedHours: number;
  keyConcepts: string[];
  teachingMethod: TeachingMethod;
}

export interface AssessmentItem {
  id: string;
  type: AssessmentType;
  title: string;
  description: string;
  weightPercentage?: number;
  samplePromptOrQuestions?: string[];
}

export interface RecommendedResource {
  title: string;
  type: 'Reading' | 'Tool' | 'Video' | 'Documentation' | 'Dataset' | 'Interactive';
  linkOrDesc?: string;
}

export interface Module {
  id: string;
  moduleNumber: number;
  title: string;
  level: CourseLevel;
  durationWeeksOrHours: string;
  overview: string;
  learningOutcomes: LearningOutcome[];
  subtopics: Subtopic[];
  assessments: AssessmentItem[];
  resources: RecommendedResource[];
  expandedLessonPlan?: {
    lessonTitle: string;
    targetDuration: string;
    instructorNotes: string[];
    studentActivities: string[];
    discussionQuestions: string[];
    recommendedReadings: string[];
  };
}

export interface FinalAssessment {
  capstoneProjectTitle: string;
  capstoneDescription: string;
  deliverables: string[];
  evaluationCriteria: string[];
  finalExamOutline?: string[];
}

export interface CourseCurriculum {
  id: string;
  title: string;
  tagline: string;
  originalObjectives: string;
  courseDescription: string;
  targetAudience: string;
  estimatedTotalHours: number;
  duration: string;
  difficultyLevel: 'Beginner' | 'Intermediate' | 'Advanced' | 'Comprehensive (Beginner to Advanced)';
  deliveryFormat: string;
  prerequisites: string[];
  keyTakeaways: string[];
  modules: Module[];
  finalAssessment: FinalAssessment;
  industryAlignment?: string;
  generatedAt: string;
}

export interface GenerateCurriculumRequest {
  learningObjectives: string;
  courseTitle?: string;
  targetAudience: string;
  duration: string;
  weeklyHours: number;
  deliveryFormat: string;
  prerequisites?: string;
  industryAlignment?: string;
  focusTone?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  bloomsLevel: BloomsTaxonomy;
}

export interface ModuleQuiz {
  moduleTitle: string;
  questions: QuizQuestion[];
}

export interface RubricRow {
  criterion: string;
  weight: string;
  exemplary: string;
  proficient: string;
  developing: string;
}

export interface AssignmentBrief {
  title: string;
  summary: string;
  detailedInstructions: string[];
  submissionDeliverables: string[];
  rubric: RubricRow[];
}
