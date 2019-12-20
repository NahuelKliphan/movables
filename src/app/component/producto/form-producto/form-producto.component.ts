import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/model/Producto';

@Component({
  selector: 'app-form-producto',
  templateUrl: './form-producto.component.html',
  styleUrls: ['./form-producto.component.css']
})
export class FormProductoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  unProducto: Producto = new Producto(null,null,null,null);

}
