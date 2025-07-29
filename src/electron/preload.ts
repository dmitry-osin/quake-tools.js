import { contextBridge, ipcRenderer } from 'electron'

// Expose API for renderer process
contextBridge.exposeInMainWorld('electronAPI', {
    // Settings methods
    getSettings: (key: string) => ipcRenderer.invoke('get-settings', key),
    setSettings: (key: string, value: any) => ipcRenderer.invoke('set-settings', key, value),

    // File system methods
    openFile: () => ipcRenderer.invoke('open-file'),
    saveFile: (data: any) => ipcRenderer.invoke('save-file', data),

    // Window control methods
    minimize: () => ipcRenderer.invoke('minimize-window'),
    maximize: () => ipcRenderer.invoke('maximize-window'),
    close: () => ipcRenderer.invoke('close-window'),

    // Events
    onSettingsChanged: (callback: (key: string, value: any) => void) => {
        ipcRenderer.on('settings-changed', (_, key, value) => callback(key, value))
    }
})

// TypeScript types
declare global {
    interface Window {
        electronAPI: {
            getSettings: (key: string) => Promise<any>
            setSettings: (key: string, value: any) => Promise<void>
            openFile: () => Promise<string | null>
            saveFile: (data: any) => Promise<void>
            minimize: () => Promise<void>
            maximize: () => Promise<void>
            close: () => Promise<void>
            onSettingsChanged: (callback: (key: string, value: any) => void) => void
        }
    }
} 