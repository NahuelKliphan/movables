import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/model/Producto';
import { BaseService } from 'src/app/servicio/base.service';


@Component({
  selector: 'app-form-producto',
  templateUrl: './form-producto.component.html',
  styleUrls: ['./form-producto.component.css']
})
export class FormProductoComponent implements OnInit {

  constructor(private base: BaseService) {}

  ngOnInit() {
  }

  unProducto: Producto = new Producto(null, null, null, null);

  guardar() {
    if(this.formCompleto()){

      this.base.guardarProducto(new Producto(this.unProducto.codigo, this.unProducto.precio, this.unProducto.cantidad, this.unProducto.descripcion));
      this.vaciarCampos();

    }else
    {
      alert('Faltan datos')
    }
    
  }

  formCompleto() {

    if (this.unProducto.codigo != null && this.unProducto.precio != null && this.unProducto.cantidad != null && this.unProducto.descripcion != null) {
      return true;
    }
    else {
      return false;
    }
  }

  vaciarCampos(){
    this.unProducto= new Producto(null, null, null, null);
  }

}
