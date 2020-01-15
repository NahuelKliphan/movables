import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/model/Producto';
import { BaseService } from 'src/app/servicio/base.service';

declare var $: any;

@Component({
  selector: 'app-lista-producto',
  templateUrl: './lista-producto.component.html',
  styleUrls: ['./lista-producto.component.css']
})
export class ListaProductoComponent implements OnInit {

  constructor(private base: BaseService) {

  }

  ngOnInit() {

    this.base.getCategorias();
    this.base.getProductos();

    $('#filtrar').dropdown();
    
    var pantalla = $(window).height();
    pantalla = pantalla - 135;
    $('.pantalla').css('height', `${pantalla}px`);

    $("#buscarProducto").focus();
  }

  abrirModal() {
    $('#formProducto').modal({ closable: false }).modal('show');
    $("#foto").prop("value", "");
  }

  buscar() {
    if (this.base.busqueda.length > 0) {
      this.base.buscarProducto(this.base.busqueda);
      if (this.base.enVenta && this.base.scanner && this.base.listadoProducto.length == 1) {
        this.vender(this.base.listadoProducto[0]);
      }
    } else {
      this.base.getProductos();
    }
  }

  borrar(unProducto: Producto) {
    this.base.unProducto = unProducto;
    $("#foto").prop("value", "");
    $('#formBorrarProducto').modal({ closable: false }).modal('show');
  }

  editar(unProducto: Producto) {
    this.base.editar = true;
    this.base.unProducto = unProducto;
  }

  filtrar() {
    this.base.setFiltro(this.base.idFiltrar);
    this.base.getProductos();
  }

  vender(unProducto: Producto) {
    this.base.unProducto = unProducto;
    $('#listaProducto').modal('hide');
    $('#formCantidadItem').modal({ closable: false }).modal('show');
  }

  salir() {
    $('#listaProducto').modal('hide');
  }

}
