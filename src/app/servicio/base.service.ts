import { Injectable } from '@angular/core';
import { Producto } from '../model/Producto';
import { ElectronService } from 'ngx-electron';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  listadoProducto: Producto[] = [];

  constructor(private ipc: ElectronService) {

  }

  //producto1: Producto = new Producto('1234', 399, 50, 'Taper');
  //producto2: Producto = new Producto('1235', 879, 15, 'Cubiertos');
  //producto3: Producto = new Producto('1236', 1500, 5, 'Taper');
  //producto4: Producto = new Producto('1237', 87, 60, 'Taper rojo con bandejas de plata y oro por el costado');

  cerrar() {
    this.ipc.ipcRenderer.send('salir');
  }

  getProductos() {

    const consulta = "SELECT * FROM PRODUCTOS LIMIT 100";
    let res = this.ipc.ipcRenderer.sendSync('actualizar', consulta);
    this.listadoProducto = res;
  }

  guardarProducto(unProdcuto: Producto) {
    const consulta = `INSERT INTO PRODUCTOS (codigo,nombre,precio,cantidad,descripcion,foto,idcategoria) VALUES ('${unProdcuto.codigo}','${unProdcuto.nombre}',${unProdcuto.precio},${unProdcuto.cantidad},'${unProdcuto.descripcion}','${unProdcuto.foto}',${unProdcuto.idCategoria});`;
    this.ipc.ipcRenderer.sendSync('req', consulta);
    this.getProductos();
  }

  borrarProducto(unProdcuto: Producto) {
    const consulta = `DELETE FROM PRODUCTOS WHERE codigo = '${unProdcuto.codigo}';`;
    this.ipc.ipcRenderer.sendSync('req', consulta);
    this.getProductos();

  }

  //Fuera de funcionamiento
  editarProducto(unProdcuto: Producto) {
    const consulta = `UPDATE PRODUCTOS SET codigo = '${unProdcuto.codigo}', precio = ${unProdcuto.precio} , cantidad = ${unProdcuto.cantidad} , descripcion = '${unProdcuto.descripcion}' WHERE codigo = '${unProdcuto.codigo}';`;
    this.ipc.ipcRenderer.send('req', consulta);
    this.ipc.ipcRenderer.on('res', () => {
      this.getProductos();
    });
  }

}


