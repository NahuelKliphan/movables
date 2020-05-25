import { Component, OnInit } from '@angular/core';
import { BaseService } from 'src/app/servicio/base.service';

declare var $: any;

@Component({
  selector: 'app-edit-variable',
  templateUrl: './edit-variable.component.html',
  styleUrls: ['./edit-variable.component.css']
})
export class EditVariableComponent implements OnInit {

  constructor(private base: BaseService) { }

  ngOnInit() {
  }

  aceptar(){
    $('#editVariable').modal({ closable: false }).modal('hide');
    this.base.setVariable(this.base.unaVariable.nombre, this.base.unaVariable.valor);
  }

  cancelar(){
    $('#editVariable').modal({ closable: false }).modal('hide');
  }

}
