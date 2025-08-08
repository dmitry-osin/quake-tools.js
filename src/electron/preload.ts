import { contextBridge, ipcRenderer } from 'electron'
import { ExampleState } from '../types/global'

contextBridge.exposeInMainWorld('examples', {
    onExampleUpdate: (callback: (state: ExampleState) => void) => ipcRenderer.on('example-update', (_, state) => callback(state as ExampleState))
})