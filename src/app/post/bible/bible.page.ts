import { Component, Input } from '@angular/core';

@Component({
  selector: 'bible-page',
  templateUrl: 'bible.page.html',
  styleUrls: ['./bible.page.scss'],
})
export class BiblePage {

  @Input() title: string;
  @Input() versos: any;
  @Input() font: string;
  
  constructor() {}

}