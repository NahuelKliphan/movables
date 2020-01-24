import { Component, OnInit } from '@angular/core';
import { BaseService } from 'src/app/servicio/base.service';

declare var $: any;
declare var alertify: any;

@Component({
  selector: 'app-modificar-precio-producto',
  templateUrl: './modificar-precio-producto.component.html',
  styleUrls: ['./modificar-precio-producto.component.css']
})
export class ModificarPrecioProductoComponent implements OnInit {

  valor: number = null;
  porcentaje: boolean = true;
  monto: boolean = false;
  aumentar: boolean = true;
  bajar: boolean = false;
  idFiltro: number;

  constructor(private base: BaseService) { }

  ngOnInit() {

    $('#filtrar').dropdown();
    this.base.getCategorias();
    this.base.filtro = '';
    
  }

  aceptar() {

    if(this.formCompleto()){

      let consulta = "UPDATE PRODUCTOS SET PRECIO = PRECIO ";

      if(this.aumentar){
        consulta += '+ ';
      }else{
        consulta += '- ';
      }
  
      if(this.porcentaje){
        this.valor = this.valor/100;
        consulta += `PRECIO * ${this.valor} `;
      }else{
        consulta += `${this.valor} `;
      }
  
      consulta += this.base.filtro + ";"
      this.vaciarForm();
      $('#modificarPrecioProducto').modal('hide');
      this.base.modificarPrecioProducto(consulta);
    }
  }

  cancelar(){
    this.vaciarForm();
    $('#modificarPrecioProducto').modal('hide');
  }

  selectPercent() {
    this.monto = false;
    $("#iconoValor").removeClass("dollar sign");
    $("#iconoValor").addClass("percent");
  }

  selectMotno() {
    this.porcentaje = false;
    $("#iconoValor").removeClass("percent");
    $("#iconoValor").addClass("dollar sign");
  }

  selectAumentar() {
    this.bajar = false;
  }

  selectBajar() {
    this.aumentar = false;
  }

  setFiltro(){
    this.base.setFiltro(this.idFiltro);
  }

  formCompleto() {

    let ret = true;

    //Valor
    if (this.valor == null || !this.base.isNumber(this.valor) || this.valor < 1) {
      ret = false;
      alertify.notify('Valor no válido', 'error', 5);
      return false;
    }

    return ret;

  }

  vaciarForm(){
    this.valor = null;
    this.idFiltro = -1;
    this.base.filtro = '';
  }

}
