import { app, BrowserWindow, ipcMain } from 'electron';
import { autoUpdater } from 'electron-updater';

let mainWindow: BrowserWindow | null = null;

app.on('ready', () => {
  mainWindow = new BrowserWindow();

  // Check for updates
  autoUpdater.checkForUpdatesAndNotify();

  mainWindow.loadFile('index.html');
});

// Listen for update events
autoUpdater.on('update-available', () => {
  mainWindow?.webContents.send('update_available');
});

autoUpdater.on('update-downloaded', () => {
  mainWindow?.webContents.send('update_downloaded');
});

// When receiving a quitAndInstall signal, we call autoUpdater.quitAndInstall() to
// close the application and install the update
ipcMain.on('quitAndInstall', () => {
  autoUpdater.quitAndInstall();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    mainWindow = new BrowserWindow();
    mainWindow.loadFile('index.html');
  }
});