import {
  Component,
  OnInit,
  Injectable,
  Renderer2,
  RendererFactory2,
} from '@angular/core';
import { Content } from 'src/assets/content/interface';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  catName!: string;
  stepID!: string;

  index = 0;

  htmlToAdd = '<div id="container' + this.index + '">Salut</div>';

  content!: Content;

  constructor(private renderer: Renderer2) {}

  async ngOnInit(): Promise<void> {
    // Get the value of the catName and stepID from the href
    const url = window.location.href;
    this.catName = url.substring(url.indexOf('=') + 1, url.lastIndexOf('&'));
    let elements = url.split('=');
    this.stepID = elements[elements.length - 1];
    await this.query_content(this.catName, this.stepID);
    this.createContainer();
    this.addText(this.content.text[0]);
    this.index++;
    this.createContainer();
    this.addText(this.content.text[0]);
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

  // Create a new container in the main-container
  createContainer(): void {
    const divContainer = this.renderer.createElement('div');
    this.renderer.setProperty(divContainer, 'id', 'container' + this.index);
    this.renderer.addClass(divContainer, 'container');
    let element = document.querySelector('#main-container');
    this.renderer.appendChild(element, divContainer);
  }

  addText(txt: string) {
    let element = document.querySelector('#container' + this.index);
    if (!element) return;

    element.innerHTML += txt;
  }
}
