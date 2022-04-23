import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

import { CookieManager } from '../models/cookieManager';
import { buildRemaining } from '../models/utils.model';
import { CatModel, Infos } from '../models/catModel.model';

import { MimiLinks, NewtLinks, NeelixLinks } from '../../assets/CatsLinks';
import { Mimi, Newt, Neelix } from 'src/assets/Cats';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(private cookieService: CookieService) {}

  treats_available!: string;
  elements!: HTMLCollectionOf<HTMLElement>;
  element!: HTMLElement | null;

  mimiCookies: CookieManager = new CookieManager('Mimi', this.cookieService);
  mimiIndexes!: object[];
  mimiModel!: CatModel;

  newtCookies: CookieManager = new CookieManager('Newt', this.cookieService);
  newtIndexes!: object[];
  newtModel!: CatModel;

  neelixCookies: CookieManager = new CookieManager(
    'Neelix',
    this.cookieService
  );
  neelixIndexes!: object[];
  neelixModel!: CatModel;

  ngOnInit(): void {
    this.treats_available = this.cookieService.get('treatsAvailable');

    this.mimiModel = new CatModel(
      Mimi.name,
      Mimi.desc,
      Mimi.imgURL,
      this.mimiCookies.amount,
      buildRemaining(MimiLinks, this.mimiCookies.amount),
      MimiLinks
    );

    this.mimiModel.infos.length;

    this.newtModel = new CatModel(
      Newt.name,
      Newt.desc,
      Newt.imgURL,
      this.newtCookies.amount,
      buildRemaining(NewtLinks, this.newtCookies.amount),
      NewtLinks
    );

    this.neelixModel = new CatModel(
      Neelix.name,
      Neelix.desc,
      Neelix.imgURL,
      this.neelixCookies.amount,
      buildRemaining(NeelixLinks, this.neelixCookies.amount),
      NeelixLinks
    );

    this.onClick();
  }

  onClick() {
    this.elements = document.getElementsByClassName(
      'feed'
    ) as HTMLCollectionOf<HTMLElement>;
    Array.from(this.elements).forEach((btn) => {
      btn.addEventListener('click', async (e) => {
        this.treats_available = this.cookieService.get('treatsAvailable');
      });
    });
  }
}
