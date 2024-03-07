import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PlanosPage } from './planos.page';

describe('PlanosPage', () => {
  let component: PlanosPage;
  let fixture: ComponentFixture<PlanosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PlanosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
