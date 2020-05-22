import { Injectable } from '@angular/core';
import { Item } from '../model/Item';
import { ElectronService } from 'ngx-electron';
import { Venta } from '../model/Venta';

declare var alertify: any;

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private ipc: ElectronService) { }

  //Item
  listadoItem: Item[] = [];
  unItem: Item = new Item(null, null, null, null, null, 1, null);
  insertItems: string = "";
  idItemTemp = 0;
  totalItems: number = 0;

  //Metodos de Item

  guardarItemsActualizarCantidad(consulta: string) {
    let res = this.ipc.ipcRenderer.sendSync('base', consulta);
    if (res[0] == 'error') {
      alertify.notify('Error al guardar items' + res[1].code, 'warning', 5);
    }
  }

  getItems(unaVenta: Venta) {
    const consulta = `SELECT * FROM ITEMS WHERE id_venta = ${unaVenta.id};`;
    let res = this.ipc.ipcRenderer.sendSync('base', consulta);
    if (res[0] == 'ok') {
      this.listadoItem = res[1];
      this.totalItems = Number(0);
      this.listadoItem.forEach(i => {
        this.totalItems = Number(this.totalItems) + Number(i.total);
      });
    } else {
      alertify.notify('Error ' + res[1].code, 'warning', 5);
    }
  }

}