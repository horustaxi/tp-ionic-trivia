import { Quizz } from "./quizz";

export class QuizzResults {
  public questions: Array<Quizz>;

  constructor(questions: Array<Quizz>) {
    this.questions = questions;
  }
}
