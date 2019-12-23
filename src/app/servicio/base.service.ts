import { Injectable } from '@angular/core';
import { Producto } from '../model/Producto';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  listadoProducto: Producto[] = [];

  constructor() {

    //temp
    //this.listadoProducto.push(this.producto1);
    //this.listadoProducto.push(this.producto2);
    //this.listadoProducto.push(this.producto3);
    //this.listadoProducto.push(this.producto4);

   }

  producto1: Producto = new Producto('1234', 399, 50, 'Taper');
  producto2: Producto = new Producto('1235', 879, 15, 'Cubiertos');
  producto3: Producto = new Producto('1236', 1500, 5, 'Taper');
  producto4: Producto = new Producto('1237', 87, 60, 'Taper rojo con bandejas de plata y oro por el costado');

  guardarProducto(unProdcuto: Producto){

    this.listadoProducto.push(unProdcuto);

  }

  borrarProducto(unProdcuto: Producto){
    this.listadoProducto = this.listadoProducto.filter(x => x != unProdcuto)
  }

  conectar(){
    console.log('conectar')
  }

  
  
}
