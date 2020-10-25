import { Injectable } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { Variable } from '../model/Variable';
import { Skin } from '../model/Skin';

declare var alertify: any;

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor(private ipc: ElectronService) {

    this.unaSkin = new Skin(
      this.getVariable("Color sidebar"),
      this.getVariable("Color navbar"),
      this.getVariable("Color tabla"),
      this.getVariable("Color boton aceptar"),
      this.getVariable("Color boton cancelar"),
      this.getVariable("Color boton editar"),
      this.getVariable("Color boton eliminar"),
      this.getVariable("Color boton agregar"),
      this.getVariable("Color boton buscar"),
      this.getVariable("Color boton salir"),
      this.getVariable("Color boton imprimir"),
      this.getVariable("Color boton vender"),
      this.getVariable("Color boton guardar"),
      this.getVariable("Color icono categoria"),
      this.getVariable("Color boton estadistica")
    );
  }

  listadoVariable: Variable[] = [];
  unaVariable: Variable = new Variable(null, null, null, null);
  unaSkin: Skin = new Skin(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);

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

  currencyFormat(value) {
    value = Number(value);
    if (!Number.isInteger(value)) {
      value = value.toFixed(2);
    }
    var aux = value.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "1,");
    var partes = aux.split(".");
    var ret = this.replaceAll(partes[0], ',', '.') + ",";
    if (partes[1] != undefined) {
      ret += partes[1];
    } else {
      ret += "00";
    }
    return ret;
  }

  replaceAll(string, search, replace) {
    return string.split(search).join(replace);
  }

  cerrar() {
    this.ipc.ipcRenderer.send('salir');
  }

  refrescar() {
    this.ipc.ipcRenderer.send('refrescar');
  }

  getVersion() {
    return this.ipc.ipcRenderer.sendSync('version');
  }

  getVariable(nombre: string) {

    const consulta = `SELECT VALOR FROM VARIABLES WHERE NOMBRE = '${nombre}';`;
    let res = this.ipc.ipcRenderer.sendSync('base', consulta);
    if (res[0] == 'ok') {
      return res[1][0].valor;
    } else {
      return 'null';
    }

  }

  setVariable(nombre: string, valor: string) {
    const consulta = `UPDATE VARIABLES SET VALOR = '${valor}' WHERE NOMBRE = '${nombre}';`;
    this.ipc.ipcRenderer.sendSync('base', consulta);
  }

  getVariables() {
    const consulta = `SELECT * FROM VARIABLES ORDER BY id ASC`;
    let res = this.ipc.ipcRenderer.sendSync('base', consulta);
    if (res[0] == 'ok') {
      this.listadoVariable = res[1];
    } else {
      alertify.notify('Error ' + res[1].code, 'warning', 5);
    }
  }

   rellenarConCero(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  }

}