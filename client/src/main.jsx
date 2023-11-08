import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import customFetch from '../src/utils/customFetch.js'

// fetch('http://localhost:5100/api/v1/test')
// fetch('/api/v1/test')
//   .then((res) => res.json())
//   .then((data) => console.log(data));
const resp = await customFetch.get('/basicInfo');
console.log(resp);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
