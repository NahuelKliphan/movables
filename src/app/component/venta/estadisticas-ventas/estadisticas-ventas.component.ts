import { Component, OnInit } from '@angular/core';
import { BaseService } from 'src/app/servicio/base.service';
import { VentaService } from 'src/app/servicio/venta.service';
import { Chart } from 'node_modules/chart.js/dist/Chart.min.js';

declare var $: any;

@Component({
  selector: 'app-estadisticas-ventas',
  templateUrl: './estadisticas-ventas.component.html',
  styleUrls: ['./estadisticas-ventas.component.css']
})
export class EstadisticasVentasComponent implements OnInit {

  constructor(private venta: VentaService, private base: BaseService) { }

  year: string = new Date().getFullYear().toString();

  ngOnInit() {
    this.mostrarEstadisticas();
  }

  mostrarEstadisticas() {

    var estadisticas = this.venta.getEstadisticas(this.year);
    var canvas = <HTMLCanvasElement>document.getElementById('graficoVentas');
    var ctx = canvas.getContext('2d');
    var meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    var mesesAmostrar = [];
    var montosPorMes = [];
    this.venta.totalVentas = 0;
    this.venta.totalCostos = 0;
    this.venta.totalGanancias = 0;
    estadisticas.forEach(element => {
      this.venta.totalVentas += Number(element.ventas);
      this.venta.totalCostos += Number(element.costos);
      this.venta.totalGanancias += Number(element.ventas);
      mesesAmostrar.push(meses[element.mes]);
      montosPorMes.push(element.cantidad);
    });
    var chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: mesesAmostrar,
        datasets: [{
          label: 'Ventas',
          backgroundColor: 'transparent',
          borderColor: 'green',
          data: montosPorMes
        }]
      },
      options: {}
    });

  }

  actualizar(signo: string) {

    if (signo == '+') {
      this.year = (Number(this.year) + 1).toString();
    } else {
      this.year = (Number(this.year) - 1).toString();
    }
    if (Number(this.year) >= new Date().getFullYear()) {
      $("#btnSumarYear").addClass('disabled');
    } else {
      $("#btnSumarYear").removeClass('disabled');
    }
    this.mostrarEstadisticas();

  }

}
