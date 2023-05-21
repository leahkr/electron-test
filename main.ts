import { app, BrowserWindow, ipcMain } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';



log.info('App starting...');
log.transports.file.level = "info"

let mainWindow: BrowserWindow | null = null;

app.on('ready', () => {
  mainWindow = new BrowserWindow();
  mainWindow.webContents.openDevTools();

  // Check for updates
  autoUpdater.checkForUpdatesAndNotify();
  mainWindow.loadFile('./dist/index.html');
});

// Listen for update events
autoUpdater.on('update-available', () => {
  log.info('Update available.');
  mainWindow?.webContents.send('update_available');
});

autoUpdater.on('update-downloaded', () => {
  log.info('Update downloaded.');
  mainWindow?.webContents.send('update_downloaded');
});

// When receiving a quitAndInstall signal, we call autoUpdater.quitAndInstall() to
// close the application and install the update
ipcMain.on('quitAndInstall', () => {
  log.info('Received quitAndInstall signal.');
  autoUpdater.quitAndInstall();
});

app.on('window-all-closed', () => {
  log.info('All windows closed.');
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  log.info('App activated.');
  if (BrowserWindow.getAllWindows().length === 0) {
    mainWindow = new BrowserWindow();
    mainWindow.webContents.openDevTools();
    mainWindow.loadFile('./dist/index.html');
  }
});