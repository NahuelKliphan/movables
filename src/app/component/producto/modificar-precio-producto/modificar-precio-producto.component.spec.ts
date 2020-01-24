import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarPrecioProductoComponent } from './modificar-precio-producto.component';

describe('ModificarPrecioProductoComponent', () => {
  let component: ModificarPrecioProductoComponent;
  let fixture: ComponentFixture<ModificarPrecioProductoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificarPrecioProductoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarPrecioProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
