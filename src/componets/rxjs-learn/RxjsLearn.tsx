import React from "react";
import {Observable, of} from 'rxjs';

export const RxjsLearn = () => {

    of('Alice', 'Ben', 'John').subscribe({
        next: value => console.log(value),
        complete: () => console.log('Completed')
    })

    //of realisation
    const names$ = new Observable(subscriber => {
        subscriber.next('Alice2');
        subscriber.next('Ben2');
        subscriber.next('John2');
        subscriber.complete();
    })
    names$.subscribe({
        next: value => console.log(value),
        complete: () => console.log('Completed2')
    })

    //creating my 'of'
    function myOf(...args: any[]): Observable<any> {
        return new Observable(subscriber => {
            for (let i = 0; i < args.length; i++) {
                subscriber.next(args[i]);
            }
            subscriber.complete();
        })
        
    }





    return <div></div>
}