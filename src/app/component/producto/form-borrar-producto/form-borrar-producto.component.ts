import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/model/Producto';
import { ProductoService } from 'src/app/servicio/producto.service';

declare var $: any;

@Component({
  selector: 'app-form-borrar-producto',
  templateUrl: './form-borrar-producto.component.html',
  styleUrls: ['./form-borrar-producto.component.css']
})

export class FormBorrarProductoComponent implements OnInit {

  constructor(private producto: ProductoService) { }

  ngOnInit() {

  }

  borrar() {
    $('#formBorrarProducto').modal('hide');
    this.producto.borrarProducto(this.producto.unProducto);
    this.vaciarCampos();
  }

  cancelar() {
    $('#formBorrarProducto').modal('hide');
    this.vaciarCampos();
  }

  vaciarCampos() {
    this.producto.unProducto = new Producto(null, null, null, null, null, null, null, null, null);
  }

}
