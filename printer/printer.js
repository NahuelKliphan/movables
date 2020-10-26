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
    switch (data.nombre) {
        case 'venta': {
            contenido = generarHtmlVenta(data);
            break;
        }
        case 'ventas': {
            contenido = generarHtmlVentas(data);
            break;
        }
    }
    if (contenido != "") {
        imprimir(printerWindow, contenido);
    }
}

function generarHtmlVenta(data) {
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

function generarHtmlVentas(data) {
    var html = `<!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Venta</title>
    <link rel="stylesheet" href="metro.min.css">
    </head>
    <body>
    <table class='table striped'>
    <thead>
    <tr>
    <th>Nro</th>
    <th>Fecha</th>
    <th>Total</th>
    </tr>
    </thead>
    <tbody>`;
    var total = 0;
    data.listado.forEach(venta => {
        total += Number(venta.total);
        html += `<tr>
        <td>${venta.id}</td>
        <td>${replaceAll(venta.fecha.split("T")[0], "-", "/")}</td>
        <td>$${currencyFormat(venta.total)}</td>
        </tr>`;
    });
    html += `</tbody>
    <tfoot>
    <tr>
    <td></td>
    <td>Total:</td>
    <td>$${currencyFormat(total)}</td>
    </tr>
    </tfoot>
    </table>
    </body>
    </html>`;
    return html;
}

module.exports.imprimirDelegator = imprimirDelegator;
