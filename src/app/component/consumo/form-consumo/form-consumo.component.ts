import { Component, OnInit } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { Consumo } from 'src/app/model/Consumo';
import { Producto } from 'src/app/model/Producto';
import { Venta } from 'src/app/model/Venta';
import { BaseService } from 'src/app/servicio/base.service';
import { ConsumoService } from 'src/app/servicio/consumo.service';
import { EmpresaService } from 'src/app/servicio/empresa.service';
import { ItemService } from 'src/app/servicio/item.service';
import { ProductoService } from 'src/app/servicio/producto.service';
import { VentaService } from 'src/app/servicio/venta.service';

declare var $: any;
declare var alertify: any;

@Component({
  selector: 'app-form-consumo',
  templateUrl: './form-consumo.component.html',
  styleUrls: ['./form-consumo.component.css']
})

export class FormConsumoComponent implements OnInit {

  constructor(private venta: VentaService, private item: ItemService, private producto: ProductoService, private base: BaseService, private ipc: ElectronService, private empresa: EmpresaService, private consumo: ConsumoService) { }

  ventaSeleccionada: Venta = new Venta(null, null, null, null, null);
  ventaPreSeleccionada: Venta = new Venta(null, null, null, null, null);
  todasLasVentas: boolean = false;
  step: number = 1;

  ngOnInit() {
    var pantalla = $(window).height();
    pantalla = pantalla - 135;
    $('.pantalla').css('height', `${pantalla}px`);
    $('.tabla-nueva-consumo').css('height', `${pantalla - 300}px`);
    $('.tabla-ventas').css('height', `${pantalla - 200}px`);
    this.producto.enVenta = false;
    this.producto.enMateriales = true;
    this.producto.getProductos();
    if (this.todasLasVentas) {
      this.venta.getVentas();
    } else {
      this.venta.getVentasSinMateriales();
    }
    this.item.listadoItem = [];
  }

  guardar() {
    this.consumo.unConsumo.id_venta = this.ventaSeleccionada.id;
    if (this.formCompleto()) {
      this.consumo.guardarConsumo(this.consumo.unConsumo);
      this.cancelar();
    } else {
      alertify.notify('No hay ningun item', 'error', 5);
    }
  }

  cancelar() {
    this.ventaSeleccionada = new Venta(null, null, null, null, null);
    this.ventaPreSeleccionada = new Venta(null, null, null, null, null);
    this.step = 1;
    this.consumo.unConsumo.items = [];
  }

  abrirLista() {
    this.producto.enMateriales = true;
    this.producto.scanner = (this.base.getVariable('Scanner') == 'S') ? true : false;
    $("#inputCantidad").select();
    $('#listaProducto').modal({ closable: false }).modal('show');
  }

  formCompleto() {
    if (this.consumo.unConsumo.items.length > 0 && this.ventaSeleccionada) {
      return true;
    }
    else {
      return false;
    }
  }

  agregarItem() {
    this.producto.unProducto = new Producto(-1, "-1", "", null, null, null, "", "", null, true);
    $('#cargaItemModal').modal({ closable: false }).modal('show');
  }

  seleccionarPreVenta(unaVenta: Venta) {
    this.ventaPreSeleccionada = unaVenta;
  }

  seleccionarVenta() {
    this.ventaSeleccionada = this.ventaPreSeleccionada;
    if (this.ventaSeleccionada) {
      this.step = 2;
    } else {
      alertify.notify('No hay ninguna venta seleccionada', 'error', 5);
    }
  }

  buscarItems(unaVenta: Venta) {
    this.item.getItems(unaVenta);
    $("#ventanaItems").modal("show");
  }

  mostrarTodasLasVentas(todasLasVentas) {
    if (todasLasVentas) {
      this.venta.getVentas();
    } else {
      this.venta.getVentasSinMateriales();
    }
  }

  volverStep1() {
    this.step = 1;
  }

}
