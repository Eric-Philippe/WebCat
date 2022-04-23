import { Component, OnInit, Input } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Card } from '../models/card.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() card!: Card;

  constructor(private cookieService: CookieService) {}

  ngOnInit(): void {}

  onTreat() {
    if (parseInt(this.cookieService.get('treatsAvailable')) > 0) {
      this.card.treat++;
      this.cookieService.set(
        'treats' + this.card.name,
        this.card.treat.toString()
      );
      this.cookieService.set(
        'treatsAvailable',
        (parseInt(this.cookieService.get('treatsAvailable')) - 1).toString()
      );
    }
  }
}
