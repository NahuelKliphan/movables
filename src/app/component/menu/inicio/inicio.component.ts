import { Component, OnInit } from '@angular/core';
import { ElectronService } from 'ngx-electron';

declare var $: any;

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  constructor(private ipc: ElectronService) { }

  ngOnInit() {

    var pantalla = $(window).height();
    pantalla = pantalla - 250;
    $('.contenedor-inicio').css('height', `${pantalla}px`);

  }


}
