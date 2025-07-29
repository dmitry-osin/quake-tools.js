import React, { useState } from 'react'

const ExampleComponent: React.FC = () => {
    const [filePath, setFilePath] = useState<string | null>(null)

    // Example of using Electron API
    const handleOpenFile = async () => {
        try {
            const path = await window.electronAPI.openFile()
            if (path) {
                setFilePath(path)
                console.log('File opened:', path)
            }
        } catch (error) {
            console.error('Error opening file:', error)
        }
    }

    const handleSaveSettings = async () => {
        try {
            await window.electronAPI.setSettings('theme', 'dark')
            console.log('Settings saved successfully')
        } catch (error) {
            console.error('Error saving settings:', error)
        }
    }

    const handleMinimizeWindow = async () => {
        try {
            await window.electronAPI.minimize()
            console.log('Window minimized')
        } catch (error) {
            console.error('Error minimizing window:', error)
        }
    }

    return (
        <div className="example-component">
            <h3>Electron API Examples</h3>

            <div className="button-group">
                <button onClick={handleOpenFile}>
                    Open File
                </button>

                <button onClick={handleSaveSettings}>
                    Save Settings
                </button>

                <button onClick={handleMinimizeWindow}>
                    Minimize Window
                </button>
            </div>

            {filePath && (
                <div className="file-info">
                    <p>Selected file: {filePath}</p>
                </div>
            )}
        </div>
    )
}

export default ExampleComponent 