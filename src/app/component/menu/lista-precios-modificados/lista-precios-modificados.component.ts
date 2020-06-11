import { Component, OnInit } from '@angular/core';
import { CategoriaService } from 'src/app/servicio/categoria.service';
import { RegistroPrecioService } from 'src/app/servicio/registro-precio.service';
import { BaseService } from 'src/app/servicio/base.service';

declare var $: any;
declare var alertify: any;

@Component({
  selector: 'app-lista-precios-modificados',
  templateUrl: './lista-precios-modificados.component.html',
  styleUrls: ['./lista-precios-modificados.component.css']
})
export class ListaPreciosModificadosComponent implements OnInit {

  constructor(private registroPrecio: RegistroPrecioService, private categoria: CategoriaService, private base: BaseService) { }

  ngOnInit() {

    var pantalla = $(window).height();
    pantalla = pantalla - 536;
    $('.tabla').css('height', `${pantalla}px`);
    this.registroPrecio.getRegistroPrecios();
    this.categoria.getCategorias();
  }

  abrirModal() {
    $('#avisoBackup').modal({ closable: false }).modal('show');
    setTimeout(function () {
      $('#avisoBackup').modal('hide');
      $('#modificarPrecioProducto').modal({ closable: false }).modal('show').modal('show dimmer');
    }, 5000);
  }

}