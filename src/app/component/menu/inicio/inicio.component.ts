import { Component, OnInit } from '@angular/core';
import { BaseService } from 'src/app/servicio/base.service';

declare var $: any;

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  constructor(private base: BaseService) { }

  ngOnInit() {

    var pantalla = $(window).height();
    pantalla = pantalla - 250;
    $('.contenedor-inicio').css('height', `${pantalla}px`);

    this.base.getEmpresa();

  }


}
