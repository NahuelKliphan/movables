import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCantidadComponent } from './form-cantidad.component';

describe('FormCantidadComponent', () => {
  let component: FormCantidadComponent;
  let fixture: ComponentFixture<FormCantidadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormCantidadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCantidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
