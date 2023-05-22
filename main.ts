import { app, BrowserWindow, ipcMain } from 'electron';
import { autoUpdater, UpdateCheckResult } from 'electron-updater';
import log from 'electron-log';
import * as semver from "semver";

// Check for update after x seconds
const checkForUpdatesInterval = 60000; // in milliseconds

log.info('App starting...');
log.transports.file.level = "info"
let currentVersion: string;
let updateInfo: UpdateCheckResult;
let mainWindow: BrowserWindow | null = null;

app.on('ready', () => {
  mainWindow = new BrowserWindow();
  mainWindow.webContents.openDevTools();
  autoUpdater.autoDownload = true;
  autoUpdater.autoInstallOnAppQuit = true;
  autoUpdater.checkForUpdates();

  mainWindow.loadFile('./dist/index.html');
});
autoUpdater.on("update-downloaded", info => {
  log.info("Installing update...", info);
  autoUpdater.quitAndInstall(false, true);
});

ipcMain.handle("install-update", async (_, __) => {
  log.info("Downloading update...");
  await autoUpdater.downloadUpdate();
  log.info("Finished downloading update...");
});
// Listen for update events
autoUpdater.on('update-available', () => {
  log.info('Update available.');
  mainWindow.webContents.send('update_available');
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

autoUpdater.on('error', (error) => {
  log.error('Update error: ' + error == null ? "unknown" : (error.stack || error).toString());
});

autoUpdater.on('checking-for-update', () => {
  log.info('Checking for update...');
});



