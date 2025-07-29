import { contextBridge, ipcRenderer } from 'electron'

// Expose API for renderer process
contextBridge.exposeInMainWorld('electronAPI', {
    // Settings methods
    getSettings: (key: string) => ipcRenderer.invoke('get-settings', key),
    setSettings: (key: string, value: any) => ipcRenderer.invoke('set-settings', key, value),

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
            onSettingsChanged: (callback: (key: string, value: any) => void) => void
        }
    }
} 