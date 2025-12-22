
export interface Section {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  title: string;
  steps: Step[];
}

export type Step = ConceptStep | ExerciseStepType | PracticeStep | ContextStep;

interface BaseStep {
  id: string;
  title: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  aiKey?: string;
}

export interface ConceptStep extends BaseStep {
  type: 'concept';
  content: string;
  codeExample?: string;
  visual?: string;
}

export interface ContextStep extends BaseStep {
  type: 'context';
  content: string;
}

export interface ExerciseStepType extends BaseStep {
  type: 'exercise';
  question: string;
  codeTemplate: string;
  correctAnswer: string;
  hint?: string;
}

export interface PracticeStep extends BaseStep {
  type: 'practice';
  problem: string;
  initialCode: string;
}
