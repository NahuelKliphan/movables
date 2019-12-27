import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/model/Producto';
import { BaseService } from 'src/app/servicio/base.service';

declare var $: any;

@Component({
  selector: 'app-form-producto',
  templateUrl: './form-producto.component.html',
  styleUrls: ['./form-producto.component.css']
})
export class FormProductoComponent implements OnInit {

  constructor(private base: BaseService) { }

  ngOnInit() {

    $('.ui.dropdown').dropdown();
    $('.special.cards .image').dimmer({
      on: 'hover'
    });

  }

  unProducto: Producto = new Producto(null, null, null, null, null, null, null);

  guardar() {
    if (this.formCompleto()) {

      this.base.guardarProducto(new Producto(this.unProducto.codigo, this.unProducto.nombre, this.unProducto.precio, this.unProducto.cantidad, this.unProducto.descripcion, this.unProducto.foto, this.unProducto.idCategoria));
      this.vaciarCampos();

    } else {
      alert('Faltan datos')
    }

  }

  formCompleto() {

    if (this.unProducto.codigo != null && this.unProducto.precio != null && this.unProducto.cantidad != null && this.unProducto.descripcion != null) {
      return true;
    }
    else {
      return false;
    }
  }

  vaciarCampos() {
    this.unProducto = new Producto(null, null, null, null, null, null, null);
  }

}
