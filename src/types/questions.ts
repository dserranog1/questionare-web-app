export interface Question {
  id: string;
  title: string;
}

export interface Answer {
  description: string;
  correct: boolean;
}

export type AnswerList = Answer[];

export type QuestionList = Question[];
