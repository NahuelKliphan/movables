import { Component, OnInit } from '@angular/core';
import { BaseService } from 'src/app/servicio/base.service';
import { Categoria } from 'src/app/model/Categoria';

declare var alertify:any;

@Component({
  selector: 'app-form-borrar-categoria',
  templateUrl: './form-borrar-categoria.component.html',
  styleUrls: ['./form-borrar-categoria.component.css']
})
export class FormBorrarCategoriaComponent implements OnInit {

  constructor(private base: BaseService) { }

  ngOnInit() {
  }

  
  borrar(){
    this.base.borrarCategoria(this.base.unaCategoria);
    alertify.notify('Categoria eliminada', 'success', 5);
    this.vaciarCampos();
  }

  vaciarCampos() {
    this.base.unaCategoria = new Categoria(null, null);
  }

}
