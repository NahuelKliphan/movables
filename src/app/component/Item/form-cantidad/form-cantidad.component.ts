import { Component, OnInit } from '@angular/core';
import { BaseService } from 'src/app/servicio/base.service';
import { Item } from 'src/app/model/Item';

declare var $: any;
declare var alertify: any;

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
    if(this.base.unItem.cantidad > 0 ){
      $('#formCantidadItem').modal('hide');
      this.base.unItem = new Item(0, 0, this.base.unProducto.precio * this.base.unItem.cantidad, this.base.unProducto.codigo, this.base.unProducto.nombre, this.base.unItem.cantidad, this.base.unProducto.precio);
      this.base.listadoItem.push(this.base.unItem);
      this.base.unaVenta.total = this.base.unaVenta.total + this.base.unItem.total;
      this.vaciarForm();
    }else{
      alertify.notify('Cantidad invalida', 'error', 5);
    }

  }

  cancelar() {
    $('#formCantidadItem').modal('hide');
    this.vaciarForm();
  }

  vaciarForm() {
    this.base.unItem = new Item(null, null, null, null, null, 1, null);
  }

}
