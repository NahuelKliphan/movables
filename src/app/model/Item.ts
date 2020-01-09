export class Item {

    id: number;
    idventa: number;
    total: number;

    codigo: string;
    nombre: string;
    cantidad: number;
    precio: number;

    constructor(id: number, idventa: number, total: number, codigo: string, nombre: string, cantidad: number, precio: number) {

        this.id = id;
        this.idventa = idventa;
        this.total = total;
        
        this.codigo = codigo;
        this.nombre = nombre;
        this.cantidad = cantidad;
        this.precio = precio;
    }

}