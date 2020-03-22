import { Component, OnInit } from '@angular/core';
import { EmpresaService } from 'src/app/servicio/empresa.service';

declare var $: any;

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  constructor(private empresa: EmpresaService) { }

  ngOnInit() {

    var pantalla = $(window).height();
    pantalla = pantalla - 250;
    $('.contenedor-inicio').css('height', `${pantalla}px`);

    if (!this.empresa.existeEmpresa(this.empresa.unaEmpresa)) {
      this.empresa.guardarEmpresa(this.empresa.unaEmpresa);
    }

    this.empresa.getEmpresa();

  }

  abrirLink(link: string) {
    window.open(link, "Link");
  }

}
