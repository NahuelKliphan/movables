import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css']
})
export class ConfiguracionComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    var pantalla = $(window).height();
    pantalla = pantalla - 135;
    $('.pantalla').css('height', `${pantalla}px`);
  }

  abrirModal(){
    $('#modificarPrecioProducto').modal({ closable: false }).modal('show');
  }

}
