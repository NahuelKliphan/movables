const { app, BrowserWindow, ipcMain } = require('electron')
const { Client } = require('pg')
const { autoUpdater } = require("electron-updater")
const isDev = require('electron-is-dev');

//Ruta de la app
const ruta = app.getPath('userData');

//Ventana principal.
let win;
let client;
let update = false;

function createWindow() {

  //Crea la ventana principal.
  win = new BrowserWindow({
    width: 1024,
    height: 768,
    backgroundColor: '#ffffff',
    icon: `file://${__dirname}/dist/assets/logo.png`,
    webPreferences: { nodeIntegration: true }
  })

  //Carga el index.html de angular
  win.loadURL(`file://${__dirname}/dist/index.html`)

  if (!isDev) {
    win.setMenu(null);
  }

  ConectarBD();

  win.maximize();

  // Evento cuando se cierra la ventana.
  win.on('closed', function () {
    win = null
  })

  if (isDev) {
    autoUpdater.checkForUpdates();
  } else {
    autoUpdater.checkForUpdatesAndNotify();
  }

}

function createSplash() {
  //Crea la ventana splash
  splash = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    transparent: true
  })

  splash.loadURL(`file://${__dirname}/splash.html`)
}

// Evento que ejecuta el metodo para crear la ventana.
app.on('ready', function () {

  createSplash();

  setTimeout(function () {

    splash.hide();
    splash = null;
    createWindow();

  }, 5000);

})

// Sale cuando todas las ventanas estan cerradas.
app.on('window-all-closed', function () {
  // Proceso especifico de macOS.
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // Proceso especifico de macOS.
  if (win === null) {
    createWindow()
  }
})

ipcMain.on('salir', () => {
  DesconectarBD();
  app.quit();
})

function sendStatusToWindow(text) {
  win.webContents.send('update', text);
}

function sendStatuspercentToWindow(text) {
  win.webContents.send('percent', text);
}

//Autoupdate

autoUpdater.on('checking-for-update', () => {
  sendStatusToWindow('Buscando Actualizaciones');
})
autoUpdater.on('update-available', (info) => {
  sendStatusToWindow('Actualización disponible');
  update = true;
})
autoUpdater.on('update-not-available', (info) => {
  sendStatusToWindow('Actualización no disponible');
})
autoUpdater.on('error', (err) => {
  sendStatusToWindow('Error de Actualización' + err);
})
autoUpdater.on('download-progress', (progressObj) => {
  let log_message = 'Descargando ' + Number.parseFloat(progressObj.percent).toFixed(2) + '%';
  sendStatusToWindow(log_message);
  sendStatuspercentToWindow(progressObj.percent);
})
autoUpdater.on('update-downloaded', (info) => {
  sendStatusToWindow('Actualización descargada');
});

autoUpdater.on('update-downloaded', (info) => {
  if (update == true) {
    autoUpdater.quitAndInstall();
  }
});

//Metodo para conectar la base de datos.
async function ConectarBD() {

  client = new Client(LeerBase())

  await client.connect(err => {
    if (err) {
      console.error('Error al conectar Base de datos.', err.stack);
    } else {
      console.log('Base de datos conectada.');
    }
  })

}

//Metodos consulta BD

ipcMain.on('BaseStatus', (e) => {

  e.returnValue = client._connected;

});

ipcMain.on('base', (e, consulta) => {

  client.query(consulta, function (err, res) {

    if (err) {
      e.returnValue = ['error', err];
    } else {
      e.returnValue = ['ok', res.rows];
    }

  });

});

async function DesconectarBD() {
  await client.end()
}

function LeerBase() {
  const fs = require("fs");
  let data = fs.readFileSync(ruta + '\\base.txt').toString().split(';')
  return JSON.parse(data[0]);
}