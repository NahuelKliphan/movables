import { Component, OnInit } from '@angular/core';
import { Venta } from 'src/app/model/Venta';
import { ItemService } from 'src/app/servicio/item.service';
import { ProductoService } from 'src/app/servicio/producto.service';
import { VentaService } from 'src/app/servicio/venta.service';

declare var $: any;
declare var alertify: any;

@Component({
  selector: 'app-form-venta',
  templateUrl: './form-venta.component.html',
  styleUrls: ['./form-venta.component.css']
})
export class FormVentaComponent implements OnInit {

  constructor(private venta: VentaService, private item: ItemService, private producto: ProductoService) { }

  ngOnInit() {
    var pantalla = $(window).height();
    pantalla = pantalla - 135;
    $('.pantalla').css('height', `${pantalla}px`);
    pantalla = pantalla - 401;
    $('.tabla').css('height', `${pantalla}px`);
    this.item.listadoItem = [];
  }

  guardar(unaVenta: Venta) {
    if (this.formCompleto()) {
      this.venta.guardarVenta(unaVenta);
      this.vaciarForm();
      this.item.idItemTemp = 0;
    } else {
      alertify.notify('No hay ningun item', 'error', 5);
    }

  }

  cancelar() {
    this.vaciarForm();
    this.item.listadoItem = [];
    this.item.idItemTemp = 0;
  }

  vaciarForm() {
    this.venta.unaVenta = new Venta(null, null, new Date(), 0);
  }

  abrirLista() {
    this.producto.enVenta = true;
    $('#listaProducto').modal({ closable: false }).modal('show');
  }

  formCompleto() {
    if (this.item.listadoItem.length > 0) {
      return true;
    }
    else {
      return false;
    }
  }

}