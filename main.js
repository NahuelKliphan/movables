const { app, BrowserWindow, ipcMain } = require('electron')
const { Client } = require('pg')
const { autoUpdater } = require("electron-updater")


//Ruta de la app
const ruta = app.getPath('userData');

//Ventana principal.
let win;
let client;

//Actualizar app
autoUpdater.checkForUpdates();

function createWindow() {

  //Crea la ventana principal.
  win = new BrowserWindow({
    width: 1024,
    height: 768,
    backgroundColor: '#ffffff',
    icon: `file://${__dirname}/dist/assets/logo.png`,
    webPreferences: { nodeIntegration: true }
  })

  ConectarBD();

  //Saca la barra de menu fea.
  //win.setMenu(null);

  //Inicia en pantalla completa.
  win.maximize();

  //Carga el index.html de angular
  win.loadURL(`file://${__dirname}/dist/index.html`)

  // Evento cuando se cierra la ventana.
  win.on('closed', function () {
    win = null
  })

}

// Evento que ejecuta el metodo para crear la ventana.
app.on('ready', createWindow)

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

//Autoupdate
autoUpdater.on('checking-for-update', () => {
  console.log('Checking for update...');
})
autoUpdater.on('update-available', (info) => {
  console.log('Update available.');
})
autoUpdater.on('update-not-available', (info) => {
  console.log('Update not available.');
})
autoUpdater.on('error', (err) => {
  console.log('Error in auto-updater. ' + err);
})
autoUpdater.on('download-progress', (progressObj) => {
  let log_message = "Download speed: " + progressObj.bytesPerSecond;
  log_message = log_message + ' - Downloaded ' + progressObj.percent + '%';
  log_message = log_message + ' (' + progressObj.transferred + "/" + progressObj.total + ')';
  console.log(log_message);
})
autoUpdater.on('update-downloaded', (info) => {
  console.log('Update downloaded');
});

autoUpdater.on('update-downloaded', (info) => {
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








