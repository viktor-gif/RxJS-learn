import React, { useEffect } from "react";
import { EMPTY, fromEvent, Observable, of} from 'rxjs';
import { filter, map, tap, debounceTime, catchError } from 'rxjs/operators';
import s from "./RxjsLearn.module.css";

export const RxjsLearn = () => {
   
    useEffect(() => {
        const failingHttpRepuest$ = new Observable(subscriber => {
            setTimeout(() => {
                subscriber.error(new Error('Timeout'));
            }, 3000)
        })

        console.log('App started');

        failingHttpRepuest$.pipe(
            catchError(err => of('Fallback value')),
            
            //empty observable
            catchError(err => EMPTY)

        ).subscribe({
            next: val => console.log(val),
            // error: err => console.log(err),
            complete: () => console.log('complete')
        })
    }, [])
    
    
    return <div className={s.slider}>
        <input type="range" id="slider" />
    </div>
}