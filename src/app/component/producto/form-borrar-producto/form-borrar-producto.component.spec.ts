import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBorrarProductoComponent } from './form-borrar-producto.component';

describe('FormModalComponent', () => {
  let component: FormBorrarProductoComponent;
  let fixture: ComponentFixture<FormBorrarProductoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormBorrarProductoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormBorrarProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
