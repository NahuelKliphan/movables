import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    var pantalla = $(window).height();
    pantalla = pantalla - 135;
    $('.pantalla').css('height', `${pantalla}px`);
    pantalla = pantalla - 240;
    $('.lista-categoria').css('height', `${pantalla}px`);

  }

}
