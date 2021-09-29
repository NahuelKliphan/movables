import { Injectable } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { Consumo } from '../model/Consumo';
import { ItemConsumoService } from './item-consumo.service';
import { ProductoService } from './producto.service';

declare var alertify: any;

@Injectable({
  providedIn: 'root'
})
export class ConsumoService {

  constructor(private ipc: ElectronService, private producto: ProductoService, private item: ItemConsumoService) { }

  unConsumo: Consumo = new Consumo(null, null);

  guardarConsumo(unConsumo: Consumo) {
    this.item.insertItems = "";
    this.producto.updateProductos = "";
    const consulta = `INSERT INTO CONSUMOS (id_venta) VALUES (${unConsumo.id_venta}) RETURNING ID;`;
    let res = this.ipc.ipcRenderer.sendSync('base', consulta);
    if (res[0] == 'ok') {
      let id = res[1][0].id;
      unConsumo.items.forEach(unItem => {
        unItem.id_consumo = id;
        this.item.insertItems = this.item.insertItems + `INSERT INTO ITEMS_CONSUMOS (id_consumo, total, codigo, nombre, cantidad, precio_venta, precio_costo, ganancia) values (${unItem.id_consumo},${unItem.total},'${unItem.codigo}','${unItem.nombre}',${unItem.cantidad},${unItem.precio_venta}, ${unItem.precio_costo}, ${unItem.ganancia});`;
        this.producto.updateProductos = this.producto.updateProductos + `UPDATE PRODUCTOS P SET cantidad = cantidad - ${unItem.cantidad}  WHERE P.codigo = '${unItem.codigo}' and P.es_material = true;`;
      });
      this.item.guardarItemsActualizarCantidad(this.item.insertItems + this.producto.updateProductos);
      this.producto.updateProductos = "";
      this.item.insertItems = "";
      this.producto.getProductos();
      alertify.notify('Vendido', 'success', 5);
      this.unConsumo.items = [];
    } else {
      alertify.notify('Error ' + res[1].code, 'warning', 5);
    }
  }
}
