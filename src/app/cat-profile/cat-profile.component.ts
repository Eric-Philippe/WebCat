import { Component, OnInit, Input } from '@angular/core';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { CatModel } from '../models/catModel.model';
import { CookieManager } from '../models/cookieManager';
import { TreatsAvailable } from '../models/treatsAvailable.model';
import { buildRemaining } from '../models/utils.model';

const CHEAT_CODE = 'LOUISE';

@Component({
  selector: 'app-cat-profile',
  templateUrl: './cat-profile.component.html',
  styleUrls: ['./cat-profile.component.scss'],
})
export class CatProfileComponent extends DashboardComponent implements OnInit {
  @Input() cat!: CatModel;
  catCookie!: CookieManager;
  available!: TreatsAvailable;
  treats_cat!: number;
  override treats_available!: string;
  remaining!: number;
  window = window;

  index_cheat = 0;

  override ngOnInit(): void {
    this.catCookie = new CookieManager(this.cat.name, this.cookieService);
    this.available = new TreatsAvailable(this.cookieService);

    this.treats_cat = parseInt(this.catCookie.amount);
    this.treats_available = this.available.amount;
    this.remaining = this.cat.remaining;

    this.cheatCode();
  }

  override cheatCode() {
    document.addEventListener('keydown', (e) => {
      if (e.key === CHEAT_CODE[this.index_cheat]) {
        this.index_cheat++;
        if (this.index_cheat === CHEAT_CODE.length) {
          this.catCookie.add(1989);
          this.treats_cat = parseInt(this.catCookie.amount);
          this.generatePDF();
          this.remaining = buildRemaining(
            this.cat.infos,
            this.catCookie.amount
          );
          this.index_cheat = 0;
        }
      } else {
        this.index_cheat = 0;
      }
    });
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
