import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/model/Categoria';
import { BaseService } from 'src/app/servicio/base.service';

declare var $: any;

@Component({
  selector: 'app-lista-categoria',
  templateUrl: './lista-categoria.component.html',
  styleUrls: ['./lista-categoria.component.css']
})
export class ListaCategoriaComponent implements OnInit {

  constructor(private base: BaseService) {

   }

  ngOnInit() {

    this.base.getCategorias();

    var height = $(window).height();
    height = height-360;
    $('.lista-categoria').css('height', `${height}px`);

  }

  borrar(unaCategoria: Categoria) {
    this.base.unaCategoria = unaCategoria;
    $('#formBorrarCategoria').modal({closable: false}).modal('show');
  }

  editar(unaCategoria: Categoria) {
    this.base.editar = true;
    this.base.unaCategoria = unaCategoria;
  }

}
