import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EstudosPage } from './estudos.page';

describe('EstudosPage', () => {
  let component: EstudosPage;
  let fixture: ComponentFixture<EstudosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstudosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EstudosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
