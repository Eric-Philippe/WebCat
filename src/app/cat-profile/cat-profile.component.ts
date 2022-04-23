import { Component, OnInit, Input } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { CatModel } from '../models/catModel.model';
import { CookieManager } from '../models/cookieManager';
import { TreatsAvailable } from '../models/treatsAvailable.model';
import { buildRemaining } from '../models/utils.model';

@Component({
  selector: 'app-cat-profile',
  templateUrl: './cat-profile.component.html',
  styleUrls: ['./cat-profile.component.scss'],
})
export class CatProfileComponent implements OnInit {
  @Input() cat!: CatModel;
  catCookie!: CookieManager;
  available!: TreatsAvailable;
  treats_cat!: number;
  treats_available!: string;
  remaining!: number;
  window = window;

  constructor(private cookieService: CookieService) {}

  ngOnInit(): void {
    this.catCookie = new CookieManager(this.cat.name, this.cookieService);
    this.available = new TreatsAvailable(this.cookieService);

    this.treats_cat = parseInt(this.catCookie.amount);
    this.treats_available = this.available.amount;
    this.remaining = this.cat.remaining;
  }

  onTreat() {
    if (parseInt(this.available.amount) > 0) {
      this.catCookie.add(1);
      this.available.remove(1);
      this.treats_cat = parseInt(this.catCookie.amount);
      this.treats_available = this.available.amount;
      this.cat.treat = this.catCookie.amount;
      this.remaining = buildRemaining(this.cat.infos, this.catCookie.amount);
    }
  }
}
