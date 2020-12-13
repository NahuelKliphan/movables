import { Component, OnInit } from '@angular/core';
import { Skin } from 'src/app/model/Skin';
import { BaseService } from 'src/app/servicio/base.service';
import { EmpresaService } from 'src/app/servicio/empresa.service';

declare var $: any;

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  constructor(private empresa: EmpresaService, private base: BaseService) { }

  ngOnInit() {

    var pantalla = $(window).height();
    $('.contenedor-inicio').css('height', `${pantalla - 250}px`);
    $('.img-size').css('max-width', `${pantalla - 250}px`);
    if (!this.empresa.existeEmpresa(this.empresa.unaEmpresa)) {
      this.empresa.guardarEmpresa(this.empresa.unaEmpresa);
    }
    this.empresa.getEmpresa();
    this.base.getSkin();
  }

  abrirLink(link: string) {
    window.open(link, "Link");
  }

}
