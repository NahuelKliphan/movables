import { Component, OnInit } from '@angular/core';
import { BaseService } from 'src/app/servicio/base.service';
import { Venta } from 'src/app/model/Venta';

@Component({
  selector: 'app-form-venta',
  templateUrl: './form-venta.component.html',
  styleUrls: ['./form-venta.component.css']
})
export class FormVentaComponent implements OnInit {

  constructor(private base: BaseService) { }

  ngOnInit() {

  }

  guardar(unaVenta: Venta) {
    this.base.guardarVenta(unaVenta);
    this.vaciarForm();
  }

  vaciarForm() {
    this.base.unaVenta = new Venta(null, null, new Date(), 0);
  }

}
