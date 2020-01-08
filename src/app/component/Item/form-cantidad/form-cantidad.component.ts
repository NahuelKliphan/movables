import { Component, OnInit } from '@angular/core';
import { BaseService } from 'src/app/servicio/base.service';
import { Item } from 'src/app/model/Item';

declare var $: any;

@Component({
  selector: 'app-form-cantidad',
  templateUrl: './form-cantidad.component.html',
  styleUrls: ['./form-cantidad.component.css']
})
export class FormCantidadComponent implements OnInit {

  constructor(private base: BaseService) { }

  ngOnInit() {
  }

  aceptar() {
    $('#formCantidadItem').modal('hide');
    this.base.listadoItem.push(new Item(0, 0, 200, this.base.unProducto.codigo, this.base.unProducto.nombre, this.base.unItem.cantidad, this.base.unProducto.precio * this.base.unItem.cantidad));
    this.base.unaVenta.total = this.base.unaVenta.total + this.base.unItem.total;
    this.vaciarForm();
  }

  cancelar() {
    $('#formCantidadItem').modal('hide');
    this.vaciarForm();
  }

  vaciarForm() {
    this.base.unItem = new Item(null, null, null, null, null, 1, null);
  }

}
