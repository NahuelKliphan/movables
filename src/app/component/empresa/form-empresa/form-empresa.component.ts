import { Component, OnInit } from '@angular/core';
import { EmpresaService } from 'src/app/servicio/empresa.service';
import { BaseService } from 'src/app/servicio/base.service';

@Component({
  selector: 'app-form-empresa',
  templateUrl: './form-empresa.component.html',
  styleUrls: ['./form-empresa.component.css']
})
export class FormEmpresaComponent implements OnInit {

  fileDataLogo: File = null;
  previewUrlLogo: any = null;

  fileDataLogoImpresion: File = null;
  previewUrlLogoImpresion: any = null;

  constructor(private empresa: EmpresaService, private base: BaseService) { }

  ngOnInit() {
    this.empresa.getEmpresa();
  }

  editar() {
    this.empresa.editarEmpresa(this.empresa.unaEmpresa);
  }

  cargarFoto(fileInput: any) {

    this.fileDataLogo = <File>fileInput.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(this.fileDataLogo);
    reader.onload = (_event) => {
      this.previewUrlLogo = reader.result;
      this.empresa.unaEmpresa.logo = this.previewUrlLogo;
      this.editar();
    }
  }

  cargarLogoImpresion(fileInput: any) {

    this.fileDataLogoImpresion = <File>fileInput.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(this.fileDataLogoImpresion);
    reader.onload = (_event) => {
      this.previewUrlLogoImpresion = reader.result;
      this.empresa.unaEmpresa.logo_imprimir = this.previewUrlLogoImpresion;
      this.editar();
    }
  }
}
