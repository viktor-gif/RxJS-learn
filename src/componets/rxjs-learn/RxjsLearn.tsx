import React from "react";
import {Observable} from 'rxjs';

export const RxjsLearn = () => {

    // const observable$ = new Observable<number>(subscriber => {
    //     let counter = 0;
    //     const intervalId = setInterval(() => {
    //         console.log('Emitted ', counter);
    //         subscriber.next(counter += 1);
    //     }, 1000)

    //     return () => {
    //         clearInterval(intervalId);
    //     }
    // });

    // const subscription = observable$.subscribe(val => console.log(val));

    // setTimeout(() => subscription.unsubscribe(), 7000);
   
        console.log('Emitted ');


//   const observable$ = new Observable<string>(subscriber => {
//     console.log('Observable executed');
//     subscriber.next('Ivan');

//     setTimeout(() => subscriber.error(new Error('Failure')), 1000);

//     setTimeout(() => {
//         subscriber.next('Alice');
//         subscriber.complete();
//     }, 2000)
    
//     setTimeout(() => subscriber.error(new Error('Failure')), 4000);

//     subscriber.next('Vasya');

//     return () => {
//         console.log('Teardown');
//     }
    
//   });

//   console.log('Before');
//   observable$.subscribe({
//       next: val => console.log(val),
//       error: err => console.log(err.message),
//       complete: () => console.log('Complete')
//   });
//   console.log('after');








    return <div></div>
}