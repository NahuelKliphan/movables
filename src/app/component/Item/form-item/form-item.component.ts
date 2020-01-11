import { Component, OnInit } from '@angular/core';
import { BaseService } from 'src/app/servicio/base.service';
import { Item } from 'src/app/model/Item';

@Component({
  selector: 'app-form-item',
  templateUrl: './form-item.component.html',
  styleUrls: ['./form-item.component.css']
})
export class FormItemComponent implements OnInit {

  constructor(private base: BaseService) { }

  ngOnInit() {
  }

  borrar(unItem: Item){
    this.base.listadoItem = this.base.listadoItem.filter(i => i.id != unItem.id);
  }

}
