import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBorrarVentaComponent } from './form-borrar-venta.component';

describe('FormBorrarVentaComponent', () => {
  let component: FormBorrarVentaComponent;
  let fixture: ComponentFixture<FormBorrarVentaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormBorrarVentaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormBorrarVentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
