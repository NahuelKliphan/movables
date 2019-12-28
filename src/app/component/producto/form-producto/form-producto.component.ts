import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/model/Producto';
import { BaseService } from 'src/app/servicio/base.service';

declare var $: any;

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

  }
  
  guardar() {

    if (this.formCompleto()) {

      if(this.base.verificarCodigo(this.base.unProducto.codigo)){
        this.base.guardarProducto(new Producto(this.base.unProducto.codigo, this.base.unProducto.nombre, this.base.unProducto.precio, this.base.unProducto.cantidad, this.base.unProducto.descripcion, this.base.unProducto.foto, this.base.unProducto.idCategoria));
      }else
      {
        alert('Codigo Repetido');
      }
      
      this.vaciarCampos();

    } else {
      alert('Faltan datos')
    }

  }

  editar(){
    this.base.editarProducto(this.base.unProducto);
    this.vaciarCampos();
    this.base.editar = false;
  }

  cancelar(){
    this.vaciarCampos();
    this.base.editar = false;
  }

  formCompleto() {

    if (this.base.unProducto.codigo != null && this.base.unProducto.precio != null && this.base.unProducto.cantidad != null && this.base.unProducto.descripcion != null) {
      return true;
    }
    else {
      return false;
    }
  }

  vaciarCampos() {
    this.base.unProducto = new Producto(null, null, null, null, null, null, null);
  }

  fileData: File = null;
  previewUrl: any = null;

  cargarFoto(fileInput: any) {

    this.fileData = <File>fileInput.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = (_event) => {
      
      this.previewUrl = reader.result;
      this.base.unProducto.foto = this.previewUrl;
    }

  }

  test(){
    console.log(this.base.verificarCodigo('555'));
  }

}
