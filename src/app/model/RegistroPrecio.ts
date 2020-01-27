export class RegistroPrecio {

    constructor(id: number, fecha: Date, operacion: string, tipo_valor: string, valor: number, id_categoria: number) {

        this.id = id;
        this.fecha = fecha;
        this.operacion = operacion;
        this.tipo_valor = tipo_valor;
        this.valor = valor;
        this.id_categoria = id_categoria;

    }

    id: number;
    fecha: Date;
    operacion: string;
    tipo_valor: string;
    valor: number;
    id_categoria: number;

}