import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/model/Producto';

declare var $: any;

@Component({
  selector: 'app-lista-producto',
  templateUrl: './lista-producto.component.html',
  styleUrls: ['./lista-producto.component.css']
})
export class ListaProductoComponent implements OnInit {

  constructor() {

    this.listadoProducto.push(this.producto1);
    this.listadoProducto.push(this.producto2);
    this.listadoProducto.push(this.producto3);
    this.listadoProducto.push(this.producto4);
    this.listadoProducto.push(this.producto1);
    this.listadoProducto.push(this.producto2);
    this.listadoProducto.push(this.producto3);
    this.listadoProducto.push(this.producto4);


  }

  ngOnInit() {

  }

  busqueda: string = "";

  producto1: Producto = new Producto('1234', 399, 50, 'Taper');
  producto2: Producto = new Producto('1235', 879, 15, 'Cubiertos');
  producto3: Producto = new Producto('1236', 1500, 5, 'Taper');
  producto4: Producto = new Producto('1237', 87, 60, 'Taper rojo con bandejas de plata y oro por el costado');

  listadoProducto: Producto[] = [];

  abrirModal() {

    $('.ui.modal').modal('show');

  }



}
