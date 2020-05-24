export class Item {

    id: number;
    id_venta: number;

    codigo: string;
    nombre: string;
    cantidad: number;
    precio_venta: number;
    precio_costo: number;
    ganancia: number;
    total: number;

    constructor(id: number, id_venta: number, total: number, codigo: string, nombre: string, cantidad: number, precio_venta: number, precio_costo: number, ganancia: number) {

        this.id = id;
        this.id_venta = id_venta;

        this.codigo = codigo;
        this.nombre = nombre;
        this.cantidad = cantidad;
        this.precio_venta = precio_venta;
        this.precio_costo = precio_costo;
        this.ganancia = ganancia;
        this.total = total;
    }

}