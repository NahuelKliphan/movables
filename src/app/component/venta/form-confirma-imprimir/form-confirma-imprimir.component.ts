import { Component, OnInit } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { EmpresaService } from 'src/app/servicio/empresa.service';
import { ItemService } from 'src/app/servicio/item.service';

declare var $: any;

@Component({
  selector: 'app-form-confirma-imprimir',
  templateUrl: './form-confirma-imprimir.component.html',
  styleUrls: ['./form-confirma-imprimir.component.css']
})
export class FormConfirmaImprimirComponent implements OnInit {

  constructor(private item: ItemService, private ipc: ElectronService, private empresa: EmpresaService) { }

  ngOnInit() {
  }

  cancelar() {
    this.item.listadoItem = [];
    $('#formImrpimirVenta').modal('hide');
  }

  imprimir() {
    var data = {
      empresa_nombre: this.empresa.unaEmpresa.nombre,
      empresa_direccion: this.empresa.unaEmpresa.direccion,
      empresa_logo: this.empresa.unaEmpresa.logo_imprimir,
      listado: [...this.item.listadoItem]
    }
    this.ipc.ipcRenderer.sendSync('print', data);
    this.item.listadoItem = [];
    $('#formImrpimirVenta').modal('hide');
  }

}
