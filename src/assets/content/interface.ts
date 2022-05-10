export interface Content {
  text: string[];
  img: string[];
  video: string[];
  quizz: boolean;
}

export interface Questions {
  question: string;
  answers: string[];
  correct: number;
}
