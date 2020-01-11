import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/model/Item';
import { BaseService } from 'src/app/servicio/base.service';
import { Producto } from 'src/app/model/Producto';

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
    if (this.base.unItem.cantidad > 0) {

      if (this.comprobarCantidad()) {

        $('#formCantidadItem').modal('hide');
        this.base.unItem = new Item(this.base.idItemTemp, 1, this.base.unProducto.precio * this.base.unItem.cantidad, this.base.unProducto.codigo, this.base.unProducto.nombre, this.base.unItem.cantidad, this.base.unProducto.precio);
        this.base.idItemTemp++;
        this.base.listadoItem.push(this.base.unItem);
        this.base.unaVenta.total = this.base.unaVenta.total + this.base.unItem.total;
        this.vaciarForm();
        alertify.notify('Item cargado', 'success', 5);
        $('#listaProducto').modal({ closable: false }).modal('show');

      } else {
        alertify.notify('No hay suficiente cantidad', 'error', 5);
      }

    } else {
      alertify.notify('Cantidad invalida', 'error', 5);
    }

  }

  cancelar() {
    $('#formCantidadItem').modal('hide');
    this.vaciarForm();
  }


  vaciarForm() {
    this.base.unItem = new Item(null, null, null, null, null, 1, null);
    this.base.unProducto = new Producto(null, null, null, null, null, null, null);
    this.base.busqueda="";
  }

  cantidad: number = 0;

  comprobarCantidad() {
    this.cantidad = 0;
    this.base.listadoItem.forEach(unItem => {
      if (unItem.codigo == this.base.unProducto.codigo) {
        this.cantidad = Number(this.cantidad) + Number(unItem.cantidad);
      }
    });
    this.cantidad = Number(this.cantidad) + Number(this.base.unItem.cantidad);
    if (this.base.consultarCantidadProducto(this.base.unProducto) >= this.cantidad) {
      return true;
    } else {
      return false;
    }
  }
}
