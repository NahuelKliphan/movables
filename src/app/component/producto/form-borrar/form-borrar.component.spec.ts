import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBorrarComponent } from './form-borrar.component';

describe('FormModalComponent', () => {
  let component: FormBorrarComponent;
  let fixture: ComponentFixture<FormBorrarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormBorrarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormBorrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
