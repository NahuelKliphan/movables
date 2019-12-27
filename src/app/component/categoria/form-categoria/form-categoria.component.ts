import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/model/Categoria';

@Component({
  selector: 'app-form-categoria',
  templateUrl: './form-categoria.component.html',
  styleUrls: ['./form-categoria.component.css']
})
export class FormCategoriaComponent implements OnInit {

  unaCategoria: Categoria = new Categoria(null,null);

  constructor() { }

  ngOnInit() {
  }

}
