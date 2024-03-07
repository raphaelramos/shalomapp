import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ShalomPage } from './shalom.page';

describe('ShalomPage', () => {
  let component: ShalomPage;
  let fixture: ComponentFixture<ShalomPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShalomPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ShalomPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
