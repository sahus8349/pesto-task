import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from "react-redux"
import store from "./store"
import { RouterProvider, BrowserRouter } from "react-router-dom"
import Router from "./Router"
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter />
      <RouterProvider router={Router} />
    </Provider>
  </React.StrictMode>,
)
