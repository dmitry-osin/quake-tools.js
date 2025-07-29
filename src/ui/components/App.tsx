import React from 'react'
import ExampleComponent from './ExampleComponent'
import './App.css'

const App: React.FC = () => {
    return (
        <div className="app">
            <header className="app-header">
                <h1>Quake Tools</h1>
                <p>Electron + React + TypeScript + Vite</p>
            </header>
            <main className="app-main">
                <p>Welcome to Quake Tools!</p>
                <ExampleComponent />
            </main>
        </div>
    )
}

export default App 