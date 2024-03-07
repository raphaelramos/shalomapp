import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DizimosPage } from './dizimos.page';

describe('DizimosPage', () => {
  let component: DizimosPage;
  let fixture: ComponentFixture<DizimosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DizimosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DizimosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
