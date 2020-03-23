import { Component, OnInit, HostListener } from '@angular/core';
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

  @HostListener('keydown.enter')
  guardar() {
    if (this.categoria.editar) {
      if (this.formCompleto()) {
        this.categoria.editarCategoria(this.categoria.unaCategoria);
        this.categoria.vaciarCampos();
      }
      this.categoria.getCategorias();
      this.categoria.editar = false;
      $('#nombreCategoria').focus();
    } else {
      if (this.formCompleto()) {
        if (this.categoria.verificarNombre(this.categoria.unaCategoria.nombre)) {
          this.categoria.guardarCategoria(new Categoria(this.categoria.unaCategoria.id, this.categoria.unaCategoria.nombre, this.categoria.unaCategoria.descripcion));
        }
      }
      this.categoria.editar = false;
    }
    $('#nombreCategoria').focus();
    this.categoria.vaciarCampos();

  }

  @HostListener('keydown.escape')
  cancelar() {
    $('#formCategoria').modal('hide').modal('hide dimmer');
    this.categoria.vaciarCampos();
    this.categoria.editar = false;
    this.categoria.getCategorias();
  }

  formCompleto() {
    let ret = true;
    //Nombre
    if (this.categoria.unaCategoria.nombre == null || this.categoria.unaCategoria.nombre == "") {
      ret = false;
      alertify.notify('Nombre no válido', 'error', 5);
      return false;
    }
    return ret;
  }

}
