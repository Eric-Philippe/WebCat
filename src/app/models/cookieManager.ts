import { CookieService } from 'ngx-cookie-service';

const CATS_NAME = ['Mimi', 'Newt', 'Neelix'];

export class CookieManager {
  cookiesName!: string;

  constructor(public catName: string, private cookieService: CookieService) {
    this.init();
  }

  private init(): void {
    if (CATS_NAME.includes(this.catName)) {
      this.cookiesName = 'treats' + this.catName;
    } else {
      throw new Error('Invalid cat name');
    }
  }

  private getAmount(): string {
    return this.cookieService.get(this.cookiesName);
  }

  get amount(): string {
    return this.getAmount();
  }

  public add(amount: number): number {
    this.cookieService.set(
      this.cookiesName,
      (parseInt(this.getAmount()) + amount).toString()
    );
    return parseInt(this.getAmount());
  }

  public remove(amount: number): number {
    if (parseInt(this.getAmount()) - amount >= 0) {
      this.cookieService.set(
        this.cookiesName,
        (parseInt(this.getAmount()) - amount).toString()
      );
    }
    return parseInt(this.getAmount());
  }
}
