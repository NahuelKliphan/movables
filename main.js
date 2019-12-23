const { app, BrowserWindow, ipcMain  } = require('electron')

let win;

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 1024,
    height: 768,
    backgroundColor: '#ffffff',
    icon: `file://${__dirname}/dist/assets/logo.png`
  })

  win.setMenu(null);

  base();

  win.loadURL(`file://${__dirname}/dist/index.html`)

  // Event when the window is closed.
  win.on('closed', function () {
    win = null
  })
}

// Create window on electron intialization
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {

  // On macOS specific close process
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // macOS specific close process
  if (win === null) {
    createWindow()
  }
})

async function base() {

  const { Client } = require('pg')

  const config = {
    user: 'postgres',
    host: 'localhost',
    database: 'stock',
    password: 'postgres',
    port: 5432,
  }
  const client = new Client(config)

  client.connect(err => {
    if (err) {
      console.error('connection error', err.stack)
    } else {
      console.log('connected')
    }
  })
  
  const res = await client.query('select * from productos')

  console.log(res.rows)
  await client.end()
}
