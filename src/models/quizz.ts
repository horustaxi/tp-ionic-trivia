export class Quizz {
  public category: string;
  public type: string;
  public question: string;
  public correct_answer: string;
  public incorrect_answers: Array<string>;

  public constructor(
    category: string,
    type: string,
    question: string,
    correct_answer: string,
    incorrect_answers: Array<string>
  ) {
    this.category = category;
    this.type = type;
    this.question = question;
    this.correct_answer = correct_answer;
    this.incorrect_answers = incorrect_answers;
  }
}
