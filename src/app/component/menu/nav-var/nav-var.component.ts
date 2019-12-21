import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-nav-var',
  templateUrl: './nav-var.component.html',
  styleUrls: ['./nav-var.component.css']
})
export class NavVarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  abrirMenu() {
    $('.ui.labeled.icon.sidebar')
      .sidebar('toggle')
      ;
  }

}
