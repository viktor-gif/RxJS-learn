import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './componets/Header/Header';
import { Main } from './componets/Main/Main';
import { Nav } from './componets/Aside/Nav/Nav';
import { Footer } from './componets/Footer/Footer';
import { RxjsLearn } from './componets/rxjs-learn/RxjsLearn';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { stateType } from './redux/store';
import { getAuthData, setLoginSuccess } from './redux/auth-reducer';
import { initialize, setOpenChat, setRejectedApp, setErrorText } from './redux/app-reducer';
import Login from './componets/Login/Login';
import { Preloader } from './componets/common/preloader/preloader';
import Friends from './componets/Aside/Friends/Friends';
import ChatWrap from './componets/Main/Chat/ChatWrap';
import { CommonError } from './componets/common/error/Error';

type propsType = {
  userId: number | null
  email: string | null
  login: string | null
  isAuth: boolean
  initialized: boolean
  isOpenedChat: boolean
  rejectedApp: boolean
  errorText: string

  setLoginSuccess: (success: boolean) => void
  getAuthData: () => void
  initialize: () => void
  setOpenChat: (isOpen: boolean) => void
  setRejectedApp: (rejected: boolean) => void
  setErrorText: (text: string) => void
}

const App = React.memo((props: propsType) => {

  const [isCollapsedChat, setCollapseChat] = useState(false)

  const catchAllUnhandledErrors = (promiseRejectionEvent: PromiseRejectionEvent) => {
    props.setErrorText(promiseRejectionEvent.reason.message)
    props.setRejectedApp(true)
  }

  useEffect(() => {
    props.initialize()
  }, [])

  useEffect(() => {
    window.addEventListener("unhandledrejection", catchAllUnhandledErrors)
    return() => {
      window.removeEventListener("unhandledrejection", catchAllUnhandledErrors)
    }
  }, [])

  // if (!props.initialized) return <Preloader />

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
            {props.isOpenedChat &&
            <div className={`chatWrap + " " + ${isCollapsedChat && "isCollapsedChat"}`}>
              <div className="chatOptions">
                {isCollapsedChat 
                ? <div className="chatOptionsItems chatExpandButton"
                  onClick={() => setCollapseChat(false)}>
                </div>
                : <div className="chatOptionsItems chaCollapseButton"
                  onClick={() => setCollapseChat(true)}>
                </div>
                }
                <div className="chatOptionsItems chatCloseButton"
                  onClick={() => props.setOpenChat(false)}>
                </div>
              </div>
              <ChatWrap />
            </div>
            }
          </main>
          <aside className="aside">
            <Nav />
            <Friends />
          </aside>
          <footer className="footer">
            <Footer />
          </footer>
          <Route path="/rx" component={RxjsLearn} />
        </div>
      </div>
      {props.rejectedApp && <div className="errorWindow">
        <CommonError errorText={props.errorText} 
          openedErrorWindow={props.setRejectedApp}/>
      </div>}
    </BrowserRouter>
  );
})

const mapStateToProps = (state: stateType) => ({
  userId: state.auth.id,
  login: state.auth.login,
  email: state.auth.email,
  isAuth: state.auth.isAuth,
  initialized: state.app.initialized,
  isOpenedChat: state.app.isOpendChat,
  rejectedApp: state.app.rejectedApp,
  errorText: state.app.errorText
})

export default connect(mapStateToProps, {
  getAuthData, initialize, setOpenChat, setLoginSuccess, setRejectedApp, setErrorText
})(App);
