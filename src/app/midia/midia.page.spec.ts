import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MidiaPage } from './midia.page';

describe('MidiaPage', () => {
  let component: MidiaPage;
  let fixture: ComponentFixture<MidiaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MidiaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MidiaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
