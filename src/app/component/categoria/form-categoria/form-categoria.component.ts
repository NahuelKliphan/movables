import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/model/Categoria';
import { CategoriaService } from 'src/app/servicio/categoria.service';

declare var alertify: any;
declare var $: any;

@Component({
  selector: 'app-form-categoria',
  templateUrl: './form-categoria.component.html',
  styleUrls: ['./form-categoria.component.css']
})
export class FormCategoriaComponent implements OnInit {

  constructor(private categoria: CategoriaService) { }

  ngOnInit() {
  }

  guardar() {
    if (this.formCompleto()) {
      if (this.categoria.verificarNombre(this.categoria.unaCategoria.nombre)) {
        this.categoria.guardarCategoria(new Categoria(this.categoria.unaCategoria.id, this.categoria.unaCategoria.nombre));
      }
    } else {
      alertify.notify('Faltan datos', 'error', 5);
    }
    $('#nombreCategoria').focus();
    this.vaciarCampos();

  }

  editar() {

    if (this.formCompleto()) {
      this.categoria.editarCategoria(this.categoria.unaCategoria);
      this.vaciarCampos();
    } else {
      alertify.notify('Faltan datos', 'error', 5);
    }

    this.categoria.getCategorias();
    this.categoria.editar = false;
    $('#nombreCategoria').focus();

  }

  formCompleto() {

    let ret = true;

    //Nombre
    if (this.categoria.unaCategoria.nombre == null || this.categoria.unaCategoria.nombre == "") {
      ret = false;
      return false;
    }
    return ret;
  }

  vaciarCampos() {
    this.categoria.unaCategoria = new Categoria(null, null);
  }

}
