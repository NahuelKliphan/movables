export class Skin {

    sidebar: string;
    navbar: string;
    tabla: string;
    botonAceptar: string;
    botonCancelar: string;
    botonEditar: string;
    botonEliminar: string;
    botonAgregar: string;
    botonBuscar: string;
    botonSalir: string;
    botonImprimir: string;
    botonVender: string;
    botonGuardar: string;
    botonEstadistica: string;
    iconoCategoria: string;

    constructor(sidebar: string, navbar: string, tabla: string, botonAceptar: string, botonCancelar: string, botonEditar: string, botonEliminar: string, botonAgregar: string, botonBuscar: string, botonSalir: string, botonImprimir: string, botonVender: string, botonGuardar: string, iconoCategoria: string, botonEstadistica: string) {

        this.sidebar = sidebar;
        this.navbar = navbar;
        this.tabla = tabla;
        this.botonAceptar = botonAceptar;
        this.botonCancelar = botonCancelar;
        this.botonEditar = botonEditar;
        this.botonEliminar = botonEliminar;
        this.botonAgregar = botonAgregar;
        this.botonBuscar = botonBuscar;
        this.botonImprimir = botonImprimir;
        this.botonSalir = botonSalir;
        this.botonVender = botonVender;
        this.iconoCategoria = iconoCategoria;
        this.botonGuardar = botonGuardar;
        this.botonEstadistica = botonEstadistica;
    }
}