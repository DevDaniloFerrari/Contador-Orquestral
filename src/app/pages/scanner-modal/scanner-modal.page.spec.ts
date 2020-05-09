import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ScannerModalPage } from './scanner-modal.page';

describe('ScannerModalPage', () => {
  let component: ScannerModalPage;
  let fixture: ComponentFixture<ScannerModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScannerModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ScannerModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
