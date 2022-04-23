import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

import { Card } from '../models/card.model';
import { TreatsAvailable } from '../models/treatsAvailable.model';

import { Mimi, Newt, Neelix } from '../../assets/Cats';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private cookieService: CookieService) {}
  mimi!: Card;
  newt!: Card;
  neelix!: Card;

  treatsAvailable!: TreatsAvailable;

  available!: string;
  elements!: HTMLCollectionOf<HTMLElement>;
  element!: HTMLElement | null;

  easterEggFound!: Boolean;

  ngOnInit(): void {
    this.available = '6';
    this.treatsAvailable = new TreatsAvailable(this.cookieService);
    this.treatsAvailable.init(parseInt(this.available));

    this.cookieService.set('treatsMimi', '0');
    this.cookieService.set('treatsNewt', '0');
    this.cookieService.set('treatsNeelix', '0');

    this.easterEggFound = false;

    this.mimi = new Card(
      Mimi.name,
      Mimi.desc,
      Mimi.imgURL,
      parseInt(this.cookieService.get('treatsMimi')),
      []
    );

    this.newt = new Card(
      Newt.name,
      Newt.desc,
      Newt.imgURL,
      parseInt(this.cookieService.get('treatsNewt')),
      []
    );

    this.neelix = new Card(
      Neelix.name,
      Neelix.desc,
      Neelix.imgURL,
      parseInt(this.cookieService.get('treatsNeelix')),
      []
    );

    this.onClick();
  }

  onClick() {
    this.elements = document.getElementsByClassName(
      'feed'
    ) as HTMLCollectionOf<HTMLElement>;
    Array.from(this.elements).forEach((btn) => {
      btn.addEventListener('click', async (e) => {
        this.showDescription();
        await this.checkAll();
        this.available = this.treatsAvailable.amount;
      });
    });
  }

  showDescription() {
    if (this.mimi.treat >= 1) {
      this.element = document.getElementById(this.mimi.name + '-description');
      console.log(this.element);
      this.element!.style.display = 'block';
    }

    if (this.newt.treat >= 1) {
      this.element = document.getElementById(this.newt.name + '-description');
      console.log(this.element);
      this.element!.style.display = 'block';
    }

    if (this.neelix.treat >= 1) {
      this.element = document.getElementById(this.neelix.name + '-description');
      console.log(this.element);
      this.element!.style.display = 'block';
    }
  }

  async checkAll() {
    if (
      this.mimi.treat === 1 &&
      this.newt.treat === 2 &&
      this.neelix.treat === 3
    ) {
      this.easterEggFound = true;
      let response = window.prompt(
        'Congratulation, you found the perfect amount of treats ! | 🐈',
        '🎉'
      );
      // Add one treats to the cookies
      this.treatsAvailable.add(1);

      if (response === 'Miaou') {
        this.treatsAvailable.add(1);
        await alert('You get a headbump !');
      }
    }
  }
}
