import React, { useEffect } from "react";
import { ajax } from "rxjs/ajax";
import { fromEvent, of} from 'rxjs';
import { map, catchError, concatMap, switchMap, mergeMap, exhaustMap } from 'rxjs/operators';
import s from "./RxjsLearn.module.css";

export const RxjsLearn = () => {

    // HTTP-request in observer 
    useEffect(() => {
        const input = document.getElementById('input');
        const fetch = document.getElementById('fetch');

        //@ts-ignore
        fromEvent(fetch, 'click').pipe(
            //@ts-ignore
            map(() => input.value),
            //@ts-ignore
            switchMap(value => 
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

    // concatMap ставить всі запити в чергу і в порядку
    // черги їх виконує

    // switchMap виконує останній запит, якщо попередні 
    // запити не встигли виконатись

    // mergeMap виконує всі запити паралельно, перший виконаний
    // прийде перший в output
    
    
    return <div className={s.slider}>
            <div className="inputWrap">
                <input id="input" type="text" />
            </div>
            <button id="fetch">Fetch</button>
    </div>
}