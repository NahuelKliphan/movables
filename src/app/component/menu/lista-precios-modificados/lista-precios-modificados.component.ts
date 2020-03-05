import { Component, OnInit } from '@angular/core';
import { BaseService } from 'src/app/servicio/base.service';
import { RegistroPrecio } from 'src/app/model/RegistroPrecio';

declare var $: any;
declare var alertify: any;

@Component({
  selector: 'app-lista-precios-modificados',
  templateUrl: './lista-precios-modificados.component.html',
  styleUrls: ['./lista-precios-modificados.component.css']
})
export class ListaPreciosModificadosComponent implements OnInit {

  constructor(private base: BaseService) { }

  ngOnInit() {

    var pantalla = $(window).height();
    pantalla = pantalla - 536;
    $('.tabla').css('height', `${pantalla}px`);

    this.base.getRegistroPrecios();
    this.base.getCategorias();
  }

  abrirModal() {
    $('#avisoBackup').modal({ closable: false }).modal('show');
    setTimeout(function () {
      $('#avisoBackup').modal('hide');
      $('#modificarPrecioProducto').modal({ closable: false }).modal('show').modal('show dimmer');
    }, 5000);
  }

}
