import { Component, OnInit } from '@angular/core';
import { BaseService } from 'src/app/servicio/base.service';

declare var $: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private base: BaseService) { }

  ngOnInit() {

  }

  hide(){
    $('#app .ui.sidebar').sidebar('hide');
  }

  ventaOff(){
    this.base.enVenta = false;
  }
  ventaOn(){
    this.base.enVenta = true;
  }

}
