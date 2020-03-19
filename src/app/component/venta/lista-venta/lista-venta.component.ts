import { Component, OnInit } from '@angular/core';
import { BaseService } from 'src/app/servicio/base.service';
import { Venta } from 'src/app/model/Venta';

declare var $: any;

@Component({
  selector: 'app-lista-venta',
  templateUrl: './lista-venta.component.html',
  styleUrls: ['./lista-venta.component.css']
})
export class ListaVentaComponent implements OnInit {

  constructor(private base: BaseService) { }

  ngOnInit() {
    var pantalla = $(window).height();
    pantalla = pantalla - 135;
    $('.pantalla').css('height', `${pantalla}px`);
    pantalla = pantalla - 300;
    $('.tabla').css('height', `${pantalla}px`);
    this.base.getVentas();
    this.base.actualizarEstadisticasVentas();
    this.base.listadoItem = [];
  }

  eliminarVenta(unaVenta: Venta) {
    this.base.unaVenta = unaVenta;
    $('#formBorrarVenta').modal({closable: false}).modal('show');
  }

  buscarItems(unaVenta: Venta) {
    this.base.getItems(unaVenta);
    $("#ventanaItems").modal("show");
  }

  buscarVentas() {
    if (this.base.desde != "" && this.base.hasta != "") {
      this.base.getVentasEntreFechas(this.base.desde, this.base.hasta);
      this.base.actualizarEstadisticasVentas();
    }
  }

}
