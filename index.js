const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const remote = electron.remote

let mainWindow

function createWindow () {
	mainWindow = new BrowserWindow({width: 800, height: 450})
	mainWindow.setMinimumSize(800, 450);

	mainWindow.loadURL(`file://${__dirname}/index.html`)

	// mainWindow.webContents.openDevTools()

	mainWindow.on('closed', function () {
		mainWindow = null
	})
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
	if (process.platform === 'darwin') return;
	app.quit()
})

app.on('activate', function () {
	if (mainWindow !== null) return;
	createWindow()
})
