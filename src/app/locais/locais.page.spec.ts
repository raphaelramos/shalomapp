import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LocaisPage } from './locais.page';

describe('LocaisPage', () => {
  let component: LocaisPage;
  let fixture: ComponentFixture<LocaisPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocaisPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LocaisPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
