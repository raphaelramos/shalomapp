import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProjetosSociaisPage } from './projetos-sociais.page';

describe('ProjetosSociaisPage', () => {
  let component: ProjetosSociaisPage;
  let fixture: ComponentFixture<ProjetosSociaisPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjetosSociaisPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProjetosSociaisPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
