import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import { store } from './redux/store';

export const renderEntireTree = (store) => {
  ReactDOM.render(
    <React.StrictMode>
      <App state={store.state} addPost={store.addPost} updateNewPostText={store.updateNewPostText} />
    </React.StrictMode>,
    document.getElementById('root')
  );
}
