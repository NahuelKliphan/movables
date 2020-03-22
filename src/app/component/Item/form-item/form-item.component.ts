import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/model/Item';
import { ItemService } from 'src/app/servicio/item.service';
import { VentaService } from 'src/app/servicio/venta.service';

@Component({
  selector: 'app-form-item',
  templateUrl: './form-item.component.html',
  styleUrls: ['./form-item.component.css']
})
export class FormItemComponent implements OnInit {

  constructor(private item: ItemService, private venta: VentaService) { }

  ngOnInit() {
  }

  borrar(unItem: Item) {
    this.item.listadoItem = this.item.listadoItem.filter(i => i.id != unItem.id);
    this.venta.unaVenta.total = 0;
    this.item.listadoItem.forEach(i => { this.venta.unaVenta.total = this.venta.unaVenta.total + i.total; })
  }

}