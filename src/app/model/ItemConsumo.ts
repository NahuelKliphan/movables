export class ItemConsumo {

    id: number;
    id_consumo: number;

    codigo: string;
    nombre: string;
    cantidad: number;
    precio_venta: number;
    precio_costo: number;
    ganancia: number;
    total: number;

    constructor(id: number, id_consumo: number, total: number, codigo: string, nombre: string, cantidad: number, precio_venta: number, precio_costo: number, ganancia: number) {

        this.id = id;
        this.id_consumo = id_consumo;

        this.codigo = codigo;
        this.nombre = nombre;
        this.cantidad = cantidad;
        this.precio_venta = precio_venta;
        this.precio_costo = precio_costo;
        this.ganancia = ganancia;
        this.total = total;
    }

}