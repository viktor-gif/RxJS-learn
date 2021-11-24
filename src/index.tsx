import React from 'react';
import './index.css';
import reportWebVitals from './reportWebVitals';
import store from './redux/redux-store';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import StoreContext from './storeContext';
// import { store } from './redux/store';

export const renderEntireTree = () => {
  ReactDOM.render(
    <React.StrictMode>
      {/* @ts-ignore */}
      <StoreContext.Provider value={store}>
      <App />
      </StoreContext.Provider>
    </React.StrictMode>,
    document.getElementById('root')
  );
}
store.subscribe(renderEntireTree);
renderEntireTree();



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
