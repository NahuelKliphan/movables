import { Injectable } from '@angular/core';
import { Categoria } from '../model/Categoria';
import { ElectronService } from 'ngx-electron';

declare var alertify: any;

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(private ipc: ElectronService) { }

  //Categoria
  listadoNombreCategoria: string[] = [];
  listadoCategoria: Categoria[] = [];
  unaCategoria: Categoria = new Categoria(null, null);
  editar: boolean = false;

  //Metodos de Categoria

  getCategorias() {
    const consulta = "SELECT * FROM CATEGORIAS ORDER BY OID DESC";
    let res = this.ipc.ipcRenderer.sendSync('base', consulta);
    if (res[0] == 'ok') {
      this.listadoCategoria = res[1];
      this.listadoCategoria.forEach(c => { this.listadoNombreCategoria[c.id] = c.nombre });
    } else {
      alertify.notify('Error ' + res[1].code, 'warning', 5);
    }
  }

  verificarNombre(nombre: string) {
    const consulta = `SELECT * FROM CATEGORIAS WHERE nombre = '${nombre}';`;
    let res = this.ipc.ipcRenderer.sendSync('base', consulta);
    if (res[0] == 'ok') {
      if (res[1].length == 0) {
        return true;
      }
      else {
        alertify.notify('Nombre repetido', 'error', 5);
        return false;
      }
    } else {
      alertify.notify('Error ' + res[1].code, 'warning', 5);
    }
  }

  guardarCategoria(unaCategoria: Categoria) {
    const consulta = `INSERT INTO CATEGORIAS (nombre) values ('${unaCategoria.nombre}');`;
    let res = this.ipc.ipcRenderer.sendSync('base', consulta);
    if (res[0] == 'ok') {
      alertify.notify('Categoria agregada', 'success', 5);
      this.getCategorias();
    } else {
      alertify.notify('Error ' + res[1].code, 'warning', 5);
    }
  }

  borrarCategoria(unaCategoria: Categoria) {
    const consulta = `DELETE FROM CATEGORIAS WHERE id = '${unaCategoria.id}';`;
    let res = this.ipc.ipcRenderer.sendSync('base', consulta);
    if (res[0] == 'ok') {
      alertify.notify('Categoria eliminada', 'error', 5);
      this.getCategorias();
    } else {
      alertify.notify('Error ' + res[1].code, 'warning', 5);
    }
  }

  editarCategoria(unaCategoria: Categoria) {
    const consulta = `UPDATE CATEGORIAS SET nombre = '${unaCategoria.nombre}' WHERE id = ${unaCategoria.id};`;
    let res = this.ipc.ipcRenderer.sendSync('base', consulta);
    if (res[0] == 'ok') {
      alertify.notify('Categoria editada', 'success', 5);
      this.getCategorias();
    } else {
      alertify.notify('Error ' + res[1].code, 'warning', 5);
    }
  }
}
