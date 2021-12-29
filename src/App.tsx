import React, { useEffect } from 'react';
import './App.css';
import { Header } from './componets/Header/Header';
import { Main } from './componets/Main/Main';
import { Nav } from './componets/Nav/Nav';
import { Footer } from './componets/Footer/Footer';
import { RxjsLearn } from './componets/rxjs-learn/RxjsLearn';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { stateType } from './redux/store';
import { getAuthData } from './redux/auth-reducer';
import { initialize } from './redux/app-reducer';
import Login from './componets/Login/Login';
import { Preloader } from './componets/common/preloader/preloader';

type propsType = {
  userId: number | null
  email: string | null
  login: string | null
  isAuth: boolean
  initialized: boolean

  getAuthData: () => void
  initialize: () => void
}

const App = React.memo((props: propsType) => {

  useEffect(() => {
    props.initialize()
  }, [])

  if (!props.initialized) return <Preloader />

  return (
    <BrowserRouter>
      <div className="App">
      <h1 className="rxjs-title">RxJS</h1>
        <div className="content-wrapper">
          <header className="header">
            <Header isAuth={props.isAuth} login={props.login} />
          </header>
          <main className="main">
            <Main />
            <Route path="/login" render={() => <Login />} />
          </main>
          <nav className="nav">
            <Nav />
          </nav>
          <footer className="footer">
            <Footer />
          </footer>
          <Route path="/rx" component={RxjsLearn} />
        </div>
      </div>
    </BrowserRouter>
  );
})

const mapStateToProps = (state: stateType) => ({
  userId: state.auth.id,
  login: state.auth.login,
  email: state.auth.email,
  isAuth: state.auth.isAuth,
  initialized: state.app.initialized
})

export default connect(mapStateToProps, {
  getAuthData, initialize
})(App);
