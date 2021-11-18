import React from 'react';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { store } from './redux/store';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import { store } from './redux/store';

export const renderEntireTree = () => {
  ReactDOM.render(
    <React.StrictMode>
      <App state={store.state} addPost={store.addPost} updateNewPostText={store.updateNewPostText} />
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
