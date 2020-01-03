import { Component, OnInit } from '@angular/core';
import { BaseService } from 'src/app/servicio/base.service';
import { Producto } from 'src/app/model/Producto';

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

    var height = $(window).height();
    height = height-360;
    $('.lista-producto').css('height', `${height}px`);

  }

  busqueda: string = "";

  abrirModal() {

    $('.ui.modal').modal({closable: false}).modal('show');
  }

  buscar() {
    if (this.busqueda.length > 0) {
      this.base.buscarProducto(this.busqueda);
    } else {
      this.base.getProductos();
    }

  }

  borrar(unProducto: Producto) {
    this.base.borrarProducto(unProducto);
  }

  editar(unProducto: Producto) {
    this.base.editar = true;
    this.base.unProducto = unProducto;
  }

  filtrar(){
    this.base.setFiltro(this.base.idFiltrar);
    this.base.getProductos();
  }

}
