import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { eventosPage } from './eventos.page';

describe('eventosPage', () => {
  let component: eventosPage;
  let fixture: ComponentFixture<eventosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ eventosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(eventosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
