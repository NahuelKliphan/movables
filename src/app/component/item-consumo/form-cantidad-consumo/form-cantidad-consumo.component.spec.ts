import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCantidadConsumoComponent } from './form-cantidad-consumo.component';

describe('FormCantidadConsumoComponent', () => {
  let component: FormCantidadConsumoComponent;
  let fixture: ComponentFixture<FormCantidadConsumoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormCantidadConsumoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCantidadConsumoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
