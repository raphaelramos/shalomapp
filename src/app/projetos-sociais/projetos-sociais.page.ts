import { Component, OnInit } from '@angular/core';
import { ApiProvider } from '../services/api';

@Component({
  selector: 'app-projetos-sociais',
  templateUrl: './projetos-sociais.page.html',
  styleUrls: ['./projetos-sociais.page.scss'],
})
export class ProjetosSociaisPage implements OnInit {

  constructor(public app: ApiProvider) { }

  ngOnInit() {
  }

  update() {
    this.app.updateSetting();
  }

}
