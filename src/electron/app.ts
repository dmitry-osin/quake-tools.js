import { app, BrowserWindow, Menu, ipcMain, globalShortcut } from 'electron'
import * as path from 'path'
import * as settings from 'electron-settings'
import { TimerEvent, TimerName, TimerState } from '../types/global'

let mainWindow: BrowserWindow | null = null

const isDev = process.env.NODE_ENV === 'development'

let megaHealthTimer: TimerState | null = null
let redArmorTimer: TimerState | null = null
let yellowArmorTimer: TimerState | null = null
let yellowArmorTimerTwo: TimerState | null = null
let yellowArmorTimerThree: TimerState | null = null

const icon = path.join(process.cwd(), 'src/ui/assets/icon.ico')

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
        icon: icon,
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
    registerHotkeys()

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

function startTimer(name: TimerName, window: BrowserWindow | null): TimerState | null {
    if (!window) return null

    let timer: TimerState = {
        name: name,
        interval: null as NodeJS.Timeout | null,
        timeLeft: name === 'MH' ? 35 : 25,
        running: true
    }

    timer.interval = setInterval(() => {
        timer.timeLeft--

        sendTimerEvent('timer-tick', timer, window)

        if (timer.timeLeft <= 0 && timer.interval) {
            stopTimer(timer, window)
            return null
        }
        return timer
    }, 1000)

    sendTimerEvent('timer-tick', timer, window)
    return timer
}

function stopTimer(timer: TimerState, window: BrowserWindow | null, manual: boolean = false): void {
    if (!window || !timer.interval) return

    clearInterval(timer.interval)
    timer.interval = null
    timer.running = false
    timer.timeLeft = 0

    if (manual) {
        sendTimerEvent('timer-reset', timer, window)
    } else {
        sendTimerEvent('timer-stop', timer, window)
    }
}


function sendTimerEvent(name: TimerEvent, state: TimerState, window: BrowserWindow | null): void {
    if (!window) return

    window.webContents.send(name, {
        name: state.name,
        timeLeft: state.timeLeft,
        running: state.running
    })
}

function registerHotkeys(): void {
    globalShortcut.unregisterAll()

    globalShortcut.register('1', () => {
        if (megaHealthTimer) {
            stopTimer(megaHealthTimer, mainWindow, true)
            megaHealthTimer = null
        } else {
            megaHealthTimer = startTimer('MH', mainWindow)
        }
    })

    globalShortcut.register('2', () => {
        if (redArmorTimer) {
            stopTimer(redArmorTimer, mainWindow, true)
            redArmorTimer = null
        } else {
            redArmorTimer = startTimer('RA', mainWindow)
        }
    })

    globalShortcut.register('3', () => {
        if (yellowArmorTimer) {
            stopTimer(yellowArmorTimer, mainWindow, true)
            yellowArmorTimer = null
        } else {
            yellowArmorTimer = startTimer('YA', mainWindow)
        }
    })

    globalShortcut.register('4', () => {
        if (yellowArmorTimerTwo) {
            stopTimer(yellowArmorTimerTwo, mainWindow, true)
            yellowArmorTimerTwo = null
        } else {
            yellowArmorTimerTwo = startTimer('YA2', mainWindow)
        }
    })

    globalShortcut.register('5', () => {
        if (yellowArmorTimerThree) {
            stopTimer(yellowArmorTimerThree, mainWindow, true)
            yellowArmorTimerThree = null
        } else {
            yellowArmorTimerThree = startTimer('YA3', mainWindow)
        }
    })
}


