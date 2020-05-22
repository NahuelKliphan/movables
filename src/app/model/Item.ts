export class Item {

    id: number;
    id_venta: number;

    codigo: string;
    nombre: string;
    cantidad: number;
    precio: number;
    total: number;

    constructor(id: number, id_venta: number, total: number, codigo: string, nombre: string, cantidad: number, precio: number) {

        this.id = id;
        this.id_venta = id_venta;
        
        this.codigo = codigo;
        this.nombre = nombre;
        this.cantidad = cantidad;
        this.precio = precio;
        this.total = total;
    }

}