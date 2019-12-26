const { app, BrowserWindow, ipcMain } = require('electron')
const { Client } = require('pg')

//Ventana principal.
let win;
let client;

//Base de datos.
const config = {
  user: 'postgres',
  host: 'localhost',
  database: 'stock',
  password: 'postgres',
  port: 5432,
}

function createWindow() {
  //Crea la ventana principal.
  win = new BrowserWindow({
    width: 1024,
    height: 768,
    backgroundColor: '#ffffff',
    icon: `file://${__dirname}/dist/assets/logo.png`,
    webPreferences: { nodeIntegration: true }
  })

  //Saca la barra de menu fea.
  //win.setMenu(null);

  //Carga el index.html de angular
  win.loadURL(`file://${__dirname}/dist/index.html`)

  // Evento cuando se cierra la ventana.
  win.on('closed', function () {
    win = null
  })

  ConectarBD();

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

//Metodo para conectar la base de datos.
async function ConectarBD() {

  client = new Client(config)

  await client.connect(err => {
    if (err) {
      console.error('Error al conectar Base de datos.', err.stack)
    } else {
      console.log('Base de datos conectada.')
    }
  })

}

async function DesconectarBD(){
  await client.end()
}

//Metodos consulta BD

ipcMain.on('req', (e, consulta) => {

  client
  .query(consulta)
  .then(res => e.returnValue = res.rows)
  .catch(e => e.returnValue = e.stack)

});


ipcMain.on('actualizar', (e, consulta) => {

  client
  .query(consulta)
  .then(res => e.returnValue = res.rows)
  .catch(e => e.returnValue = e.stack)

});

ipcMain.on('salir',() => {
  DesconectarBD();
  app.quit();
})


