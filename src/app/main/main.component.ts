import { Component, OnInit, Renderer2 } from '@angular/core';
import { Content, Questions } from 'src/assets/content/interface';
import { CookieService } from 'ngx-cookie-service';

import { TreatsAvailable } from '../models/treatsAvailable.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  catName!: string;
  stepID!: string;

  index = 0;
  randomInt!: number;

  content!: Content;
  quizzs!: Questions[];

  cookie!: TreatsAvailable;

  constructor(
    private renderer: Renderer2,
    private cookieService: CookieService
  ) {}

  async ngOnInit(): Promise<void> {
    // Get the value of the catName and stepID from the href
    const url = window.location.href;
    this.catName = url.substring(url.indexOf('=') + 1, url.lastIndexOf('&'));
    let elements = url.split('=');
    this.stepID = elements[elements.length - 1];
    await this.query_content(this.catName, this.stepID);
    if (this.content.quizz) {
      await this.query_quizz(this.catName, this.stepID);
      this.randomInt = this.randomIntGenerator(this.quizzs.length);
    }
    for (let i = 0; i < this.content.text.length; i++) {
      this.createContentContainer(i);
      this.addText(this.content.text[i], '#container' + i);
    }

    this.createButton();
  }

  async query_content(name: string, id: string): Promise<void> {
    try {
      let document = await import(
        '../../assets/content/' +
          name.toLowerCase() +
          '/content.' +
          id +
          '.json'
      );
      this.content = document._;
    } catch (e) {
      console.log(e);
    }
  }

  async query_quizz(name: string, id: string): Promise<void> {
    try {
      let document = await import(
        '../../assets/content/' + name.toLowerCase() + '/quizz.' + id + '.json'
      );
      this.quizzs = document._;
    } catch (e) {
      console.log(e);
    }
  }

  // Create a new container in the main-container
  createContentContainer(i: number): void {
    const divContainer = this.renderer.createElement('div');
    this.renderer.setProperty(divContainer, 'id', 'container' + i);
    this.renderer.addClass(divContainer, 'container');
    let element = document.querySelector('#main-container');
    this.renderer.appendChild(element, divContainer);
  }

  // Create a new container in the main-container for the quizz
  createQuizzContainer(): void {
    const divContainer = this.renderer.createElement('div');
    this.renderer.setProperty(divContainer, 'id', 'quizz');
    this.renderer.addClass(divContainer, 'container');
    let element = document.querySelector('#quizz-container');
    this.renderer.appendChild(element, divContainer);
  }

  createButton(): void {
    const divContainer = this.renderer.createElement('div');
    this.renderer.setProperty(
      divContainer,
      'id',
      'button-out-container' + this.index
    );
    let element = document.querySelector('#main-container');
    this.renderer.appendChild(element, divContainer);
    const button = this.renderer.createElement('button');
    this.renderer.setProperty(button, 'id', 'button' + this.index);
    this.renderer.setProperty(
      button,
      'onclick',
      this.content.quizz
        ? () => {
            this.hideElements();
            this.showElements();
          }
        : () => {
            window.location.href = '/dashboard';
            this.giveTreats();
          }
    );
    this.renderer.setProperty(
      button,
      'innerHTML',
      this.content.quizz ? 'Quizz' : 'Retour'
    );
    this.renderer.addClass(button, 'button');
    this.renderer.appendChild(divContainer, button);
  }

  addText(txt: string, elementID: string) {
    let element = document.querySelector(elementID);
    if (!element) return;

    element.innerHTML += txt;
  }

  hideElements() {
    let element = document.getElementById('main-container');
    element!.style.display = 'none';
  }

  showElements() {
    document.getElementById('quizz-container')!.style.display = 'block';
  }

  giveTreats() {
    if (localStorage.getItem(this.catName + this.stepID) === null) {
      localStorage.setItem(this.catName + this.stepID, 'VISITED');
      this.cookie = new TreatsAvailable(this.cookieService);
      this.cookie.add(2);
      alert('Vous avez gagné deux friandises !');
    }
  }

  // Random Int generator
  randomIntGenerator(max: number): number {
    return Math.floor(Math.random() * Math.floor(max));
  }
}
