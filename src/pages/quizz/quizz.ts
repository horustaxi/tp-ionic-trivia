import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {QuizzProvider} from "../../providers/quizz/quizz-provider";
import {Quizz} from "../../models/quizz";
import {LocalstorageProvider} from "../../providers/localstorage/localstorage";

/**
 * Generated class for the QuizzPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-quizz',
  templateUrl: 'quizz.html',
})
export class QuizzPage {
  public questions: Array<Quizz> = [];
  public timer: number = 5;
  public quizz: Quizz;
  public points: number = 0;
  public result: string;
  public gameIsOver: boolean = false;
  public questionIsOver: boolean = false;
  public interval;

  constructor(public navCtrl: NavController, public navParams: NavParams, public quizzProvider: QuizzProvider, public localstorageProvider: LocalstorageProvider) {
  }

  ionViewDidLoad() {
    let nbQuestions = this.navParams.get("nbQuestions");
    let difficulty = this.navParams.get("difficulty");
    this.quizzProvider.getQuizz(nbQuestions, difficulty)
      .then((result) => {
        this.questions = result.questions;
        this.changeQuestion();
      })
      .catch((error) => {
        this.result = "Impossible de récupérer la liste des questions, veuillez réésayer plus tard.";
        this.gameIsOver = true;
      });
  }

  public changeQuestion() {
    this.timer = 5;
    this.result = "";
    this.questionIsOver = false;
    if (this.questions.length > 0) {
      this.quizz = this.questions[0];
      this.mixAnswers();
      this.questions.shift();
      this.interval = setInterval(() => {
        if (this.timer > 0) {
          this.timer--;
        }
        else {
          this.result = "Temps dépassé !";
          this.questionIsOver = true;
          this.quizz.incorrect_answers = [];
          clearInterval(this.interval);
        }
      }, 1000);
    }
    else
      this.gameOver();
  }

  public mixAnswers() {
    this.quizz.incorrect_answers.push(this.quizz.correct_answer);
    this.quizz.incorrect_answers.sort();
  }

  public checkAnswer(answer) {
    clearInterval(this.interval);
    this.questionIsOver = true;
    if (answer === this.quizz.correct_answer) {
      this.points++;
      this.result = "Correct !";

    }
    else
      this.result = "C'est faux !";
  }

  public gameOver() {
    this.result = "Partie terminée ! Votre score : " + this.points + " bonnes réponses !";
    this.gameIsOver = true;
    this.setScore();
    delete this.quizz;
  }

  public setScore() {
    this.localstorageProvider.getCounter().then((result: number) => {
      this.localstorageProvider.setScore(result + 1, this.points);
      this.localstorageProvider.setCounter(result + 1);
    });

  }

  public goBackToMainMenu() {
    this.navCtrl.popToRoot();
  }
}
