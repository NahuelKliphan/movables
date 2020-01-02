const { app, BrowserWindow, ipcMain } = require('electron')
const { Client } = require('pg')

//Ventana principal.
let win;
let client;

//Base de datos.

//Prueba
const config1 = {
  user: 'taiahceb',
  host: 'motty.db.elephantsql.com',
  database: 'taiahceb',
  password: 'aDVvMH3RwfzpulKkCNFAaWT1QBWPdUSw',
  port: 5432,
}

//Produccion.
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

ipcMain.on('salir',() => {
  DesconectarBD();
  app.quit();
})

//Metodo para conectar la base de datos.
async function ConectarBD() {

  client = new Client(config1)

  await client.connect(err => {
    if (err) {
      console.error('Error al conectar Base de datos.', err.stack)
    } else {
      console.log('Base de datos conectada.')
    }
  })

}

//Metodos consulta BD

ipcMain.on('base', (e, consulta) => {

  client
  .query(consulta)
  .then(res => e.returnValue = res.rows)
  .catch(e => e.returnValue = e.stack)

});

async function DesconectarBD(){
  await client.end()
}



