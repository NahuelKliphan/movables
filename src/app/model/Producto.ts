export class Producto {

    codigo: string;
    nombre: string;
    precio_costo: number;
    precio_venta: number;
    cantidad: number;
    descripcion: string;
    foto: string;
    idcategoria: number;

    constructor(codigo: string, nombre: string, precio_costo: number, precio_venta:number, cantidad: number, descripcion: string, foto: string, idcategoria: number) {

        this.codigo = codigo;
        this.nombre = nombre;
        this.precio_costo = precio_costo;
        this.precio_venta = precio_venta;
        this.cantidad = cantidad;
        this.descripcion = descripcion;
        this.foto = foto;
        this.idcategoria = idcategoria;
    }

}