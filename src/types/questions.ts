export interface Question {
  id: string;
  title: string;
}

export interface Answer {
  id: string;
  description: string;
  correct: boolean;
}

export type AnswerList = Answer[];

export type QuestionList = Question[];

export interface ExpandedQuestion extends Question {
  expand: { "answers(question)": AnswerList }; // TODO open issue regarding this way of typing expand
}
