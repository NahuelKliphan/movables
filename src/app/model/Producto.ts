export class Producto {

    codigo: string;
    nombre: string;
    precio: number;
    cantidad: number;
    descripcion: string;
    foto: string;
    idCategoria: number;

    constructor(codigo: string, nombre: string, precio: number, cantidad: number, descripcion: string, foto: string, idCategoria: number) {

        this.codigo = codigo;
        this.nombre = nombre;
        this.precio = precio;
        this.cantidad = cantidad;
        this.descripcion = descripcion;
        this.foto = foto;
        this.idCategoria = idCategoria;
    }

}