import React from 'react';
import './App.css';
import { Header } from './componets/Header/Header';
import { Main } from './componets/Main/Main';
import { Nav } from './componets/Nav/Nav';
import { Footer } from './componets/Footer/Footer';
import { RxjsLearn } from './componets/rxjs-learn/RxjsLearn';
import { stateType } from './redux/store';
import { BrowserRouter, Route } from 'react-router-dom';

type propsType = {
  state: stateType
  dispatch: any
}

const App = (props: propsType) => {

  return (
    <BrowserRouter>
      <div className="App">
      <h1 className="rxjs-title">RxJS</h1>
        <div className="content-wrapper">
          <header className="header">
            <Header />
          </header>
          <main className="main">
            <Main dialogsPage={props.state.dialogsPage} 
                  profilePage={props.state.profilePage}
                  dispatch={props.dispatch} />
          </main>
          <nav className="nav">
            <Nav />
          </nav>
          <footer className="footer">
            <Footer />
          </footer>
          <Route path="rx" component={RxjsLearn} />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
