export class Empresa {

    constructor(id: number, nombre: string, direccion: string, telefono: string, mail: string, cuit: string, facebook: string, instagram: string, twitter: string) {

        this.id = id;
        this.nombre = nombre;
        this.direccion = direccion;
        this.telefono = telefono;
        this.mail = mail;
        this.cuit = cuit;
        this.facebook = facebook;
        this.instagram = instagram;
        this.twitter = twitter;

    }

    id: number;
    nombre: string;
    direccion: string;
    telefono: string;
    cuit: string;
    facebook: string;
    instagram: string;
    twitter: string;
    mail: string;
}