export class Venta {

    id: number;
    clienteNombre: string;
    fecha: Date;
    total: number;

    constructor(id: number, clienteNombre: string, fecha: Date, total: number) {

        this.id = id;
        this.clienteNombre = clienteNombre;
        this.fecha = fecha;
        this.total = total;
    }

}