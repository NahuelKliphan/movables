const { app, ipcMain, shell } = require('electron');
const ruta = app.getPath('userData') + "\\comprobante.pdf";
const fs = require("fs");

function imprimir(printerWindow, contenido) {
    printerWindow.webContents.send("printPDF", contenido);
    ipcMain.on("readyToPrintPDF", (event) => {
        printerWindow.webContents.printToPDF(pdfSettings()).then(data => {
            fs.writeFile(ruta, data, function (error) {
                if (error) {
                    console.log(error);
                }
                shell.openItem(ruta)
            })
        }).catch((error) => {
            console.log(error);
        })
    });
}

function pdfSettings() {
    var option = {
        marginsType: 0,
        printBackground: true,
        printSelectionOnly: false,
        landscape: false,
        pageSize: 'A4',
        scaleFactor: 100
    };
    return option;
}

function replaceAll(string, search, replace) {
    return string.split(search).join(replace);
}

function currencyFormat(value) {
    value = Number(value);
    if (!Number.isInteger(value)) {
        value = value.toFixed(2);
    }
    var aux = value.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
    var partes = aux.split(".");
    var ret = replaceAll(partes[0], ',', '.') + ",";
    if (partes[1] != undefined) {
        ret += partes[1];
    } else {
        ret += "00";
    }
    return ret;
}

function imprimirDelegator(printerWindow, data) {
    var contenido = "";
    var tipoImpresion = "58mm";
    switch (tipoImpresion) {
        case '58mm': {
            contenido = generarHtmlVenta58mm(data);
            break;
        }
        case 'a4': {
            contenido = generarHtmlVentaA4(data);
            break;
        }
    }
    if (contenido != "") {
        imprimir(printerWindow, contenido);
    }
}

function generarHtmlVentaA4(data) {
    var html = `
    <h2>${data.empresa_nombre}</h2>
    <table class='table striped'>
    <thead>
    <tr>
    <th>Nombre</th>
    <th style="text-align: center;">Cantidad</th>
    <th>Precio</th>
    <th>Total</th>
    </tr>
    </thead>
    <tbody>`;
    var total = 0;
    data.listado.forEach(item => {
        total += Number(item.total);
        html += `<tr>
        <td>${item.nombre}</td>
        <td style="text-align: center;">${item.cantidad}</td>
        <td>$${currencyFormat(item.precio_venta)}</td>
        <td>$${currencyFormat(item.total)}</td>
        </tr>`;
    });
    html += `</tbody>
    <tfoot>
    <tr>
    <td></td>
    <td></td>
    <td>Total:</td>
    <td>$${currencyFormat(total)}</td>
    </tr>
    </tfoot>
    </table>`;
    return html;
}

function generarHtmlVenta58mm(data) {

    const fecha = new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString('en-US',  { hour12: false,  hour: "numeric",  minute: "numeric" });
    
    var html = `<div class="ticket">
        <img src="https://yt3.ggpht.com/-3BKTe8YFlbA/AAAAAAAAAAI/AAAAAAAAAAA/ad0jqQ4IkGE/s900-c-k-no-mo-rj-c0xffffff/photo.jpg"
            alt="Logotipo">
        <p class="centrado">${data.empresa_nombre}
            <br>${data.empresa_direccion}
            <br>${fecha}
        </p>
        <table>
            <thead>
                <tr>
                    <th class="cantidad">CAN</th>
                    <th class="producto">PRODUCTO</th>
                    <th class="precio">$$</th>
                </tr>
            </thead>
            <tbody>`;
            var total = 0;
            data.listado.forEach(item => {
                total += Number(item.total);
                html += `<tr>
                <td class="cantidad">${item.cantidad}</td>
                <td class="producto">${item.nombre}</td>
                <td class="precio">$${currencyFormat(item.total)}</td>
                </tr>`;
            });
            html += `<tr>
            <td class="cantidad"></td>
            <td class="producto">TOTAL</td>
            <td class="precio">${currencyFormat(total)}</td>
            </tr>
            </tbody>
        </table>
        <p class="centrado">¡GRACIAS POR SU COMPRA! </p>
    </div>`;

    return html;
}

module.exports.imprimirDelegator = imprimirDelegator;
