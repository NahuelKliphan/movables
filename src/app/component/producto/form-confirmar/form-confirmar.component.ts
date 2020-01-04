import { Component, OnInit } from '@angular/core';
import { BaseService } from 'src/app/servicio/base.service';
import { Producto } from 'src/app/model/Producto';

declare var alertify:any;

@Component({
  selector: 'app-form-confirmar',
  templateUrl: './form-confirmar.component.html',
  styleUrls: ['./form-confirmar.component.css']
})
export class FormConfirmarComponent implements OnInit {

  constructor(private base: BaseService) { }

  ngOnInit() {
    
  }

  borrar(){
    this.base.borrarProducto(this.base.unProducto);
    alertify.notify('Producto eliminado', 'success', 5);
    this.vaciarCampos();
  }

  vaciarCampos() {
    this.base.unProducto = new Producto(null, null, null, null, null, null, null);
  }

}