import React from 'react'
import ReactDOM from 'react-dom/client'
import reportWebVitals from './reportWebVitals'
import { App } from './components/App'

import './index.css'

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('root')

    if (!container) {
        throw Error('#root element is not found')
    }

    const root = ReactDOM.createRoot(container)

    root.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    )
})

reportWebVitals(console.log)
