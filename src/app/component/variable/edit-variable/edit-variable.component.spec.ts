import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVariableComponent } from './edit-variable.component';

describe('EditVariableComponent', () => {
  let component: EditVariableComponent;
  let fixture: ComponentFixture<EditVariableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditVariableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditVariableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
