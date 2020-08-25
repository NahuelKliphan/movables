import { Item } from './Item';

export class Venta {

    id: number;
    cliente_nombre: string;
    fecha: Date;
    ganancia: number;
    total: number;
    items: Item[];
    
    constructor(id: number, cliente_nombre: string, fecha: Date, total: number, ganancia: number) {

        this.id = id;
        this.cliente_nombre = cliente_nombre;
        this.fecha = fecha;
        this.ganancia = ganancia;
        this.total = total;
        this.items = [];
    }

}