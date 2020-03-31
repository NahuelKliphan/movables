import { Injectable } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { Empresa } from '../model/Empresa';

declare var alertify: any;

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  constructor(private ipc: ElectronService) { }

  //Empresa
  unaEmpresa = new Empresa(1, "", "", "", "", "", "", "", "");

  //Metodos Empresa

  existeEmpresa(unaEmpresa: Empresa) {
    const consulta = `SELECT * FROM ENTIDADES WHERE id = '${unaEmpresa.id}';`;
    let res = this.ipc.ipcRenderer.sendSync('base', consulta);
    if (res[0] == 'ok') {
      if (res[1].length > 0) {
        return true;
      }
      else {
        return false;
      }
    } else {
      alertify.notify('Error ' + res[1].code, 'warning', 5);
    }
  }

  getEmpresa() {

    const consulta = `SELECT * FROM ENTIDADES WHERE id = 1`;
    let res = this.ipc.ipcRenderer.sendSync('base', consulta);
    if (res[0] == 'ok') {
      this.unaEmpresa = res[1][0];
    } else {
      alertify.notify('Error ' + res[1].code, 'warning', 5);
    }

  }

  guardarEmpresa(unaEmpresa: Empresa) {
    const consulta = `INSERT INTO ENTIDADES (id, nombre, direccion, telefono, mail, facebook, instagram, twitter, facebook_link, instagram_link, twitter_link, logo) 
    values (${unaEmpresa.id},'${unaEmpresa.nombre}','${unaEmpresa.direccion}','${unaEmpresa.telefono}','${unaEmpresa.mail}','${unaEmpresa.facebook}','${unaEmpresa.instagram}','${unaEmpresa.twitter}','${unaEmpresa.facebook_link}','${unaEmpresa.instagram_link}','${unaEmpresa.twitter_link}', '${unaEmpresa.logo}');`;
    let res = this.ipc.ipcRenderer.sendSync('base', consulta);
    if (res[0] == 'ok') {
      alertify.notify('Empresa guardada', 'success', 5);
      this.getEmpresa();
    } else {
      alertify.notify('Error ' + res[1].code, 'warning', 5);
    }
  }

  editarEmpresa(unaEmpresa: Empresa) {
    const consulta = `UPDATE ENTIDADES E SET nombre = '${unaEmpresa.nombre}', direccion = '${unaEmpresa.direccion}', telefono = '${unaEmpresa.telefono}', mail = '${unaEmpresa.mail}', facebook = '${unaEmpresa.facebook}', instagram = '${unaEmpresa.instagram}', twitter = '${unaEmpresa.twitter}', facebook_link = '${unaEmpresa.facebook_link}', instagram_link = '${unaEmpresa.instagram_link}', twitter_link = '${unaEmpresa.twitter_link}', logo = '${unaEmpresa.logo}' WHERE E.id = '${unaEmpresa.id}';`;
    let res = this.ipc.ipcRenderer.sendSync('base', consulta);
    if (res[0] == 'ok') {
      this.getEmpresa();
      alertify.notify('Empresa editada', 'success', 5);
    } else {
      alertify.notify('Error ' + res[1].code, 'warning', 5);
    }
  }
}
