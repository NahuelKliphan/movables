import { Component, OnInit } from '@angular/core';
import { ItemService } from 'src/app/servicio/item.service';
import { BaseService } from 'src/app/servicio/base.service';

@Component({
  selector: 'app-lista-item',
  templateUrl: './lista-item.component.html',
  styleUrls: ['./lista-item.component.css']
})
export class ListaItemComponent implements OnInit {

  constructor(private item: ItemService, private base: BaseService) { }

  ngOnInit() {
  }

  imprimir() {
    alert('Pendiente');
  }

}
