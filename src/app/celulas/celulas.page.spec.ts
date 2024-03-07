import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CelulasPage } from './celulas.page';

describe('CelulasPage', () => {
  let component: CelulasPage;
  let fixture: ComponentFixture<CelulasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CelulasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CelulasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
