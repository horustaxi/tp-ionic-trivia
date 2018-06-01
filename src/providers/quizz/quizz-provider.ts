import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { QuizzResults } from "../../models/quizzResults";

/*
  Generated class for the QuizzProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class QuizzProvider {

  constructor(public http: HttpClient) {

  }

  public getQuizz(nbQuestions: number, difficulty: string):
    Promise<QuizzResults> {
    return new Promise((resolve, reject) => {
      let params = new HttpParams();
      params = params.append("amount", nbQuestions.toString());
      params = params.append("difficulty", difficulty);
      this.http.get("https://opentdb.com/api.php?", {
        params: params
      }).toPromise()
        .then((response) => {
          if (response['results']) {
            resolve(new QuizzResults(response['results']));
          } else {
            reject("Le serveur a renvoyé une réponse innatendue");
          }
        })
        .catch((error) => {
          reject(error);
        })
    });
  }
}
