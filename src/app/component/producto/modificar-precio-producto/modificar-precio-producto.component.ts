import { Component, OnInit } from '@angular/core';
import { BaseService } from 'src/app/servicio/base.service';

declare var $: any;
declare var alertify: any;

@Component({
  selector: 'app-modificar-precio-producto',
  templateUrl: './modificar-precio-producto.component.html',
  styleUrls: ['./modificar-precio-producto.component.css']
})
export class ModificarPrecioProductoComponent implements OnInit {

  porcentaje: boolean = true;
  monto: boolean = false;
  aumentar: boolean = true;
  bajar: boolean = false;
  precio_costo: boolean = true;
  precio_venta: boolean = false;

  constructor(private base: BaseService) { }

  ngOnInit() {

    $('#filtrar').dropdown();
    this.base.getCategorias();
    this.base.filtro = '';

  }

  aceptar() {

    if (this.formCompleto()) {

      var consulta = "UPDATE PRODUCTOS SET ";
      if (this.aumentar) {
        this.base.unRegistroPrecio.operacion = '+';
      } else {
        this.base.unRegistroPrecio.operacion = "-";
      }
      if (this.precio_costo) {
        this.base.unRegistroPrecio.tipo_precio = "precio_costo";
      } else {
        this.base.unRegistroPrecio.tipo_precio = "precio_venta";
      }
      if (this.porcentaje) {
        this.base.unRegistroPrecio.valor = this.base.unRegistroPrecio.valor / 100;
        this.base.unRegistroPrecio.tipo_valor = 'Porcentaje';
        consulta += `${this.base.unRegistroPrecio.tipo_precio} = case when mod((${this.base.unRegistroPrecio.tipo_precio} ${this.base.unRegistroPrecio.operacion} ${this.base.unRegistroPrecio.tipo_precio} *${this.base.unRegistroPrecio.valor}),10) = 0 then (${this.base.unRegistroPrecio.tipo_precio} ${this.base.unRegistroPrecio.operacion} ${this.base.unRegistroPrecio.tipo_precio} *${this.base.unRegistroPrecio.valor}) else case when mod((${this.base.unRegistroPrecio.tipo_precio} ${this.base.unRegistroPrecio.operacion} ${this.base.unRegistroPrecio.tipo_precio} *${this.base.unRegistroPrecio.valor}),10) <= 5 then (${this.base.unRegistroPrecio.tipo_precio} ${this.base.unRegistroPrecio.operacion} ${this.base.unRegistroPrecio.tipo_precio} *${this.base.unRegistroPrecio.valor}) - mod((${this.base.unRegistroPrecio.tipo_precio} ${this.base.unRegistroPrecio.operacion} ${this.base.unRegistroPrecio.tipo_precio} *${this.base.unRegistroPrecio.valor}),10) else (${this.base.unRegistroPrecio.tipo_precio} ${this.base.unRegistroPrecio.operacion} ${this.base.unRegistroPrecio.tipo_precio} *${this.base.unRegistroPrecio.valor}) + (10 - mod((${this.base.unRegistroPrecio.tipo_precio} ${this.base.unRegistroPrecio.operacion} ${this.base.unRegistroPrecio.tipo_precio} *${this.base.unRegistroPrecio.valor}),10)) end end `;
      } else {
        this.base.unRegistroPrecio.tipo_valor = 'Monto';
        consulta += `${this.base.unRegistroPrecio.tipo_precio} = case when mod(${this.base.unRegistroPrecio.valor} + ${this.base.unRegistroPrecio.tipo_precio},10) = 0 then ${this.base.unRegistroPrecio.valor} + ${this.base.unRegistroPrecio.tipo_precio} else case when mod(${this.base.unRegistroPrecio.valor} + ${this.base.unRegistroPrecio.tipo_precio},10) <= 5 then ${this.base.unRegistroPrecio.valor} + ${this.base.unRegistroPrecio.tipo_precio} - mod(${this.base.unRegistroPrecio.valor} + ${this.base.unRegistroPrecio.tipo_precio},10) else ${this.base.unRegistroPrecio.valor} + ${this.base.unRegistroPrecio.tipo_precio} ${this.base.unRegistroPrecio.operacion} (10 - mod(${this.base.unRegistroPrecio.valor} + ${this.base.unRegistroPrecio.tipo_precio},10)) end end `;
      }
      consulta += this.base.filtro + ";"
      let registro = `INSERT INTO REGISTRO_PRECIOS (fecha, operacion, tipo_valor, tipo_precio , valor, id_categoria) 
      VALUES (current_date, '${this.base.unRegistroPrecio.operacion}', '${this.base.unRegistroPrecio.tipo_valor}', '${this.base.unRegistroPrecio.tipo_precio}', ${this.base.unRegistroPrecio.valor}, ${this.base.unRegistroPrecio.id_categoria});`;
      consulta += registro;
      $('#modificarPrecioProducto').modal('hide').modal('hide dimmer');
      this.vaciarForm();
      this.base.modificarPrecioProducto(consulta);
    }
  }

  cancelar() {
    this.vaciarForm();
    $('#modificarPrecioProducto').modal('hide').modal('hide dimmer');
  }

  selectPercent() {
    this.monto = false;
    $("#iconoValor").removeClass("dollar sign");
    $("#iconoValor").addClass("percent");
  }

  selectMotno() {
    this.porcentaje = false;
    $("#iconoValor").removeClass("percent");
    $("#iconoValor").addClass("dollar sign");
  }

  selectAumentar() {
    this.bajar = false;
  }

  selectBajar() {
    this.aumentar = false;
  }

  selectPrecioCosto() {
    this.precio_venta = false;
  }

  selectPrecioVenta() {
    this.precio_costo = false;
  }

  setFiltro() {
    this.base.setFiltro(this.base.unRegistroPrecio.id_categoria);
  }

  formCompleto() {

    let ret = true;

    //Valor
    if (this.base.unRegistroPrecio.valor == null || !this.base.isNumber(this.base.unRegistroPrecio.valor) || this.base.unRegistroPrecio.valor < 1) {
      ret = false;
      alertify.notify('Valor no válido', 'error', 5);
      return false;
    }

    return ret;

  }

  vaciarForm() {
    this.base.unRegistroPrecio.valor = null;
    this.porcentaje = true;
    this.monto = false;
    this.aumentar = true;
    this.bajar = false;
    this.base.filtro = '';
  }

}
