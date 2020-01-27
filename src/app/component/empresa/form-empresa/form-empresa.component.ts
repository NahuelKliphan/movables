import { Component, OnInit } from '@angular/core';
import { BaseService } from 'src/app/servicio/base.service';

@Component({
  selector: 'app-form-empresa',
  templateUrl: './form-empresa.component.html',
  styleUrls: ['./form-empresa.component.css']
})
export class FormEmpresaComponent implements OnInit {

  constructor(private base: BaseService) { }

  ngOnInit() {
    if(!this.base.existeEmpresa(this.base.unaEmpresa)){
      this.base.guardarEmpresa(this.base.unaEmpresa);
    }
    this.base.getEmpresa();
  }

  editar(){
    this.base.editarEmpresa(this.base.unaEmpresa);
  }

}
