import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CargaItemComponent } from './carga-item.component';

describe('CargaItemComponent', () => {
  let component: CargaItemComponent;
  let fixture: ComponentFixture<CargaItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CargaItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CargaItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
