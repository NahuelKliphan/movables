import { Component, OnInit } from '@angular/core';
import { EmpresaService } from 'src/app/servicio/empresa.service';

@Component({
  selector: 'app-form-empresa',
  templateUrl: './form-empresa.component.html',
  styleUrls: ['./form-empresa.component.css']
})
export class FormEmpresaComponent implements OnInit {

  fileData: File = null;
  previewUrl: any = null;

  constructor(private empresa: EmpresaService) { }

  ngOnInit() {
    this.empresa.getEmpresa();
  }

  editar() {
    this.empresa.editarEmpresa(this.empresa.unaEmpresa);
  }

  cargarFoto(fileInput: any) {

    this.fileData = <File>fileInput.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = (_event) => {
      this.previewUrl = reader.result;
      this.empresa.unaEmpresa.logo = this.previewUrl;
      this.editar();
    }
  }

}