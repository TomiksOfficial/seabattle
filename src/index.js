import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store'

import { io } from 'socket.io-client';
import App from './App';
import './index.css';

export const socketIO = io("http://localhost:2000", {
    transports: [ "websocket" ]
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
	<Provider store={store}>
    	<App />
	</Provider>
  </React.StrictMode>
);


