import { Component, OnInit } from '@angular/core';
import { BaseService } from 'src/app/servicio/base.service';

@Component({
  selector: 'app-lista-item',
  templateUrl: './lista-item.component.html',
  styleUrls: ['./lista-item.component.css']
})
export class ListaItemComponent implements OnInit {

  constructor(private base: BaseService) { }

  ngOnInit() {
  }

}
