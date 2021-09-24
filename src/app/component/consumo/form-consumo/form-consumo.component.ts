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
  listadoVentasTab: Venta[] = [this.venta.unaVenta];

  ngOnInit() {
    var pantalla = $(window).height();
    pantalla = pantalla - 135;
    $('.pantalla').css('height', `${pantalla}px`);
    pantalla = pantalla - 335;
    $('.tabla-nueva-venta').css('height', `${pantalla}px`);
    // this.venta.unaVenta = new Venta(1, null, new Date(), 0, 0);
    this.producto.enVenta = false;
    this.producto.enMateriales = true;
    this.producto.getProductos();
    $('.tabla-ventas').css('height', `${pantalla}px`);
    this.venta.getVentas();
    this.item.listadoItem = [];
  }

  guardar(unConsumo: Consumo) {
    if (this.formCompleto()) {
      this.consumo.guardarConsumo(unConsumo);
      this.cancelar();
    } else {
      alertify.notify('No hay ningun item', 'error', 5);
    }
  }

  cancelar() {
  }

  abrirLista() {
    this.producto.enMateriales = true;
    this.producto.scanner = (this.base.getVariable('Scanner') == 'S') ? true : false;
    $("#inputCantidad").select();
    $('#listaProducto').modal({ closable: false }).modal('show');
  }

  formCompleto() {
    if (this.consumo.unConsumo.items.length > 0) {
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

  seleccionarVenta(unaVenta: Venta) {


    console.log(unaVenta);
    this.ventaSeleccionada = unaVenta;



  }

}
