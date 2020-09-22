import { Component, OnInit } from '@angular/core';
import { BaseService } from 'src/app/servicio/base.service';

declare var $: any;
declare var alertify: any;

@Component({
  selector: 'app-edit-variable',
  templateUrl: './edit-variable.component.html',
  styleUrls: ['./edit-variable.component.css']
})
export class EditVariableComponent implements OnInit {

  constructor(private base: BaseService) { }

  ngOnInit() {
    $("#comboColores").dropdown({ fullTextSearch: true });
  }

  aceptar() {
    $('#editVariable').modal({ closable: false }).modal('hide');
    var valor = null;
    if (this.base.unaVariable.tipo == "color") {
      valor = $("#comboColores").data("value");
      if (valor != undefined) {
        this.base.setVariable(this.base.unaVariable.nombre, valor);
        this.base.getVariables();
        alertify.notify("Reiniciar para ver los cambios", 'warning', 10);
      }
    } else {
      this.base.setVariable(this.base.unaVariable.nombre, this.base.unaVariable.valor);
    }

  }

  cancelar() {
    $('#editVariable').modal({ closable: false }).modal('hide');
  }

}
