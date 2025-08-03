import { contextBridge, ipcRenderer } from 'electron'
import { TimerState } from '../types/global'

contextBridge.exposeInMainWorld('timers', {
    onTimerTick: (callback: (state: TimerState) => void) => ipcRenderer.on('timer-tick', (_, state) => callback(state as TimerState)),
    onTimerStop: (callback: (state: TimerState) => void) => ipcRenderer.on('timer-stop', (_, state) => callback(state as TimerState)),
    onTimerReset: (callback: (state: TimerState) => void) => ipcRenderer.on('timer-reset', (_, state) => callback(state as TimerState))
})