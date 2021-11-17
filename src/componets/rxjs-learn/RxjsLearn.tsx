import { rejects } from "assert";
import React, { useEffect } from "react";
import {from, fromEvent, interval, Observable, of, timer} from 'rxjs';
import s from "./RxjsLearn.module.css";

export const RxjsLearn = () => {

    //timer
    useEffect(() => {
        // const sub = timer(2000).subscribe({
        //     next: val => console.log(val),
        //     complete: () => console.log('Complete')
        // })
        // setTimeout(() => {
        //     sub.unsubscribe();
        // }, 1000)

        // timer-observable
        // const timer$ = new Observable<number>(subscriber => {
        //     const timerId = setTimeout(() => {
        //         console.log('Timeout!')
        //         subscriber.next(0);
        //         subscriber.complete();
        //     }, 2000)
        //     return () => clearTimeout(timerId);
        // })
        // const sub = timer$.subscribe({
        //     next: val => console.log(val),
        //     complete: () => console.log('Complete')
        // })
        // setTimeout(() => {
        //     sub.unsubscribe();
        //     console.log('Unsubscribe');
        // }, 1000)

        // my timer
        // function myTimer(time: number) {
        //     return new Observable<number>(subscriber => {
        //         setTimeout(() => {
        //             subscriber.next(0);
        //             subscriber.complete();
        //         }, time)
        //     })
        // }
    
    }, [])

    // interval
    useEffect(() => {
        // const sub = interval(1000).subscribe({
        //     next: val => console.log(val),
        //     complete: () => console.log('Complete')
        // })
        // setTimeout(() => {
        //     sub.unsubscribe();
        // }, 5000)

        // interval-observable
        const interval$ = new Observable<number>(subscriber => {
            let val = 0;
            const intervalId = setInterval(() => {
                console.log('Interval!')
                subscriber.next(val++);
            }, 1000)
            // subscriber.complete();
            return () => clearInterval(intervalId);
        })
        const sub = interval$.subscribe({
            next: val => console.log(val),
            complete: () => console.log('Complete')
        })
        setTimeout(() => {
            sub.unsubscribe();
            console.log('Unsubscribe');
        }, 5000)
    }, [])
    

    return <div><button className={s.btnClick} id="btnClick">Click</button></div>
}