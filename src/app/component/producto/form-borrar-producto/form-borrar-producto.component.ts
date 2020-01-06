import { Component, OnInit } from '@angular/core';
import { BaseService } from 'src/app/servicio/base.service';
import { Producto } from 'src/app/model/Producto';

declare var alertify:any;

@Component({
  selector: 'app-form-borrar-producto',
  templateUrl: './form-borrar-producto.component.html',
  styleUrls: ['./form-borrar-producto.component.css']
})
export class FormBorrarProductoComponent implements OnInit {

  constructor(private base: BaseService) { }

  ngOnInit() {
    
  }

  borrar(){
    this.base.borrarProducto(this.base.unProducto);
    this.vaciarCampos();
  }

  vaciarCampos() {
    this.base.unProducto = new Producto(null, null, null, null, null, null, null);
  }

}
