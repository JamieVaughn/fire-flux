import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { Provider } from 'react-redux'
import { configureStore } from "@reduxjs/toolkit";
import authReducer from './features/authSlice'
import postsReducer from './features/postsSlice'


export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postsReducer
  }
})


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
