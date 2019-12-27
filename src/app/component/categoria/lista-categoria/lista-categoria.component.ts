import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/model/Categoria';

@Component({
  selector: 'app-lista-categoria',
  templateUrl: './lista-categoria.component.html',
  styleUrls: ['./lista-categoria.component.css']
})
export class ListaCategoriaComponent implements OnInit {

  listadoCategoria: Categoria[] = [];

  categoria1: Categoria = new Categoria(1,'Descartable');
  categoria2: Categoria = new Categoria(1,'Basos');
  categoria3: Categoria = new Categoria(1,'Platos');
  categoria4: Categoria = new Categoria(1,'Fuentes');

  constructor() {

    this.listadoCategoria.push(this.categoria1);
    this.listadoCategoria.push(this.categoria2);
    this.listadoCategoria.push(this.categoria3);
    this.listadoCategoria.push(this.categoria4);
    this.listadoCategoria.push(this.categoria1);
    this.listadoCategoria.push(this.categoria2);
    this.listadoCategoria.push(this.categoria3);
    this.listadoCategoria.push(this.categoria4);
    this.listadoCategoria.push(this.categoria1);
    this.listadoCategoria.push(this.categoria2);
    this.listadoCategoria.push(this.categoria3);
    this.listadoCategoria.push(this.categoria4);
    this.listadoCategoria.push(this.categoria1);
    this.listadoCategoria.push(this.categoria2);
    this.listadoCategoria.push(this.categoria3);
    this.listadoCategoria.push(this.categoria4);
    this.listadoCategoria.push(this.categoria1);
    this.listadoCategoria.push(this.categoria2);
    this.listadoCategoria.push(this.categoria3);
    this.listadoCategoria.push(this.categoria4);
    this.listadoCategoria.push(this.categoria1);
    this.listadoCategoria.push(this.categoria2);
    this.listadoCategoria.push(this.categoria3);
    this.listadoCategoria.push(this.categoria4);

   }

  ngOnInit() {
  }

}
