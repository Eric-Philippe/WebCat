import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

import { TreatsAvailable } from '../models/treatsAvailable.model';

import quizzJson from '../../assets/content/quizz.json';
import resultJson from '../../assets/content/result.json';

const QUESTIONS = quizzJson.QUESTIONS;

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.scss'],
})
export class QuizzComponent implements OnInit {
  constructor(private cookieService: CookieService) {}
  heads = [{ name: 'DashBoard', path: '/dashboard' }];

  cookie!: TreatsAvailable;

  index = 0;
  question = QUESTIONS[this.index];
  title = this.question.title;
  answers = this.question.answers;
  myCoeff = [0, 0, 0, 0];

  resultTitle!: string;
  resultContent!: string;
  resultUrl!: string;

  ngOnInit(): void {}

  start(): void {
    this.index = 0;
    this.question = QUESTIONS[this.index];
    this.title = this.question.title;
    this.answers = this.question.answers;
    this.myCoeff = [0, 0, 0, 0];
    document.getElementById('welcome-container')!.style.display = 'none';
    document.getElementById('quizz-container')!.style.display = 'block';
  }

  end(): void {
    let maxIndex = this.getIndexOfMaxValue();
    this.resultTitle = resultJson.RESULT[maxIndex].name;
    this.resultContent = resultJson.RESULT[maxIndex].content;
    this.resultUrl = resultJson.RESULT[maxIndex].url;
    document.getElementById('quizz-container')!.style.display = 'none';
    document.getElementById('result-container')!.style.display = 'block';

    this.cookie = new TreatsAvailable(this.cookieService);
    this.cookie.add(2);
    alert('Vous avez gagné deux friandises !');
  }

  restart(): void {
    this.index = 0;
    this.question = QUESTIONS[this.index];
    this.title = this.question.title;
    this.answers = this.question.answers;
    this.myCoeff = [0, 0, 0, 0];
    document.getElementById('result-container')!.style.display = 'none';
    document.getElementById('welcome-container')!.style.display = 'block';
    location.reload();
  }

  next(): void {
    let coeff = this.getCheckedBox();
    if (!coeff) return;
    let convertedString = this.stringToIntArray(coeff);
    for (let i = 0; i < convertedString.length; i++) {
      this.myCoeff[i] += convertedString[i];
    }

    if (!QUESTIONS[this.index + 1]) return this.end();
    this.index++;
    this.question = QUESTIONS[this.index];
    this.title = this.question.title;
    this.answers = this.question.answers;
  }

  getCheckedBox(): string | null {
    var inputs = document.getElementsByTagName('input');
    for (var i = 0; i < inputs.length; i++) {
      if (inputs[i].type == 'checkbox' && inputs[i].checked) {
        return inputs[i].value!;
      }
    }

    return null;
  }

  unclickCheckBox(event: Event): void {
    let target = event.target as HTMLInputElement;
    var inputs = document.getElementsByTagName('input');
    for (var i = 0; i < inputs.length; i++) {
      if (
        inputs[i].type == 'checkbox' &&
        inputs[i].getAttribute('id') != target.getAttribute('id')
      ) {
        inputs[i].checked = false;
      }
    }
  }

  stringToIntArray(str: string): number[] {
    let coeff = str.split(',');
    let coeffInt: number[] = [];
    for (let i = 0; i < coeff.length; i++) {
      coeffInt[i] = parseInt(coeff[i]);
    }
    return coeffInt;
  }

  getIndexOfMaxValue(): number {
    let max = this.myCoeff[0];
    let maxIndex = 0;
    for (let i = 1; i < this.myCoeff.length; i++) {
      if (this.myCoeff[i] > max) {
        max = this.myCoeff[i];
        maxIndex = i;
      }
    }
    return maxIndex;
  }
}
