import { Component, OnInit } from '@angular/core';
import { BaseService } from 'src/app/servicio/base.service';
import { Venta } from 'src/app/model/Venta';

declare var $: any;

@Component({
  selector: 'app-form-borrar-venta',
  templateUrl: './form-borrar-venta.component.html',
  styleUrls: ['./form-borrar-venta.component.css']
})
export class FormBorrarVentaComponent implements OnInit {

  constructor(private base: BaseService) { }

  ngOnInit() {
  }

  borrar(){
    $('#formBorrarVenta').modal('hide');
    this.base.borrarVenta(this.base.unaVenta);
    this.vaciarCampos();
  }

  cancelar(){
    $('#formBorrarVenta').modal('hide');
    this.vaciarCampos();
  }

  vaciarCampos() {
    this.base.unaVenta = new Venta(null, null, new Date(), 0); 
  }

}
