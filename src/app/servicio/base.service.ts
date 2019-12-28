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

  //Variables globales
  unProducto:Producto = new Producto(null,null,null,null,null,null,null);
  editar: boolean = false;

  cerrar() {
    this.ipc.ipcRenderer.send('salir');
  }

  verificarCodigo(codigo: string){

    const consulta = `SELECT COUNT(*) FROM PRODUCTOS WHERE codigo = '${codigo}';`;
    let res = this.ipc.ipcRenderer.sendSync('actualizar', consulta);
    if(res[0].count == 0){
      return true;
    }
    else{
      return false;
    }
  }

  getProductos() {

    const consulta = "SELECT * FROM PRODUCTOS ORDER BY OID DESC LIMIT 100";
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

  buscarProducto(cod: string){

    const consulta = `SELECT * FROM PRODUCTOS P WHERE P.codigo ilike '%${cod}%' or p.nombre ilike '%${cod}%' LIMIT 20`;
    let res = this.ipc.ipcRenderer.sendSync('actualizar', consulta);
    this.listadoProducto = res;

  }

  editarProducto(unProdcuto: Producto) {
    const consulta = `UPDATE PRODUCTOS P SET nombre = '${unProdcuto.nombre}', precio = ${unProdcuto.precio} , cantidad = ${unProdcuto.cantidad} , descripcion = '${unProdcuto.descripcion}', idcategoria = 1 , foto = '${unProdcuto.foto}' WHERE P.codigo = '${unProdcuto.codigo}';`;
    this.ipc.ipcRenderer.sendSync('req', consulta);
  }

}


