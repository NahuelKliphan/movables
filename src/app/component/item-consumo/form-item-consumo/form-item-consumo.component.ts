import { Component, OnInit } from '@angular/core';
import { ItemConsumo } from 'src/app/model/ItemConsumo';
import { BaseService } from 'src/app/servicio/base.service';
import { ConsumoService } from 'src/app/servicio/consumo.service';
import { ItemConsumoService } from 'src/app/servicio/item-consumo.service';

@Component({
  selector: 'app-form-item-consumo',
  templateUrl: './form-item-consumo.component.html',
  styleUrls: ['./form-item-consumo.component.css']
})
export class FormItemConsumoComponent implements OnInit {

  constructor(private item: ItemConsumoService, private consumo: ConsumoService, private base: BaseService) { }

  ngOnInit() {
  }

  borrar(unItem: ItemConsumo) {
    this.consumo.unConsumo.items = this.consumo.unConsumo.items.filter(i => i.id != unItem.id);
  }

}
