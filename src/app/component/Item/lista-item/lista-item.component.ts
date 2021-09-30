import { Component, OnInit } from '@angular/core';
import { BaseService } from 'src/app/servicio/base.service';
import { ItemService } from 'src/app/servicio/item.service';
import { ElectronService } from 'ngx-electron';
import { EmpresaService } from 'src/app/servicio/empresa.service';
import { VentaService } from 'src/app/servicio/venta.service';

declare var alertify: any;

@Component({
  selector: 'app-lista-item',
  templateUrl: './lista-item.component.html',
  styleUrls: ['./lista-item.component.css']
})
export class ListaItemComponent implements OnInit {

  constructor(private item: ItemService, private base: BaseService, private ipc: ElectronService, private empresa: EmpresaService, private venta: VentaService) { }

  ngOnInit() {
  }

  imprimir() {

    var data = {
      fecha: this.venta.unaVenta.fecha,
      cliente_nombre: this.venta.unaVenta.cliente_nombre,
      empresa_nombre: this.empresa.unaEmpresa.nombre,
      empresa_direccion: this.empresa.unaEmpresa.direccion,
      empresa_logo: this.empresa.unaEmpresa.logo_imprimir,
      listado: [...this.item.listadoItem]
    }
    this.ipc.ipcRenderer.sendSync('print', data);
  }

}
