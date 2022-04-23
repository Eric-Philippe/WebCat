import { CookieService } from 'ngx-cookie-service';

export class TreatsAvailable {
  constructor(private cookieService: CookieService) {}

  private getCookie(): string {
    return this.cookieService.get('treatsAvailable');
  }

  get amount(): string {
    return this.getCookie();
  }

  init(amount: number): void {
    this.cookieService.set('treatsAvailable', amount.toString());
  }

  add(amount: number): void {
    this.cookieService.set(
      'treatsAvailable',
      (parseInt(this.getCookie()) + amount).toString()
    );
  }

  remove(amount: number): void {
    this.cookieService.set(
      'treatsAvailable',
      (parseInt(this.getCookie()) - amount).toString()
    );
  }
}
