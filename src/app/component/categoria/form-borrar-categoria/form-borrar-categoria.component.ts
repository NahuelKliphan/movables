import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/model/Categoria';
import { CategoriaService } from 'src/app/servicio/categoria.service';

declare var $: any;

@Component({
  selector: 'app-form-borrar-categoria',
  templateUrl: './form-borrar-categoria.component.html',
  styleUrls: ['./form-borrar-categoria.component.css']
})
export class FormBorrarCategoriaComponent implements OnInit {

  constructor(private categoria: CategoriaService) { }

  ngOnInit() {
  }
  borrar() {
    $('#formBorrarCategoria').modal('hide');
    this.categoria.borrarCategoria(this.categoria.unaCategoria);
    this.categoria.vaciarCampos();
  }

  cancelar() {
    $('#formBorrarCategoria').modal('hide');
    this.categoria.vaciarCampos();
  }

}