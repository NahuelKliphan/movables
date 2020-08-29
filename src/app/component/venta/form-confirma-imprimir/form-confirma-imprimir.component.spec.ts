import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormConfirmaImprimirComponent } from './form-confirma-imprimir.component';

describe('FormConfirmaImprimirComponent', () => {
  let component: FormConfirmaImprimirComponent;
  let fixture: ComponentFixture<FormConfirmaImprimirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormConfirmaImprimirComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormConfirmaImprimirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
