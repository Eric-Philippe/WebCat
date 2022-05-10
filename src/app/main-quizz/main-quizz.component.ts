import { Component, OnInit, Input } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

import { TreatsAvailable } from '../models/treatsAvailable.model';
import { Questions } from 'src/assets/content/interface';

@Component({
  selector: 'app-main-quizz',
  templateUrl: './main-quizz.component.html',
  styleUrls: ['./main-quizz.component.scss'],
})
export class MainQuizzComponent implements OnInit {
  @Input() quizz!: Questions;

  constructor(private cookieService: CookieService) {}

  heads = [{ name: 'DashBoard', path: '/dashboard' }];

  catName!: string;
  stepID!: string;

  cookie!: TreatsAvailable;

  ngOnInit(): void {}

  unclickCheckBox(event: Event): void {
    let target = event.target as HTMLInputElement;
    var inputs = document.getElementsByTagName('input');
    for (var i = 0; i < inputs.length; i++) {
      if (inputs[i].type == 'checkbox' && inputs[i] != target) {
        inputs[i].checked = false;
      }
    }
  }

  onValidate(): void {
    let answer = this.getCheckedBox();
    let txt;
    if (parseInt(answer!) > 0) {
      txt = 'Félicitation vous avez gagné 2 friandises !';
      this.cookie = new TreatsAvailable(this.cookieService);
      this.cookie.add(2);
    } else {
      txt = 'Mauvaise réponse !';
    }
    alert(txt);
    window.location.href = '/dashboard';
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
}
