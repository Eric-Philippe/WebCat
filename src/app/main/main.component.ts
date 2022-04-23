import { Component, OnInit } from '@angular/core';
import { Content } from 'src/assets/content/interface';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  catName!: string;
  stepID!: string;

  content!: Content;

  constructor() {}

  async ngOnInit(): Promise<void> {
    // Get the value of the catName and stepID from the href
    const url = window.location.href;
    this.catName = url.substring(url.indexOf('=') + 1, url.lastIndexOf('&'));
    let elements = url.split('=');
    this.stepID = elements[elements.length - 1];
    await this.query_content(this.catName, this.stepID);
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
}
