import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPreciosModificadosComponent } from './lista-precios-modificados.component';

describe('ListaPreciosModificadosComponent', () => {
  let component: ListaPreciosModificadosComponent;
  let fixture: ComponentFixture<ListaPreciosModificadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaPreciosModificadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaPreciosModificadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
