import { ItemConsumo } from './ItemConsumo';

export class Consumo {

    id: number;
    id_venta: number;
    items: ItemConsumo[];
    
    constructor(id: number, id_venta: number) {
        this.id = id;
        this.id_venta = id_venta;
        this.items = [];
    }

}