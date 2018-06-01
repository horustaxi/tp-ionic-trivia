import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {QuizzPage} from "../quizz/quizz";
import {LocalstorageProvider} from "../../providers/localstorage/localstorage";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public nbQuestions: number;
  public difficulty: string;
  public error: string;
  public scores = [];

  constructor(public navCtrl: NavController, public localstorageProvider: LocalstorageProvider) {
    this.displayScores();
  }

  public checkValues() {

    if (this.nbQuestions <= 10 && this.nbQuestions >= 5) {
      if (this.difficulty === "easy" || this.difficulty === "medium" || this.difficulty === "hard") {
        this.error = "";
        this.startGame();
      }
      else
        this.error = "Paramètres invalides."
    }
    else
      this.error = "Paramètres invalides."
  }

  public startGame() {
    this.navCtrl.push(QuizzPage, {
      nbQuestions: this.nbQuestions,
      difficulty: this.difficulty
    });
  }

  public displayScores() {
    this.localstorageProvider.getCounter().then((result: number) => {
      this.scores = [];
      this.localstorageProvider.getScore(result)
        .then((result) => {
          if (result) {
            this.scores.push(result)
          }})
        .catch((error) =>
          console.log(error)
        );
      let i = 0;
      while (i < 10) {
        i++;
        this.localstorageProvider.getScore(result-i)
          .then((result) => {
              if (result) {
                this.scores.push(result)
              }})
          .catch((error) =>
            console.log(error)
          );
      }
    });

  }
}
