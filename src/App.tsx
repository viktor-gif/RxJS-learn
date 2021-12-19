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
import { authDataType, setAuthData } from './redux/auth-reducer';
import { authAPI } from './api/api';

type propsType = {
  userId: number | null
  email: string | null
  login: string | null
  isAuth: boolean
  setAuthData: (data: authDataType) => void
}

const App = React.memo((props: propsType) => {
console.log(props.userId)
  useEffect(() => {
    
    authAPI.getAuthData().then(response => {
      if (response.data.resultCode === 0) {
        props.setAuthData(response.data.data)
      }
    })
  }, [])

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
})

const mapStateToProps = (state: stateType) => ({
  userId: state.auth.id,
  login: state.auth.login,
  email: state.auth.email,
  isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, {
  setAuthData
})(App);
