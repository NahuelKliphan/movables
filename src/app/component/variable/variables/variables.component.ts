import { Component, OnInit } from '@angular/core';
import { BaseService } from 'src/app/servicio/base.service';
import { Variable } from 'src/app/model/Variable';

declare var $: any;

@Component({
  selector: 'app-variables',
  templateUrl: './variables.component.html',
  styleUrls: ['./variables.component.css']
})
export class VariablesComponent implements OnInit {

  constructor(private base: BaseService) { }

  busqueda: string = "";

  ngOnInit() {

    var pantalla = $(window).height();
    pantalla = pantalla - 536;
    $('.tabla').css('height', `${pantalla}px`);
    this.base.getVariables();

  }

  editar(unaVariable: Variable) {
    this.base.unaVariable = unaVariable;
    if (unaVariable.tipo == "color") {
      $("#comboColores").show();
      $("#valorInput").hide();
      $("#valorTag").hide();
    } else {
      $("#comboColores").hide();
      $("#valorInput").show();
      $("#valorTag").show();
    }

    $('#editVariable').modal({ closable: false }).modal('show');
  }

}
