import { Injectable } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { Venta } from '../model/Venta';
import { ProductoService } from './producto.service';
import { ItemService } from './item.service';

declare var alertify: any;

@Injectable({
  providedIn: 'root'
})
export class VentaService {

  constructor(private ipc: ElectronService, private producto: ProductoService, private item: ItemService) { }

  //Venta
  listadoVenta: Venta[] = [];
  unaVenta: Venta = new Venta(null, null, new Date(), 0);
  desde: string = "";
  hasta: string = "";
  totalVentas: number = 0;

  //Metodos de Venta

  getVentas() {
    const consulta = "SELECT * FROM VENTAS ORDER BY fecha DESC LIMIT 100";
    let res = this.ipc.ipcRenderer.sendSync('base', consulta);
    if (res[0] == 'ok') {
      this.listadoVenta = res[1];
    } else {
      alertify.notify('Error ' + res[1].code, 'warning', 5);
    }
  }

  getVentasEntreFechas(desde: string, hasta: string) {
    const consulta = `SELECT * FROM VENTAS WHERE fecha BETWEEN '${desde}' and '${hasta}' ORDER BY fecha DESC`;
    let res = this.ipc.ipcRenderer.sendSync('base', consulta);
    if (res[0] == 'ok') {
      this.listadoVenta = res[1];
    } else {
      alertify.notify('Error ' + res[1].code, 'warning', 5);
    }
  }

  guardarVenta(unaVenta: Venta) {
    this.item.insertItems = "";
    this.producto.updateProductos = "";
    unaVenta.cliente_nombre = ((unaVenta.cliente_nombre != null && unaVenta.cliente_nombre != '') ? "'" + unaVenta.cliente_nombre + "'" : null);
    const consulta = `INSERT INTO VENTAS (cliente_nombre, fecha, total) VALUES (${unaVenta.cliente_nombre},'${new Date().toDateString()}', ${unaVenta.total}) RETURNING ID;`;
    let res = this.ipc.ipcRenderer.sendSync('base', consulta);
    if (res[0] == 'ok') {
      let id = res[1][0].id;
      this.item.listadoItem.forEach(unItem => {
        unItem.id_venta = id;
        this.item.insertItems = this.item.insertItems + `INSERT INTO ITEMS (id_venta, total, codigo, nombre, cantidad, precio) values (${unItem.id_venta},${unItem.total},'${unItem.codigo}','${unItem.nombre}',${unItem.cantidad},${unItem.precio});`;
        this.producto.updateProductos = this.producto.updateProductos + `UPDATE PRODUCTOS P SET cantidad = cantidad - ${unItem.cantidad}  WHERE P.codigo = '${unItem.codigo}';`;
      });
      this.item.guardarItemsActualizarCantidad(this.item.insertItems + this.producto.updateProductos);
      this.producto.updateProductos = "";
      this.item.insertItems = "";
      this.producto.getProductos();
      alertify.notify('Vendido', 'success', 5);
      this.item.listadoItem = [];
    } else {
      alertify.notify('Error ' + res[1].code, 'warning', 5);
    }
  }

  borrarVenta(unaVenta: Venta) {
    const consulta = `DELETE FROM VENTAS WHERE id = '${unaVenta.id}';`;
    let res = this.ipc.ipcRenderer.sendSync('base', consulta);
    if (res[0] == 'ok') {
      alertify.notify('Venta eliminada', 'error', 5);
      if(this.desde != '' && this.hasta != ''){
        this.getVentasEntreFechas(this.desde, this.hasta);
      }else{
        this.getVentas();
      }
      this.actualizarEstadisticasVentas();
    } else {
      alertify.notify('Error ' + res[1].code, 'warning', 5);
    }
  }

  actualizarEstadisticasVentas() {
    this.totalVentas = Number(0);
    this.listadoVenta.forEach(v => {
      this.totalVentas = Number(this.totalVentas) + Number(v.total);
    })
  }
}
