import { Component, OnInit } from '@angular/core';
import { EmpresaService } from 'src/app/servicio/empresa.service';

@Component({
  selector: 'app-form-empresa',
  templateUrl: './form-empresa.component.html',
  styleUrls: ['./form-empresa.component.css']
})
export class FormEmpresaComponent implements OnInit {

  constructor(private empresa: EmpresaService) { }

  ngOnInit() {
    this.empresa.getEmpresa();
  }

  editar() {
    this.empresa.editarEmpresa(this.empresa.unaEmpresa);
  }

}