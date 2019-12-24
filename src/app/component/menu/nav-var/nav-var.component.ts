import { Component, OnInit } from '@angular/core';
import { BaseService } from 'src/app/servicio/base.service';

declare var $: any;

@Component({
  selector: 'app-nav-var',
  templateUrl: './nav-var.component.html',
  styleUrls: ['./nav-var.component.css']
})
export class NavVarComponent implements OnInit {

  constructor(private base: BaseService) { }

  ngOnInit() {
  }

  abrirMenu() {
    $('.ui.labeled.icon.sidebar')
      .sidebar('toggle')
      ;
  }

  salir(){
    this.base.cerrar();
  }

}
