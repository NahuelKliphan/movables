export class Empresa {

    constructor(id: number, nombre: string, direccion: string, telefono: string, mail: string, facebook: string, instagram: string, twitter: string, logo: string, logo_imprimir: string) {

        this.id = id;
        this.nombre = nombre;
        this.direccion = direccion;
        this.telefono = telefono;
        this.mail = mail;
        this.facebook = facebook;
        this.instagram = instagram;
        this.twitter = twitter;
        this.logo = logo;
        this.logo_imprimir = logo_imprimir;
    }

    id: number;
    nombre: string;
    direccion: string;
    telefono: string;
    mail: string;
    facebook: string;
    instagram: string;
    twitter: string;
    facebook_link: string;
    instagram_link: string;
    twitter_link: string;
    logo: string;
    logo_imprimir: string;
}