const { app, BrowserWindow, ipcMain } = require('electron')
const { Client } = require('pg')
const { autoUpdater } = require("electron-updater")
const isDev = require('electron-is-dev');

//Ruta de la app
const ruta = app.getPath('userData');

//Ventana principal.
let win;
let client;

function createWindow() {

  //Crea la ventana principal.
  win = new BrowserWindow({
    width: 1024,
    height: 768,
    backgroundColor: '#ffffff',
    icon: `file://${__dirname}/dist/assets/logo.png`,
    webPreferences: { nodeIntegration: true },
    show: false
  })

  //Carga el index.html de angular
  win.loadURL(`file://${__dirname}/dist/index.html`)

  if (!isDev) {
    win.setMenu(null);
  }

  ConectarBD();

  // Evento cuando se cierra la ventana.
  win.on('closed', function () {
    win = null
  })

  win.on('resize', function () {

    win.webContents.send('cambio');

  })

}

function createSplash() {
  //Crea la ventana splash
  splash = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    webPreferences: { nodeIntegration: true },
    transparent: true
  })

  splash.loadURL(`file://${__dirname}/splash.html`)

  if (isDev) {
    autoUpdater.checkForUpdates();
  } else {
    autoUpdater.checkForUpdatesAndNotify();
  }

}

// Evento que ejecuta el metodo para crear la ventana.
app.on('ready', function () {

  createWindow();

  createSplash();

  setTimeout(function () {

    splash.close();
    splash = null;
    win.show();
    win.maximize();
    sendStatusBaseToWindow(client._connected);

  }, 5500);

})

// Libera los recursos de la ventana
app.on('window-all-closed', app.quit);
app.on('before-quit', () => {
  win.removeAllListeners('close');
  win.close();
});

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

function sendStatusBaseToWindow(text) {
  win.webContents.send('BaseStatus', text);
}

//Autoupdate

autoUpdater.on('checking-for-update', () => {
  sendStatusToWindow('Buscando Actualizaciones');
})
autoUpdater.on('update-available', (info) => {
  sendStatusToWindow('Actualización disponible');
  ActualizarBase();
})
autoUpdater.on('update-not-available', (info) => {
  sendStatusToWindow('Actualización no disponible');
})
autoUpdater.on('error', (err) => {
  sendStatusToWindow('Error de Actualización ' + err);
})
autoUpdater.on('download-progress', (progressObj) => {
  let log_message = 'Descargando ' + Number.parseFloat(progressObj.percent).toFixed(2) + '%';
  sendStatusToWindow(log_message);
  sendStatuspercentToWindow(progressObj.percent);
})
autoUpdater.on('update-downloaded', (info) => {
  sendStatusToWindow('Actualización descargada');
  autoUpdater.quitAndInstall();
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

function ActualizarBase() {
  ActualizadorINC0006();
}

function ActualizadorINC0006() {
  var consulta = 'alter table categorias ADD COLUMN IF NOT EXISTS descripcion varchar(50);';
  client.query(consulta);
}