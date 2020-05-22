export class Venta {

    id: number;
    cliente_nombre: string;
    fecha: Date;
    total: number;

    constructor(id: number, cliente_nombre: string, fecha: Date, total: number) {

        this.id = id;
        this.cliente_nombre = cliente_nombre;
        this.fecha = fecha;
        this.total = total;
    }

}