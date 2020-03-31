import { Injectable } from '@angular/core';
import { ElectronService } from 'ngx-electron';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor(private ipc: ElectronService) {}
  
  //Metodos globales
  adaptarDecimal(numero: number) {
    return Number(numero.toString().replace(',', '.'));
  }

  isNumber(value: string | number): boolean {
    return ((value != null) &&
      (value !== '') &&
      !isNaN(Number(value.toString())));
  }

  redondearPrecio(multiplo: number, monto: number) {

    var resto = monto % multiplo;
    var ret = null;
    if (this.isNumber(monto) && this.isNumber(multiplo)) {
      if (resto == 0) {
        ret = monto;
      } else {
        if (resto <= multiplo / 2) {
          ret = parseFloat(monto.toString()) - resto;
        } else {
          ret = parseFloat(monto.toString()) + (multiplo - resto);
        }
      }
    }
    return ret;
  }

  cerrar() {
    this.ipc.ipcRenderer.send('salir');
  }

}