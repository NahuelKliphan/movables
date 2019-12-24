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

  producto1: Producto = new Producto('1234', 399, 50, 'Taper');
  producto2: Producto = new Producto('1235', 879, 15, 'Cubiertos');
  producto3: Producto = new Producto('1236', 1500, 5, 'Taper');
  producto4: Producto = new Producto('1237', 87, 60, 'Taper rojo con bandejas de plata y oro por el costado');

  cerrar() {
    this.ipc.ipcRenderer.send('salir');
  }

  getProductos() {
    const consulta = "SELECT * FROM PRODUCTOS;";
    this.ipc.ipcRenderer.send('actualizar', consulta);
    this.ipc.ipcRenderer.on('actualizado', (e, p) => {
      this.listadoProducto = p;
    });
  }

  guardarProducto(unProdcuto: Producto) {

    const consulta = `INSERT INTO PRODUCTOS (codigo,precio,cantidad,descripcion) VALUES ('${unProdcuto.codigo}',${unProdcuto.precio},${unProdcuto.cantidad},'${unProdcuto.descripcion}');`;
    this.ipc.ipcRenderer.send('req', consulta);
    this.ipc.ipcRenderer.on('res', (e, p) => {
      this.getProductos();
    });
  }

  borrarProducto(unProdcuto: Producto) {
    const consulta = `DELETE FROM PRODUCTOS WHERE codigo = '${unProdcuto.codigo}';`;
    this.ipc.ipcRenderer.send('req', consulta);
    this.ipc.ipcRenderer.on('res', (e, p) => {
      this.getProductos();
    });
  }

  editarProducto(unProdcuto: Producto) {
    const consulta = `UPDATE PRODUCTOS SET codigo = '${unProdcuto.codigo}', precio = ${unProdcuto.precio} , cantidad = ${unProdcuto.cantidad} , descripcion = '${unProdcuto.descripcion}' WHERE codigo = '${unProdcuto.codigo}';`;
    this.ipc.ipcRenderer.send('req', consulta);
    this.ipc.ipcRenderer.on('res', (e, p) => {
      this.getProductos();
    });
  }

}
