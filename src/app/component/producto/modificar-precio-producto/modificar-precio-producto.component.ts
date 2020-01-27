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

  constructor(private base: BaseService) { }

  ngOnInit() {

    $('#filtrar').dropdown();
    this.base.getCategorias();
    this.base.filtro = '';

  }

  aceptar() {

    if (this.formCompleto()) {

      $('#modificarPrecioProducto').modal('hide');

      let consulta = "UPDATE PRODUCTOS SET PRECIO = PRECIO ";

      if (this.aumentar) {
        consulta += '+ ';
        this.base.unRegistroPrecio.operacion = 'Aumento';
      } else {
        consulta += '- ';
        this.base.unRegistroPrecio.operacion = "Descuento";
      }

      if (this.porcentaje) {
        this.base.unRegistroPrecio.valor = this.base.unRegistroPrecio.valor / 100;
        consulta += `PRECIO * ${this.base.unRegistroPrecio.valor} `;
        this.base.unRegistroPrecio.tipo_valor = 'Porcentaje';
      } else {
        consulta += `${this.base.unRegistroPrecio.valor} `;
        this.base.unRegistroPrecio.tipo_valor = 'Monto';
      }

      consulta += this.base.filtro + ";"

      let registro = `INSERT INTO REGISTRO_PRECIOS (fecha, operacion, tipo_valor, valor, id_categoria) 
      VALUES (current_date, '${this.base.unRegistroPrecio.operacion}', '${this.base.unRegistroPrecio.tipo_valor}', ${this.base.unRegistroPrecio.valor}, ${this.base.unRegistroPrecio.id_categoria});`;

      consulta += registro;

      this.vaciarForm();
      this.base.modificarPrecioProducto(consulta);
    }
  }

  cancelar() {
    this.vaciarForm();
    $('#modificarPrecioProducto').modal('hide');
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
    this.porcentaje= true;
    this.monto = false;
    this.aumentar = true;
    this.bajar = false;
  }

}
