import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBorrarCategoriaComponent } from './form-borrar-categoria.component';

describe('FormBorrarCategoriaComponent', () => {
  let component: FormBorrarCategoriaComponent;
  let fixture: ComponentFixture<FormBorrarCategoriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormBorrarCategoriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormBorrarCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
