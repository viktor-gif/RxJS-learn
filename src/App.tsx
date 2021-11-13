import React from 'react';
import './App.css';
import { Header } from './componets/Header/Header';
import { Main } from './componets/Main/Main';
import { Nav } from './componets/Nav/Nav';
import { Footer } from './componets/Footer/Footer';
import { RxjsLearn } from './componets/rxjs-learn/RxjsLearn';

const App = () => {

  return (
    <div className="App">
    <h1 className="rxjs-title">RxJS</h1>
      <div className="content-wrapper">
        <header className="header">
          <Header />
        </header>
        <main className="main">
          <Main />
        </main>
        <nav className="nav">
          <Nav />
        </nav>
        <footer className="footer">
          <Footer />
        </footer>
        <RxjsLearn />
      </div>
    </div>
  );
}

export default App;
