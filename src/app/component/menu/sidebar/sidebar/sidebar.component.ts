import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/servicio/producto.service';

declare var $: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private producto: ProductoService) { }

  ngOnInit() {

    var pantalla = $(window).height();
    pantalla = pantalla - 700;
    $('.centro-vertical').css('margin-top', `${pantalla}px`);

  }

  hide(){
    $('#app .ui.sidebar').sidebar('hide');
  }

  ventaOff(){
    this.producto.enVenta = false;
  }
  ventaOn(){
    this.producto.enVenta = true;
  }

}
