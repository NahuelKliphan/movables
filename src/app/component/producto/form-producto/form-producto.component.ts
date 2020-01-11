import { Component, HostListener, OnInit } from '@angular/core';
import { Producto } from 'src/app/model/Producto';
import { BaseService } from 'src/app/servicio/base.service';

declare var $: any;
declare var alertify: any;

@Component({
  selector: 'app-form-producto',
  templateUrl: './form-producto.component.html',
  styleUrls: ['./form-producto.component.css']
})

export class FormProductoComponent implements OnInit {

  constructor(private base: BaseService) { }

  ngOnInit() {

    $('.ui.dropdown').dropdown();
    $('.special.cards .image').dimmer({
      on: 'hover'
    });

    this.base.getCategorias();
  }

  @HostListener('keydown.enter')
  guardar() {

    if (this.base.editar) {
      if (this.formCompleto()) {
        this.base.editarProducto(this.base.unProducto);
      }
      this.vaciarCampos();
      this.base.getProductos();
      this.base.editar = false;
    } else {
      if (this.formCompleto()) {

        if (this.base.verificarCodigoProducto(this.base.unProducto.codigo)) {
          this.base.guardarProducto(new Producto(this.base.unProducto.codigo, this.base.unProducto.nombre, this.base.adaptarDecimal(this.base.unProducto.precio), this.base.unProducto.cantidad, this.base.unProducto.descripcion, this.base.unProducto.foto, this.base.unProducto.idcategoria));
          this.vaciarCampos();
        }
      }
      this.base.editar = false;
    }

    $("#buscarProducto").focus();

  }

  @HostListener('keydown.escape')
  cancelar() {
    this.vaciarCampos();
    this.base.editar = false;
    this.base.getProductos();
    $('#formProducto').modal('hide');
    $("#buscarProducto").focus();
  }

  formCompleto() {

    let ret = true;

    //Codigo
    if (this.base.unProducto.codigo == null || this.base.unProducto.codigo == "") {
      ret = false;
      alertify.notify('Codigo no válido', 'error', 5);
      return false;
    }

    //Nombre
    if (this.base.unProducto.nombre == null || this.base.unProducto.nombre == "") {
      ret = false;
      alertify.notify('Nombre no válido', 'error', 5);
      return false;
    }

    //Precio
    if (this.base.unProducto.precio == null || this.base.unProducto.precio < 0) {
      ret = false;
      alertify.notify('Precio no válido', 'error', 5);
      return false;
    }

    //Cantidad
    if (this.base.unProducto.cantidad == null || this.base.unProducto.cantidad < 0) {
      ret = false;
      alertify.notify('Cantidad no válida', 'error', 5);
      return false;
    }

    return ret;

  }

  vaciarCampos() {
    this.base.unProducto = new Producto(null, null, null, null, null, null, null);
  }

  fileData: File = null;
  previewUrl: any = null;

  cargarFoto(fileInput: any) {
    if (this.cargar) {
      this.fileData = <File>fileInput.target.files[0];
      var reader = new FileReader();
      reader.readAsDataURL(this.fileData);
      reader.onload = (_event) => {
        this.previewUrl = reader.result;
        this.base.unProducto.foto = this.previewUrl;
      }
    }
  }

  cargar: boolean = true;

  borrarFoto() {
    $("#foto").prop("value", "");
    this.cargar = false;
    this.base.unProducto.foto = null;
    this.cargar = true;
  }

}
