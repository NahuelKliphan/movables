export class Item {

    id: number;
    idVenta: number;
    total: number;

    codigo: string;
    descripcion: string;
    cantidad: number;
    precio: number;

    constructor(id: number, idVenta: number, total: number, codigo: string, descripcion: string, cantidad: number, precio: number, ) {

        this.id = id;
        this.idVenta = idVenta;
        this.total = total;
        
        this.codigo = codigo;
        this.descripcion = descripcion;
        this.cantidad = cantidad;
        this.precio = precio;
    }

}