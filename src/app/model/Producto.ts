export class Producto {

    id: number;
    codigo: string;
    nombre: string;
    precio_costo: number;
    precio_venta: number;
    cantidad: number;
    descripcion: string;
    foto: string;
    id_categoria: number;

    constructor(id: number, codigo: string, nombre: string, precio_costo: number, precio_venta: number, cantidad: number, descripcion: string, foto: string, id_categoria: number) {

        this.id = id;
        this.codigo = codigo;
        this.nombre = nombre;
        this.precio_costo = precio_costo;
        this.precio_venta = precio_venta;
        this.cantidad = cantidad;
        this.descripcion = descripcion;
        this.foto = foto;
        this.id_categoria = id_categoria;
    }

}