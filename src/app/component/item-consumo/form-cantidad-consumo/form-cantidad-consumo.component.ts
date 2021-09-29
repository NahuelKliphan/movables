import { Component, OnInit } from '@angular/core';
import { ItemConsumo } from 'src/app/model/ItemConsumo';
import { Producto } from 'src/app/model/Producto';
import { BaseService } from 'src/app/servicio/base.service';
import { ConsumoService } from 'src/app/servicio/consumo.service';
import { ItemConsumoService } from 'src/app/servicio/item-consumo.service';
import { ProductoService } from 'src/app/servicio/producto.service';

declare var $: any;
declare var alertify: any;

@Component({
  selector: 'app-form-cantidad-consumo',
  templateUrl: './form-cantidad-consumo.component.html',
  styleUrls: ['./form-cantidad-consumo.component.css']
})
export class FormCantidadConsumoComponent implements OnInit {

  constructor(private item: ItemConsumoService, private consumo: ConsumoService, private producto: ProductoService, private base: BaseService) { }

  ngOnInit() {
  }

  aceptar() {
    if (this.item.unItem.cantidad > 0) {

      if (this.comprobarCantidad()) {
        $('#formCantidadItemConsumo').modal('hide');
        this.item.unItem = new ItemConsumo(this.item.idItemTemp, 1, this.producto.unProducto.precio_venta * this.item.unItem.cantidad, this.producto.unProducto.codigo, this.producto.unProducto.nombre, this.item.unItem.cantidad, this.producto.unProducto.precio_venta, this.producto.unProducto.precio_costo, this.producto.unProducto.precio_venta * this.item.unItem.cantidad - this.producto.unProducto.precio_costo * this.item.unItem.cantidad);
        this.item.idItemTemp++;
        this.consumo.unConsumo.items.push(this.item.unItem);
        alertify.notify('Item cargado', 'success', 5);
        $('#listaProducto').modal({ closable: false }).modal('show');
        this.vaciarForm();
      } else {
        alertify.notify('No hay suficiente cantidad', 'error', 5);
      }
    } else {
      alertify.notify('Cantidad invalida', 'error', 5);
    }
  }

  cancelar() {
    $('#formCantidadItemConsumo').modal('hide');
    this.vaciarForm();
  }


  vaciarForm() {
    this.item.unItem = new ItemConsumo(null, null, null, null, null, 1, null, null, null);
    this.producto.unProducto = new Producto(null, null, null, null, null, null, null, null, null, true);
    this.producto.busqueda = "";
  }

  cantidad: number = 0;

  comprobarCantidad() {
    this.cantidad = 0;
    this.item.listadoItem.forEach(unItem => {
      if (unItem.codigo == this.producto.unProducto.codigo) {
        this.cantidad = Number(this.cantidad) + Number(unItem.cantidad);
      }
    });
    this.cantidad = Number(this.cantidad) + Number(this.item.unItem.cantidad);
    if (this.producto.unProducto.codigo == '-1' || this.producto.consultarCantidadProducto(this.producto.unProducto) >= this.cantidad) {
      return true;
    } else {
      return false;
    }
  }

}
