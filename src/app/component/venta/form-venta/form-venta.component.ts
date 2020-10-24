import { Component, OnInit } from '@angular/core';
import { Venta } from 'src/app/model/Venta';
import { BaseService } from 'src/app/servicio/base.service';
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

  constructor(private venta: VentaService, private item: ItemService, private producto: ProductoService, private base: BaseService) { }

  idVentaAutoincremental: number = 1;
  idVentaSeleccionada: number = 1;
  listadoVentasTab: Venta[] = [this.venta.unaVenta];

  ngOnInit() {
    var pantalla = $(window).height();
    pantalla = pantalla - 135;
    $('.pantalla').css('height', `${pantalla}px`);
    pantalla = pantalla - 335;
    $('.tabla-nueva-venta').css('height', `${pantalla}px`);
    this.venta.unaVenta = new Venta(1, null, new Date(), 0, 0);
    this.idVentaAutoincremental = 1;
    this.idVentaSeleccionada = 1;
    this.listadoVentasTab = [this.venta.unaVenta];
  }

  guardar(unaVenta: Venta) {
    if (this.formCompleto()) {
      this.venta.guardarVenta(unaVenta);
      this.cancelar();
      $('#formImrpimirVenta').modal({ closable: false }).modal('show').modal('show dimmer');
    } else {
      alertify.notify('No hay ningun item', 'error', 5);
    }
  }

  cancelar() {
    this.listadoVentasTab = this.listadoVentasTab.filter(venta => venta.id != this.idVentaSeleccionada);
    if (this.listadoVentasTab.length === 0) {
      this.nuevaVenta();
    } else {
      this.venta.unaVenta = this.listadoVentasTab[this.listadoVentasTab.length - 1];
    }
    this.idVentaSeleccionada = this.venta.unaVenta.id;
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
    this.idVentaAutoincremental++;
    this.venta.unaVenta = new Venta(this.idVentaAutoincremental, "", new Date(), 0, 0)
    this.listadoVentasTab.push(this.venta.unaVenta);
    this.idVentaSeleccionada = this.idVentaAutoincremental;
  }

  seleccionarVenta(unaVenta: Venta) {
    this.idVentaSeleccionada = unaVenta.id;
    this.venta.unaVenta = unaVenta;
    this.venta.unaVenta.items = unaVenta.items;
  }

}