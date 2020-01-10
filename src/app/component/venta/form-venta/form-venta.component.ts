import { Component, OnInit } from '@angular/core';
import { BaseService } from 'src/app/servicio/base.service';
import { Venta } from 'src/app/model/Venta';

declare var $: any;

@Component({
  selector: 'app-form-venta',
  templateUrl: './form-venta.component.html',
  styleUrls: ['./form-venta.component.css']
})
export class FormVentaComponent implements OnInit {

  constructor(private base: BaseService) { }

  ngOnInit() {

    var pantalla = $(window).height();
    pantalla = pantalla - 135;
    $('.pantalla').css('height', `${pantalla}px`);

  }

  guardar(unaVenta: Venta) {
    this.base.guardarVenta(unaVenta);
    this.vaciarForm();
  }

  cancelar(){
    this.vaciarForm();
    this.base.listadoItem = [];
  }

  vaciarForm() {
    this.base.unaVenta = new Venta(null, null, new Date(), 0);
  }

  abrirLista(){
    this.base.enVenta = true;
    $('#listaProducto').modal({ closable: false }).modal('show');
    $("#buscarProducto").focus();
  }

}
