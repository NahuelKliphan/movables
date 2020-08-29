import { Component, OnInit } from '@angular/core';
import { Venta } from 'src/app/model/Venta';
import { ItemService } from 'src/app/servicio/item.service';
import { ProductoService } from 'src/app/servicio/producto.service';
import { VentaService } from 'src/app/servicio/venta.service';
import { BaseService } from 'src/app/servicio/base.service';

declare var $: any;
declare var alertify: any;

@Component({
  selector: 'app-form-venta',
  templateUrl: './form-venta.component.html',
  styleUrls: ['./form-venta.component.css']
})
export class FormVentaComponent implements OnInit {

  constructor(private venta: VentaService, private item: ItemService, private producto: ProductoService, private base: BaseService) { }

  idVentaTemporal: number = 1;
  idVentaSeleccionada: number = 1;

  ngOnInit() {
    var pantalla = $(window).height();
    pantalla = pantalla - 135;
    $('.pantalla').css('height', `${pantalla}px`);
    pantalla = pantalla - 335;
    $('.tabla').css('height', `${pantalla}px`);
    this.item.listadoItem = [];
    this.venta.listadoVenta = [];
    this.nuevaVenta();
  }

  guardar(unaVenta: Venta) {
    this.item.listadoItem = [...unaVenta.items];
    if (this.formCompleto()) {
      this.venta.guardarVenta(unaVenta);
      this.vaciarForm();
      this.item.idItemTemp = 0;
      $('#formImrpimirVenta').modal({ closable: false }).modal('show').modal('show dimmer');
    } else {
      alertify.notify('No hay ningun item', 'error', 5);
    }
  }

  cancelar() {
    this.vaciarForm();
    this.item.listadoItem = [];
    this.venta.unaVenta.items = [];
    this.item.idItemTemp = 0;
    if (this.idVentaSeleccionada == this.idVentaTemporal - 1 && this.idVentaSeleccionada != 1) {
      this.venta.listadoVenta = this.venta.listadoVenta.filter(v => v.id != this.idVentaSeleccionada);
      this.idVentaTemporal--;
      this.idVentaSeleccionada = this.idVentaTemporal - 1;
    }
  }

  vaciarForm() {
    this.venta.unaVenta = new Venta(null, null, new Date(), 0, 0);
  }

  abrirLista() {
    this.producto.enVenta = true;
    this.producto.scanner = (this.base.getVariable('Scanner') == 'S') ? true : false;
    $("#inputCantidad").select();
    $('#listaProducto').modal({ closable: false }).modal('show');
  }

  formCompleto() {
    if (this.venta.unaVenta.items.length > 0) {
      return true;
    }
    else {
      return false;
    }
  }

  nuevaVenta() {
    this.venta.unaVenta = new Venta(this.idVentaTemporal, null, new Date(), 0, 0);
    this.venta.listadoVenta.push(this.venta.unaVenta);
    this.idVentaSeleccionada = this.idVentaTemporal;
    this.idVentaTemporal++;
  }

  seleccionarVenta(unaVenta: Venta) {
    this.idVentaSeleccionada = unaVenta.id;
    this.venta.unaVenta = this.venta.listadoVenta.find(v => v.id == unaVenta.id);
  }

}