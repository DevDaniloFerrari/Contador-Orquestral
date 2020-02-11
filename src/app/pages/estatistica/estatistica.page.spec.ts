import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EstatisticaPage } from './estatistica.page';

describe('EstatisticaPage', () => {
  let component: EstatisticaPage;
  let fixture: ComponentFixture<EstatisticaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstatisticaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EstatisticaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
