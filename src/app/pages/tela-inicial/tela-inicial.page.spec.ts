import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TelaInicialPage } from './tela-inicial.page';

describe('TelaInicialPage', () => {
  let component: TelaInicialPage;
  let fixture: ComponentFixture<TelaInicialPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TelaInicialPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TelaInicialPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
