import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/model/Producto';
import { BaseService } from 'src/app/servicio/base.service';
import { CategoriaService } from 'src/app/servicio/categoria.service';
import { ProductoService } from 'src/app/servicio/producto.service';

declare var $: any;

@Component({
  selector: 'app-lista-producto',
  templateUrl: './lista-producto.component.html',
  styleUrls: ['./lista-producto.component.css']
})
export class ListaProductoComponent implements OnInit {

  constructor(private producto: ProductoService, private base: BaseService, private categoria: CategoriaService) { }

  ngOnInit() {
    this.producto.limiteProductos = this.base.getVariable("Cantidad limite de productos");
    console.log(this.producto.limiteProductos)
    var pantalla = $(window).height();
    pantalla = pantalla - 135;
    $('.pantalla').css('height', `${pantalla}px`);
    $('#filtrar').dropdown({ fullTextSearch: true });
    $("#buscarProducto").focus();
    this.categoria.getCategorias();
    this.producto.listadoProducto = [];
    this.producto.getProductos();
    this.producto.scanner = (this.base.getVariable('Scanner') == 'S') ? true : false;
  }

  abrirModal() {
    $('#formProducto').modal({ closable: false }).modal('show');
    $("#foto").prop("value", "");
  }

  buscar() {
    this.producto.concatenarListado = false;
    this.producto.getProductos();
    if (this.producto.enVenta && this.producto.scanner && this.producto.listadoProducto.length == 1) {
      this.vender(this.producto.listadoProducto[0]);
    }
  }

  borrar(unProducto: Producto) {
    this.producto.unProducto = unProducto;
    $("#foto").prop("value", "");
    $('#formBorrarProducto').modal({ closable: false }).modal('show').modal('show dimmer');
  }

  editar(unProducto: Producto) {
    this.producto.editar = true;
    this.producto.unProducto = new Producto(unProducto.id, unProducto.codigo, unProducto.nombre, unProducto.precio_costo, unProducto.precio_venta, unProducto.cantidad, unProducto.descripcion, unProducto.foto, unProducto.id_categoria);
  }

  filtrar() {
    this.producto.setFiltro(this.producto.idFiltrar);
    this.producto.getProductos();
  }

  vender(unProducto: Producto) {
    this.producto.unProducto = unProducto;
    $('#listaProducto').modal('hide');
    $("#inputCantidad").select();
    $('#formCantidadItem').modal({ closable: false }).modal('show').modal('show dimmer');
  }

  salir() {
    $('#listaProducto').modal('hide');
  }

  cambiarScanner() {
    var valor = (this.producto.scanner) ? 'S' : 'N';
    this.base.setVariable('Scanner', valor);
  }

  verMas() {
    this.producto.concatenarListado = true;
    this.producto.getProductos();
  }

}