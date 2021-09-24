import { Injectable } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { Consumo } from '../model/Consumo';
import { ItemConsumo } from '../model/ItemConsumo';

declare var alertify: any;

@Injectable({
  providedIn: 'root'
})
export class ItemConsumoService {

  constructor(private ipc: ElectronService) { }

  //Item
  listadoItem: ItemConsumo[] = [];
  unItem: ItemConsumo = new ItemConsumo(null, null, null, null, null, 1, null, null, null);
  insertItems: string = "";
  idItemTemp = 0;
  totalItems: number = 0;
  gananciaItems: number = 0;

  //Metodos de Item

  guardarItemsActualizarCantidad(consulta: string) {
    let res = this.ipc.ipcRenderer.sendSync('base', consulta);
    if (res[0] == 'error') {
      alertify.notify('Error al guardar items' + res[1].code, 'warning', 5);
    }
  }

  getItems(unConsumo: Consumo) {
    const consulta = `SELECT * FROM ITEMS_CONSUMOS WHERE id_consumo = ${unConsumo.id};`;
    let res = this.ipc.ipcRenderer.sendSync('base', consulta);
    if (res[0] == 'ok') {
      this.listadoItem = res[1];
      this.totalItems = Number(0);
      this.gananciaItems = Number(0);
      this.listadoItem.forEach(i => {
        this.totalItems = Number(this.totalItems) + Number(i.total);
        this.gananciaItems = Number(this.gananciaItems) + Number(i.ganancia);
      });
    } else {
      alertify.notify('Error ' + res[1].code, 'warning', 5);
    }
  }
}
