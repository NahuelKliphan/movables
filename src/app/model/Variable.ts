export class Variable {

    id: number;
    nombre: string;
    valor: string;
    tipo: string;

    constructor(id: number, nombre: string, valor: string, tipo: string) {

        this.id = id;
        this.nombre = nombre;
        this.valor = valor;
        this.tipo = tipo;
    }
}