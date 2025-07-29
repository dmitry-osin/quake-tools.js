import { app, BrowserWindow, Menu, ipcMain, dialog } from 'electron'
import * as path from 'path'
import * as settings from 'electron-settings'

let mainWindow: BrowserWindow | null = null

const isDev = process.env.NODE_ENV === 'development'

// Disable hardware acceleration
// To avoid the errors like this: [23032:0729/042126.831:ERROR:gpu_process_host.cc(991)] GPU process exited unexpectedly: exit_code=-1073740791
app.disableHardwareAcceleration()

function createWindow(): void {
    // Create browser window
    mainWindow = new BrowserWindow({
        width: 900,
        height: 1000,
        resizable: false,
        maximizable: false,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js')
        },
        icon: path.join(__dirname, '../ui/assets/icon.png'),
        show: false
    })

    // Load the application
    if (isDev) {
        mainWindow.loadURL('http://localhost:5173')

        // Open DevTools with error handling
        mainWindow.webContents.once('did-finish-load', () => {
            mainWindow?.webContents.openDevTools()
        })

        // Handle DevTools errors
        mainWindow.webContents.on('console-message', (event, level, message, line, sourceId) => {
            if (level === 3 && message.includes('Failed to fetch')) {
                // Ignore DevTools fetch errors
                return
            }
            console.log(`[Renderer] ${message}`)
        })
    } else {
        mainWindow.loadFile(path.join(__dirname, '../ui/index.html'))
    }

    // Show window when ready
    mainWindow.once('ready-to-show', () => {
        mainWindow?.show()
    })

    // Handle window close
    mainWindow.on('closed', () => {
        mainWindow = null
    })

    // Handle load errors
    mainWindow.webContents.on('did-fail-load', (event, errorCode, errorDescription, validatedURL) => {
        console.error(`Failed to load: ${validatedURL}`, errorDescription)
    })
}

// Setup IPC handlers
function setupIpcHandlers(): void {
    // Settings handlers
    ipcMain.handle('get-settings', async (_, key: string) => {
        return settings.get(key)
    })

    ipcMain.handle('set-settings', async (_, key: string, value: any) => {
        await settings.set(key, value)
    })

    // File system handlers
    ipcMain.handle('open-file', async () => {
        const result = await dialog.showOpenDialog(mainWindow!, {
            properties: ['openFile'],
            filters: [
                { name: 'All Files', extensions: ['*'] },
                { name: 'Text Files', extensions: ['txt', 'md'] },
                { name: 'JavaScript Files', extensions: ['js', 'ts'] }
            ]
        })

        if (!result.canceled && result.filePaths.length > 0) {
            return result.filePaths[0]
        }
        return null
    })

    ipcMain.handle('save-file', async (_, data: any) => {
        const result = await dialog.showSaveDialog(mainWindow!, {
            filters: [
                { name: 'JSON Files', extensions: ['json'] },
                { name: 'Text Files', extensions: ['txt'] },
                { name: 'All Files', extensions: ['*'] }
            ]
        })

        if (!result.canceled && result.filePath) {
            // Here you would implement the actual file saving logic
            console.log('Saving file to:', result.filePath, 'with data:', data)
            return result.filePath
        }
        return null
    })

    // Window control handlers
    ipcMain.handle('minimize-window', () => {
        mainWindow?.minimize()
    })

    ipcMain.handle('maximize-window', () => {
        if (mainWindow?.isMaximized()) {
            mainWindow.unmaximize()
        } else {
            mainWindow?.maximize()
        }
    })

    ipcMain.handle('close-window', () => {
        mainWindow?.close()
    })
}

// Create application menu
function createMenu(): void {
    const template: Electron.MenuItemConstructorOptions[] = [

    ]

    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)
}

// Initialize application
app.whenReady().then(() => {
    createWindow()
    setupIpcHandlers()
    createMenu()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
            setupIpcHandlers()
        }
    })
})

// Quit when all windows are closed
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

// Error handling
process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error)
})

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason)
})

// Suppress DevTools warnings
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true' 