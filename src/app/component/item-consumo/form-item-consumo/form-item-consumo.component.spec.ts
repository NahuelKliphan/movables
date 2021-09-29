import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormItemConsumoComponent } from './form-item-consumo.component';

describe('FormItemConsumoComponent', () => {
  let component: FormItemConsumoComponent;
  let fixture: ComponentFixture<FormItemConsumoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormItemConsumoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormItemConsumoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
