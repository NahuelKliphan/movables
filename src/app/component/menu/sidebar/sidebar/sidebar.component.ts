import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/servicio/producto.service';
import { BaseService } from 'src/app/servicio/base.service';

declare var $: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private producto: ProductoService, private base: BaseService) { }

  ngOnInit() {
    var pantalla = $(window).height();
    pantalla = pantalla - 700;
    $('.centro-vertical').css('margin-top', `${pantalla}px`);
  }

  hide() {
    $('#app .ui.sidebar').sidebar('hide');
  }

  ventaAndMaterialesOff() {
    this.producto.enVenta = false;
    this.producto.enMateriales = false;
  }

  ventaOff() {
    this.producto.enVenta = false;
  }

  ventaOn() {
    this.producto.enVenta = true;
  }

  showAbout() {
    $('#aboutModal').modal({ closable: false }).modal('show');
  }

}
