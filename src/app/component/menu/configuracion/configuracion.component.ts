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

  ocultarTodo() {
    $("#itemProducto").removeClass("active");
    $("#itemEmpresa").removeClass("active");
    $("#itemVariables").removeClass("active");
    $("#segmentoProducto").hide();
    $("#segmentoEmpresa").hide();
    $("#segmentoVariable").hide();
  }

  mostrarEmpresa() {
    this.ocultarTodo();
    $("#itemEmpresa").addClass("active");
    $("#segmentoEmpresa").show();
  }

  mostrarProducto() {
    this.ocultarTodo();
    $("#itemProducto").addClass("active");
    $("#segmentoProducto").show();
  }

  mostrarVariable() {
    this.ocultarTodo();
    $("#itemVariables").addClass("active");
    $("#segmentoVariable").show();
  }
  
}
