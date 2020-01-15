import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/model/Categoria';
import { BaseService } from 'src/app/servicio/base.service';

declare var $: any;

@Component({
  selector: 'app-form-borrar-categoria',
  templateUrl: './form-borrar-categoria.component.html',
  styleUrls: ['./form-borrar-categoria.component.css']
})
export class FormBorrarCategoriaComponent implements OnInit {

  constructor(private base: BaseService) { }

  ngOnInit() {
  }
  borrar(){
    $('#formBorrarCategoria').modal('hide');
    this.base.borrarCategoria(this.base.unaCategoria);
    this.vaciarCampos();
  }

  cancelar(){
    $('#formBorrarCategoria').modal('hide');
    this.vaciarCampos();
  }

  vaciarCampos() {
    this.base.unaCategoria = new Categoria(null, null);
  }

}
