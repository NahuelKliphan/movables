import { Component, OnInit } from '@angular/core';
import { BaseService } from 'src/app/servicio/base.service';

@Component({
  selector: 'app-form-modal',
  templateUrl: './form-modal.component.html',
  styleUrls: ['./form-modal.component.css']
})
export class FormModalComponent implements OnInit {

  constructor(private base: BaseService) { }

  ngOnInit() {
  }

  borrar(){
    this.base.borrarProducto(this.base.unProducto);
  }

}
