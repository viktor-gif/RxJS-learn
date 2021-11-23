import React, { useEffect } from "react";
import { ajax } from "rxjs/ajax";
import { EMPTY, fromEvent, Observable, of} from 'rxjs';
import { map, catchError, concatMap } from 'rxjs/operators';
import s from "./RxjsLearn.module.css";

export const RxjsLearn = () => {
   
    // observer in observer
    // useEffect(() => {
    //     const source$ = new Observable(subscriber => {
    //         setTimeout(() => subscriber.next('A'), 2000)
    //         setTimeout(() => subscriber.next('B'), 5000)
    //     })

    //     console.log('App started');

    //     source$.pipe(
    //         concatMap(val => of(1, 2))
    //     ).subscribe({
    //         next: val => console.log(val),
    //         // error: err => console.log(err),
    //         // complete: () => console.log('complete')
    //     })
    // }, [])


    // HTTP-request in observer 
    useEffect(() => {
        const input = document.getElementById('input');
        const fetch = document.getElementById('fetch');

        //@ts-ignore
        fromEvent(fetch, 'click').pipe(
            //@ts-ignore
            map(() => input.value),
            //@ts-ignore
            concatMap(value => 
                ajax(`https://random-data-api.com/api/${value}/random_${value}`).pipe(
                    //@ts-ignore
                    catchError((error) => of(`Could not fetch data: ${error}`))
                )
            ),
            //@ts-ignore
            // catchError(() => EMPTY)
        ).subscribe({
            next: val => console.log(val),
            error: err => console.log("Error: ", err),
            complete: () => console.log('completed')
        })
    })
    
    
    return <div className={s.slider}>
            <div className="inputWrap">
                <input id="input" type="text" />
            </div>
            <button id="fetch">Fetch</button>
    </div>
}