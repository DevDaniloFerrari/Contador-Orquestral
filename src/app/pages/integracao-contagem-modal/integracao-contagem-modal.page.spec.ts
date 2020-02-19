import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IntegracaoContagemModalPage } from './integracao-contagem-modal.page';

describe('IntegracaoContagemModalPage', () => {
  let component: IntegracaoContagemModalPage;
  let fixture: ComponentFixture<IntegracaoContagemModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntegracaoContagemModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IntegracaoContagemModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
