import { Component, OnInit } from '@angular/core';
import { BaseService } from 'src/app/servicio/base.service';

@Component({
  selector: 'app-form-venta',
  templateUrl: './form-venta.component.html',
  styleUrls: ['./form-venta.component.css']
})
export class FormVentaComponent implements OnInit {

  constructor(private base: BaseService) { }

  ngOnInit() {
    
  }

}
