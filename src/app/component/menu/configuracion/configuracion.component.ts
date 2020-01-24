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
  }

  abrirModal(){
    $('#modificarPrecioProducto').modal({ closable: false }).modal('show');
  }

}
