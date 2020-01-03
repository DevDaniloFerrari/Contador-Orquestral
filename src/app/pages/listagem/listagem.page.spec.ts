import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListagemPage } from './listagem.page';

describe('ListagemPage', () => {
  let component: ListagemPage;
  let fixture: ComponentFixture<ListagemPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListagemPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListagemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
