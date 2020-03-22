import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/model/Categoria';
import { BaseService } from 'src/app/servicio/base.service';
import { CategoriaService } from 'src/app/servicio/categoria.service';

declare var $: any;

@Component({
  selector: 'app-lista-categoria',
  templateUrl: './lista-categoria.component.html',
  styleUrls: ['./lista-categoria.component.css']
})
export class ListaCategoriaComponent implements OnInit {

  constructor(private categoria: CategoriaService) { }

  ngOnInit() {
    this.categoria.getCategorias();
  }

  borrar(unaCategoria: Categoria) {
    this.categoria.unaCategoria = unaCategoria;
    $('#formBorrarCategoria').modal({ closable: false }).modal('show');
  }

  editar(unaCategoria: Categoria) {
    this.categoria.editar = true;
    this.categoria.unaCategoria = unaCategoria;
  }

}
