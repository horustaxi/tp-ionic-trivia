import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';
import {QuizzResults} from "../../models/quizzResults";
import {HttpParams} from "@angular/common/http";

/*
  Generated class for the LocalstorageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LocalstorageProvider {

  private storage: Storage;

  constructor(storage: Storage) {
    this.storage = storage;
  }

  public setScore(index, score) {
    return new Promise((resolve, reject) => {
      this.storage.set("score"+index, score)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        })
    });
  };

  public setCounter(nb) {
    this.storage.set("counter", nb)
  };

  public getCounter() {
    return new Promise((resolve, reject) => {
      this.storage.get("counter")
        .then((response) => {
          resolve(parseInt(response));
        })
        .catch((error) => {
          reject(error);
        })
    });
  }

  public getScore(index) {
    return new Promise((resolve, reject) => {
      this.storage.get("score"+index)
        .then((response) => {

          resolve(response);
        })
        .catch((error) => {
          reject(error);
        })
    });
  }

  removeScore(index) {
    return new Promise((resolve, reject) => {
      this.storage.remove("score"+index)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        })
    });
  }

  clearKeys() {
    return new Promise((resolve, reject) => {
      this.storage.clear()
        .then(() => {
          resolve(true);
        })
        .catch((error) => {
          reject(error);
        })
    });
  }

}
