import React, {memo, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import {Observable} from 'rxjs';

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

  const observable$ = new Observable<string>(subscriber => {
    console.log('Observable executed');
    subscriber.next('Alice');
    setTimeout(() => subscriber.next('Ben'), 2000);
    setTimeout(() => subscriber.next('Charlie'), 4000);
  });

  console.log('subscription 1 starts');
  observable$.subscribe(value => console.log('subscription 1: ', value));

  setTimeout(() => {
    console.log('subscription 2 starts');
    observable$.subscribe(value => console.log('subscription 2: ', value));
  }, 1000)

  return (
    <h1 className="App">
      RxJS
    </h1>
  );
}

export default App;
