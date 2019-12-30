import { Injectable } from '@angular/core';
import { Producto } from '../model/Producto';
import { ElectronService } from 'ngx-electron';
import { Categoria } from '../model/Categoria';

@Injectable({
  providedIn: 'root'
})
export class BaseService {



  constructor(private ipc: ElectronService) {

  }

  //Variables globales

  editar: boolean = false;

  //Producto
  listadoProducto: Producto[] = [];
  unProducto:Producto = new Producto(null,null,null,null,null,null,null);

  //Categoria
  listadoCategoria: Categoria[] = [];
  unaCategoria: Categoria = new Categoria(null,null);

  //Metodos globales
  adaptarDecimal(numero: number){
    return Number(numero.toString().replace(',','.'));
  }

  cerrar() {
    this.ipc.ipcRenderer.send('salir');
  }

  //Metodos de productos

  getProductos() {
    const consulta = "SELECT * FROM PRODUCTOS ORDER BY OID DESC LIMIT 100";
    let res = this.ipc.ipcRenderer.sendSync('base', consulta);
    this.listadoProducto = res;
  }

  verificarCodigo(codigo: string){
    const consulta = `SELECT COUNT(*) FROM PRODUCTOS WHERE codigo = '${codigo}';`;
    let res = this.ipc.ipcRenderer.sendSync('base', consulta);
    if(res[0].count == 0){
      return true;
    }
    else{
      return false;
    }
  }

  buscarProducto(cod: string){
    const consulta = `SELECT * FROM PRODUCTOS P WHERE P.codigo ilike '%${cod}%' or p.nombre ilike '%${cod}%' LIMIT 20`;
    let res = this.ipc.ipcRenderer.sendSync('base', consulta);
    this.listadoProducto = res;
  }

  guardarProducto(unProdcuto: Producto) {
    const consulta = `INSERT INTO PRODUCTOS (codigo,nombre,precio,cantidad,descripcion,foto,idcategoria) VALUES ('${unProdcuto.codigo}','${unProdcuto.nombre}',${unProdcuto.precio},${unProdcuto.cantidad},'${unProdcuto.descripcion}','${unProdcuto.foto}',${unProdcuto.idCategoria});`;
    this.ipc.ipcRenderer.sendSync('base', consulta);
    this.getProductos();
  }

  borrarProducto(unProdcuto: Producto) {
    const consulta = `DELETE FROM PRODUCTOS WHERE codigo = '${unProdcuto.codigo}';`;
    this.ipc.ipcRenderer.sendSync('base', consulta);
    this.getProductos();
  }

  editarProducto(unProdcuto: Producto) {
    const consulta = `UPDATE PRODUCTOS P SET nombre = '${unProdcuto.nombre}', precio = ${this.adaptarDecimal(unProdcuto.precio)} , cantidad = ${unProdcuto.cantidad} , descripcion = '${unProdcuto.descripcion}', idcategoria = 1 , foto = '${unProdcuto.foto}' WHERE P.codigo = '${unProdcuto.codigo}';`;
    this.ipc.ipcRenderer.sendSync('base', consulta);
    this.getProductos();
  }

  //Metodos de Categoria

  getCategorias() {
    const consulta = "SELECT * FROM CATEGORIAS ORDER BY OID DESC";
    let res = this.ipc.ipcRenderer.sendSync('base', consulta);
    this.listadoCategoria = res;
  }

  verificarNombre(nombre: string){
    const consulta = `SELECT COUNT(*) FROM CATEGORIAS WHERE nombre = '${nombre}';`;
    let res = this.ipc.ipcRenderer.sendSync('base', consulta);
    if(res[0].count == 0){
      return true;
    }
    else{
      return false;
    }
  }

  guardarCategoria(unaCategoria: Categoria) {
    const consulta = `INSERT INTO CATEGORIAS (nombre) values ('${unaCategoria.nombre}');`;
    this.ipc.ipcRenderer.sendSync('base', consulta);
    this.getCategorias();
  }

  borrarCategoria(unaCategoria: Categoria) {
    const consulta = `DELETE FROM CATEGORIAS WHERE id = '${unaCategoria.id}';`;
    this.ipc.ipcRenderer.sendSync('base', consulta);
    this.getCategorias();
  }

  editarCategoria(unaCategoria: Categoria) {
    const consulta = `UPDATE CATEGORIAS SET nombre = '${unaCategoria.nombre}' WHERE id = ${unaCategoria.id};`;
    this.ipc.ipcRenderer.sendSync('base', consulta);
    this.getCategorias();
  }

}


