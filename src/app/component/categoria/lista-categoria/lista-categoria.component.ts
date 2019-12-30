import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/model/Categoria';
import { basename } from 'path';
import { BaseService } from 'src/app/servicio/base.service';

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

  }

  borrar(unaCategoria: Categoria) {
    this.base.borrarCategoria(unaCategoria);
  }

  editar(unaCategoria: Categoria) {
    this.base.editar = true;
    this.base.unaCategoria = unaCategoria;
  }

}
