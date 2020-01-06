import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/model/Categoria';
import { BaseService } from 'src/app/servicio/base.service';

declare var alertify: any;

@Component({
  selector: 'app-form-categoria',
  templateUrl: './form-categoria.component.html',
  styleUrls: ['./form-categoria.component.css']
})
export class FormCategoriaComponent implements OnInit {

  constructor(private base: BaseService) { }

  ngOnInit() {
  }

  guardar() {
    if (this.formCompleto()) {
      if (this.base.verificarNombre(this.base.unaCategoria.nombre)) {
        this.base.guardarCategoria(new Categoria(this.base.unaCategoria.id, this.base.unaCategoria.nombre));
      }
    } else {
      alertify.notify('Faltan datos', 'error', 5);
    }

    this.vaciarCampos();

  }

  editar() {

    if (this.formCompleto()) {
      this.base.editarCategoria(this.base.unaCategoria);
      this.vaciarCampos();
    } else {
      alertify.notify('Faltan datos', 'error', 5);
    }

    this.base.getCategorias();
    this.base.editar = false;

  }

  formCompleto() {

    let ret = true;

    //Nombre
    if (this.base.unaCategoria.nombre == null || this.base.unProducto.nombre == "") {
      ret = false;
      return false;
    }
    return ret;
  }

  vaciarCampos() {
    this.base.unaCategoria = new Categoria(null, null);
  }

}
