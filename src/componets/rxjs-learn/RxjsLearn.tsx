import { rejects } from "assert";
import React, { useEffect } from "react";
import {forkJoin, from, fromEvent, interval, Observable, of, timer} from 'rxjs';
import s from "./RxjsLearn.module.css";
import {ajax} from "rxjs/ajax";

export const RxjsLearn = () => {
   
    // forkJoin-Observable that emittes successfully
    useEffect(() => {
        const randomName$ = ajax(
            'https://random-data-api.com/api/name/random_name');
    
        const randomNation$ = ajax(
            'https://random-data-api.com/api/nation/random_nation');
    
        const randomFood$ = ajax(
            'https://random-data-api.com/api/food/random_food');
    
        //     //@ts-ignore
        // randomName$.subscribe(sub => console.log(sub.response.first_name));
        // //@ts-ignore
        // randomNation$.subscribe(sub => console.log(sub.response.capital));
        // //@ts-ignore
        // randomFood$.subscribe(sub => console.log(sub.response.dish));

        forkJoin([randomName$, randomNation$, randomFood$]).subscribe(
            ([nameAjax, nationAjax, foodAjax]) => console.log(
                //@ts-ignore
                `${nameAjax.response.first_name} is from ${nationAjax.response.capital} and likes to eat ${foodAjax.response.dish}.`
            )
        )
        
    }, [])

    // forkJoin-Observable with error
    useEffect(() => {
        // const a$ = new Observable(subscriber => {
        //     setTimeout(() => {
        //         subscriber.next('A');
        //         subscriber.complete();
        //     }, 3000)

        //     return () => console.log('A teardown')
        // })
        // const b$ = new Observable(subscriber => {
        //     setTimeout(() => {
        //         subscriber.error('Failure!');
        //     }, 5000)

        //     return () => console.log('B teardown')
        // })

        // forkJoin([a$, b$]).subscribe({
        //     next: val => console.log(val),
        //     error: err => console.log('Error: ', err)
        // })
    }, [])

    
    




    return <div><button className={s.btnClick} id="btnClick">Click</button></div>
}