export class Producto{

    codigo: string;
    precio: number;
    cantidad: number;
    descripcion: string;

    constructor(codigo: string, precio: number, cantidad: number, descripcion: string){

        this.codigo = codigo;
        this.precio = precio;
        this.cantidad = cantidad;
        this.descripcion = descripcion;
    }

}