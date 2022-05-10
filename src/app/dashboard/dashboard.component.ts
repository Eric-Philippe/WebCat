import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { jsPDF } from 'jspdf';

import { CookieManager } from '../models/cookieManager';
import { buildRemaining } from '../models/utils.model';
import { CatModel, Infos } from '../models/catModel.model';

import { MimiLinks, NewtLinks, NeelixLinks } from '../../assets/CatsLinks';
import { Mimi, Newt, Neelix } from 'src/assets/Cats';

const CHEAT_CODE = 'GLITCH';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(public cookieService: CookieService) {}

  myCheatIndex = 0;

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

    this.cheatCode();
    this.onClick();
  }

  // Launch an event listener on the keys of the keyboard
  cheatCode() {
    document.addEventListener('keydown', (e) => {
      if (e.key === CHEAT_CODE[this.myCheatIndex]) {
        this.myCheatIndex++;
        if (this.myCheatIndex === CHEAT_CODE.length) {
          this.cookieService.set(
            'treatsAvailable',
            String(parseInt(this.treats_available) + 100)
          );
          this.treats_available = this.cookieService.get('treatsAvailable');
          this.myCheatIndex = 0;
        }
      } else {
        this.myCheatIndex = 0;
      }
    });
  }

  onClick() {
    this.elements = document.getElementsByClassName(
      'feed'
    ) as HTMLCollectionOf<HTMLElement>;
    Array.from(this.elements).forEach((btn) => {
      btn.addEventListener('click', async (e) => {
        this.treats_available = this.cookieService.get('treatsAvailable');
        console.log(
          buildRemaining(this.mimiModel.infos, this.mimiCookies.amount)
        );
        if (this.verificationCompletion()) {
          this.generatePDF();
        }
      });
    });
  }

  onClickQuizz() {
    window.location.href = '/quizz';
  }

  verificationCompletion() {
    return (
      buildRemaining(this.mimiModel.infos, this.mimiCookies.amount) ===
        this.mimiModel.infos.length &&
      buildRemaining(this.newtModel.infos, this.newtCookies.amount) ===
        this.newtModel.infos.length &&
      buildRemaining(this.neelixModel.infos, this.neelixCookies.amount) ===
        this.neelixModel.infos.length
    );
  }

  generatePDF() {
    if (localStorage.getItem('PDF') !== null) return;
    localStorage.setItem('PDF', 'TRUE');

    alert(
      'Vous venez de compléter le WebDoc !\nVous pouvez donc générer votre certificat !'
    );

    let username = this.getUsername();
    // Create a new instance of jsPDF
    let doc = new jsPDF({ orientation: 'landscape' });
    // Load the Image and add it on add it on the document
    var img = new Image();
    img.src = 'assets/img/Certificat.png';
    doc.addImage(img, 'png', 0, 0, 297, 210);
    // Calculate the coordinates to center the text
    let x = (297 - doc.getTextWidth(username!)) / 2;
    // Add the text
    doc.text(username!, x, 100);
    // Save the PDF
    doc.save('CertifiCAT_' + username.split(' ').join('_') + '.pdf');
    // Load it in the browser
    var file_path = 'CertifiCAT_' + username.split(' ').join('_') + '.pdf';
    // Create a link to download the PDF
    var a = document.createElement('a');
    a.href = file_path;
    a.download = 'CertifiCAT_' + username.split(' ').join('_') + '.pdf';
    document.body.appendChild(a);
    // Launch the Dowload
    a.click();
    document.body.removeChild(a);
  }

  // Get the username while the user didn't input it
  getUsername(): string {
    let username = prompt(
      'Veuillez entrer votre Prénom NOM pour avoir votre récompense !'
    );
    if (
      username === null ||
      username.split(' ').length !== 2 ||
      username.length > 40
    ) {
      return this.getUsername();
    } else {
      return username;
    }
  }
}
