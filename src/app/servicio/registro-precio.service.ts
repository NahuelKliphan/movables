import { Injectable } from '@angular/core';
import { RegistroPrecio } from '../model/RegistroPrecio';
import { ElectronService } from 'ngx-electron';

declare var alertify: any;

@Injectable({
  providedIn: 'root'
})
export class RegistroPrecioService {

  constructor(private ipc: ElectronService) { }

  //RegistroPrecio
  unRegistroPrecio = new RegistroPrecio(null, null, null, null, null, null, null);
  listadoRegistroPrecio: RegistroPrecio[] = [];


  //Metodos Registro Precios

  getRegistroPrecios() {
    const consulta = "SELECT * FROM REGISTRO_PRECIOS WHERE anulada = 'N' ORDER BY id DESC limit 50;";
    let res = this.ipc.ipcRenderer.sendSync('base', consulta);
    if (res[0] == 'ok') {
      this.listadoRegistroPrecio = res[1];
    } else {
      alertify.notify('Error ' + res[1].code, 'warning', 5);
    }
  }
}
