const { app, BrowserWindow, ipcMain, Notification } = require('electron');
const path = require('path');

// Express 서버 시작 (환율 API용)
require('../server/server.js');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 480,
    height: 860,
    minWidth: 420,
    minHeight: 700,
    frame: false,          // 커스텀 타이틀바
    backgroundColor: '#1e1e2e',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
    icon: path.join(__dirname, '../public/icon.png'),
  });

  mainWindow.loadFile(path.join(__dirname, '../public/index.html'));
}

// 커스텀 타이틀바 — 창 제어 IPC
ipcMain.on('window-minimize', () => mainWindow.minimize());
ipcMain.on('window-maximize', () => {
  mainWindow.isMaximized() ? mainWindow.unmaximize() : mainWindow.maximize();
});
ipcMain.on('window-close', () => mainWindow.close());

// 시스템 알림
ipcMain.on('notify', (_, { title, body }) => {
  new Notification({ title, body }).show();
});

app.whenReady().then(createWindow);
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });
