import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QuizzPage } from './quizz';

@NgModule({
  declarations: [
    QuizzPage,
  ],
  imports: [
    IonicPageModule.forChild(QuizzPage),
  ],
})
export class QuizzPageModule {}
