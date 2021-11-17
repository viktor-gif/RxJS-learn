import { rejects } from "assert";
import React, { useEffect } from "react";
import {from, Observable, of} from 'rxjs';

export const RxjsLearn = () => {

    from(['Alice', 'Ben', 'Charlie']).subscribe({
        next: value => console.log(value),
        complete: () => console.log('Completed')
    })

    myFrom(['Alice', 'Ben', 'Charlie']).subscribe({
        next: value => console.log(value),
        error: err => console.log('Error: ', err),
        complete: () => console.log('Completed')
    })

    useEffect(() => {
        const promise = new Promise((resolve, reject) => {
            // resolve('Resolved!');
            reject('Rejected');
        })
    
        const observableFromPromise$ = from(promise);
    
        observableFromPromise$.subscribe({
            next: value => console.log(value),
            error: err => console.log("Error: ", err),
            complete: () => console.log("Completed")
        })
    }, [])
   


    //my own from (it must be rewrite)
    function myFrom(args: any): Observable<any> {
        return new Observable(subscriber => {
            if (args.length) {
                for (let i = 0; i < args.length; i++) {
                    subscriber.next(args[i]);
                }
            } else {
                subscriber.error('It is not iterable argument')
            }
            
            subscriber.complete();
        })
        
    }


    return <div></div>
}