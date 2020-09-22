import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/model/Categoria';
import { CategoriaService } from 'src/app/servicio/categoria.service';
import { BaseService } from 'src/app/servicio/base.service';

declare var $: any;

@Component({
  selector: 'app-lista-categoria',
  templateUrl: './lista-categoria.component.html',
  styleUrls: ['./lista-categoria.component.css']
})
export class ListaCategoriaComponent implements OnInit {

  constructor(private categoria: CategoriaService, private base: BaseService) { }

  ngOnInit() {
    var pantalla = $(window).height();
    pantalla = pantalla - 135;
    $('.pantalla').css('height', `${pantalla}px`);
    $('.lista-categoria').css('height', `${pantalla}px`);
    $("#buscarCategoria").focus();
    this.categoria.getCategorias();
  }

  abrirModal() {
    $('#formCategoria').modal({ closable: false }).modal('show');
  }

  borrar(unaCategoria: Categoria) {
    this.categoria.unaCategoria = unaCategoria;
    $('#formBorrarCategoria').modal({ closable: false }).modal('show');
  }

  editar(unaCategoria: Categoria) {
    this.categoria.editar = true;
    this.categoria.unaCategoria = unaCategoria;
    if (this.categoria.unaCategoria.descripcion == 'null') {
      this.categoria.unaCategoria.descripcion = '';
    }
  }

  buscar() {
    if (this.categoria.busqueda.length > 0) {
      this.categoria.buscarCategoria(this.categoria.busqueda);
    } else {
      this.categoria.getCategorias();
    }
  }

}
