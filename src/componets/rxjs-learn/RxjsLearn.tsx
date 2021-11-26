import React, { useEffect, useState } from "react";
import { fromEvent, Subject} from 'rxjs';
import { map } from 'rxjs/operators';
import s from "./RxjsLearn.module.css";

export const RxjsLearn = () => {
    
    useEffect(() => {
        const input: any = document.getElementById('input')
        const emitBtn: any= document.getElementById('emitBtn')
        const subscribeBtn: any = document.getElementById('subscribeBtn')

        const value$ = new Subject<string>();



        // это
        // fromEvent(emitBtn, 'click').subscribe(
        //     () => {
        //         value$.next(input.value)
        //     }
        // );

        // и это работает одинаково
        fromEvent(emitBtn, 'click').pipe(
            map(() => input.value)
        ).subscribe(value$);






        fromEvent(subscribeBtn, 'click').subscribe(
            () => {
                console.log('New subscription')
                value$.subscribe(value => console.log(value))
            }
        );
    }, [])
    
    return <div className={s.formWrap}>
            <div className="inputWrap">
                <input id="input" type="text" />
                <button id="emitBtn">Emit</button>
            </div>
            <button id="subscribeBtn">Subscribe</button>
    </div>
}