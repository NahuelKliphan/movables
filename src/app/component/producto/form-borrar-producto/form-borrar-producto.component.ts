import { Component, HostListener, OnInit } from '@angular/core';
import { Producto } from 'src/app/model/Producto';
import { BaseService } from 'src/app/servicio/base.service';

declare var $: any;

@Component({
  selector: 'app-form-borrar-producto',
  templateUrl: './form-borrar-producto.component.html',
  styleUrls: ['./form-borrar-producto.component.css']
})

export class FormBorrarProductoComponent implements OnInit {

  constructor(private base: BaseService) { }

  ngOnInit() {
    
  }

  @HostListener('keydown.enter')
  borrar(){
    this.base.borrarProducto(this.base.unProducto);
    this.vaciarCampos();
  }

  @HostListener('keydown.escape')
  cancelar(){
    $('#formBorrarProducto').modal('hide');
    this.vaciarCampos();
  }

  vaciarCampos() {
    this.base.unProducto = new Producto(null, null, null, null, null, null, null);
  }

}
