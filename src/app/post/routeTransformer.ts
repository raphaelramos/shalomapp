import { Directive, HostListener } from '@angular/core';
import { ApiProvider } from '../services/api';
import { PopoverController } from '@ionic/angular';

import { BiblePage } from './bible/bible.page';

interface Versos {
  v: number;
  texto: string;
}

@Directive({
  selector: '[routeTransformer]'
})
export class RouteTransformerDirective {

  versos: Versos[] = [];

  constructor(
    private popoverController: PopoverController,
    public app: ApiProvider) {}

  @HostListener('click', ['$event'])
  public onClick(e) {
    let event = e || window.event;
    let element: any = event.target || event.srcElement;

    if(element.tagName !== 'A')
    element = element.parentNode;
    if(element.tagName == 'A' && element.href !== undefined) {
      let protocol = element.href.substr(0, element.href.indexOf(':'));

      // open in bible only http protocol. use https for open links
      if (protocol == 'https') {
        console.log('site')
        return;
      }

      event.preventDefault();
  
      let title = [element.text]
      let verse = element.text.trim();

      this.app.getBible()
      .subscribe(data => {
        // parts verse
        let books = ["gênesis","êxodo","levítico","números","deuteronômio","josué","juízes","rute","1samuel","2samuel","1reis","2reis","1crônicas","2crônicas","esdras","neemias","ester","jó","salmos","provérbios","eclesiastes","cantares","isaías","jeremias","lamentações","ezequiel","daniel","oseias","joel","amós","obadias","jonas","miqueias","naum","habacuque","sofonias","ageu","zacarias","malaquias","mateus","marcos","lucas","joão","atosdosapóstolos","romanos","1coríntios","2coríntios","gálatas","efésios","filipenses","colossenses","1tessalonicenses","2tessalonicenses","1timóteo","2timóteo","tito","filemom","hebreus","tiago","1pedro","2pedro","1joão","2joão","3joão","judas","apocalipse"];
        let booksAbr = ["gn","ex","lv","nm","dt","js","jz","rt","1sm","2sm","1rs","2rs","1cr","2cr","ed","ne","et","jó","sl","pv","ec","ct","is","jr","lm","ez","dn","os","jl","am","ob","jn","mq","na","hc","sf","ag","zc","ml","mt","mc","lc","jo","at","rm","1co","2co","gl","ef","fp","cl","1ts","2ts","1tm","2tm","tt","fm","hb","tg","1pe","2pe","1jo","2jo","3jo","jd","ap"];

        let lastIndex = verse.lastIndexOf(' ');
        let bookName = verse.slice(0, lastIndex).toLowerCase().replace(/\s+/g, '');
        console.log('bookName', bookName);

        let book = booksAbr.indexOf(bookName)+1;
        if (book == 0) {
          book = books.indexOf(bookName)+1;
          if (book == 0) {
            return;
          }
        }
        console.log('book index', book)

        let indexOf = verse.lastIndexOf(' ');
        verse = verse.slice(indexOf + 1).replace('.', ':');
        console.log('verse', verse);

        let cap = (verse.split(':')[0]) -1;
        console.log('cap', cap);

        let i = 0; // start verse
        let end = 0; //end verse
        let list = [] // list verses
        let verses;

        // verify exist verses
        if (verse.split(':')[1]) {
          verses = verse.split(':')[1];
          // star and end verses
          i = (verses.split('-')[0]) -1; // first verse
          end = (verses.split('-')[1]) -1; // last verse

          // list verses
          if(!isNaN(verses.split(',')[0])) {
            list = verses.split(',');
            i = 0;
          }
        }

        if (isNaN(cap) || isNaN(i)) {
          const novo = {v: null, texto: 'Não foi possível abrir este versículo'};
          this.versos.push(novo);
          this.show(title, this.versos);
          return;
        }
        
        let bible = data[book-1].chapters[cap];
        
        if (isNaN(end) && list.length < 1) {
          const novo = {v: i+1, texto: bible[i]};
          this.versos.push(novo);
        } else if (!(list.length > 0)) {
          for (; i-1 < end; i++) {
            const novo = {v: i+1, texto: bible[i]};
            this.versos.push(novo);
          }
        } else {
          for (i = 0; i < list.length; i++) {
            let v = Number(list[i])-1;
            const novo = {v: list[i], texto: bible[v]};
            this.versos.push(novo);
          };
        }

        this.show(title, this.versos);
      });
    }
  }

  async show(title, versos) {
    this.versos = [];
    let font = this.app.fontSize+'px';
    const popover = await this.popoverController.create({
      component: BiblePage,
      cssClass: 'bible-popover',
      backdropDismiss: true,
      componentProps: { 
        title: title,
        versos: versos,
        font: font
      }
    });
 
    return await popover.present();
  }

};