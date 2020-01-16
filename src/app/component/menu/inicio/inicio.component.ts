import { Component, OnInit } from '@angular/core';
import { ElectronService } from 'ngx-electron';

declare var alertify: any;

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  constructor(private ipc: ElectronService) { }

  ngOnInit() {

    var res = this.ipc.ipcRenderer.sendSync('BaseStatus');

    if(res){
      alertify.notify( 'Base de datos conectada ', 'success', 5);
    }else{
      alertify.notify('Error al conectar base de datos ' , 'error', 5);
    }

  }


}
