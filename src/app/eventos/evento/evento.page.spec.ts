import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EventoPage } from './evento.page';

describe('EventoPage', () => {
  let component: EventoPage;
  let fixture: ComponentFixture<EventoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EventoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
