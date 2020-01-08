export class Venta {

    id: number;
    clientenombre: string;
    fecha: Date;
    total: number;

    constructor(id: number, clientenombre: string, fecha: Date, total: number) {

        this.id = id;
        this.clientenombre = clientenombre;
        this.fecha = fecha;
        this.total = total;
    }

}