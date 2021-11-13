import React from 'react';
import './App.css';
import {Observable} from 'rxjs';
import { Header } from './componets/Header/Header';
import { Main } from './componets/Main/Main';
import { Nav } from './componets/Nav/Nav';
import { Footer } from './componets/Footer/Footer';

const App = () => {

  // const observable$ = new Observable<string>(subscriber => {
  //   console.log('Observable executed');
  //   subscriber.next('Alice');
  //   setTimeout(() => subscriber.next('Ben'), 2000);
  //   setTimeout(() => subscriber.next('Charlie'), 4000);
  // });

  // const subscription = observable$.subscribe(value => console.log(value));

  // setTimeout(() => {
  //   console.log('unsubscribe');
  //   subscription.unsubscribe();
  // }, 3000)

  // const observable$ = new Observable<string>(subscriber => {
  //   console.log('Observable executed');
  //   subscriber.next('Alice');
  //   setTimeout(() => subscriber.next('Ben'), 2000);
  //   setTimeout(() => subscriber.next('Charlie'), 4000);
  // });

  // console.log('subscription 1 starts');
  // observable$.subscribe(value => console.log('subscription 1: ', value));

  // setTimeout(() => {
  //   console.log('subscription 2 starts');
  //   observable$.subscribe(value => console.log('subscription 2: ', value));
  // }, 1000)

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
      </div>
    </div>
  );
}

export default App;
