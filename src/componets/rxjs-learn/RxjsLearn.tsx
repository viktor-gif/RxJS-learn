import React, { useEffect } from "react";
import { fromEvent, of} from 'rxjs';
import { filter, map, tap, debounceTime } from 'rxjs/operators';
import s from "./RxjsLearn.module.css";

export const RxjsLearn = () => {

    interface NewsItem {
        category: 'Business' | 'Sports';
        content: string;
    }
   
    // tap
    // useEffect(() => {
    //     of(1, 7, 3, 6, 2)
    //     .pipe(
    //         filter(val => val > 5),
    //         tap({
    //             next: value => console.log('Spy: ', value)
    //         }),
    //         map(val => val * 2),
    //     )
    //     .subscribe(value => console.log('Output: ', value));

        // Starting from RxJS 7.3.0, the tap() operator can do even more. You can see when the 
        // Subscription starts and ends at the level of the tap() operator.
        // of(1, 7, 3, 6, 2).pipe(
        //       tap({
        //         subscribe: () => console.log('New inner Subscription'),
        //         unsubscribe: () => console.log('Unsubscribed'),
        //         finalize: () => console.log('Inner Subscription ended')
        //       })
        //   ).subscribe(val => console.log(val)).unsubscribe();
    // }, [])

    //debounceTime
    useEffect(() => {
        const slider: any = document.getElementById('slider');
        console.log(slider)

        fromEvent(slider, 'input')
        .pipe(
            debounceTime(1000),
            // @ts-ignore
            map((event) => event.target.value)
        )
        .subscribe(value => console.log(value))
    }, [])
    
    
    return <div className={s.slider}>
        <input type="range" id="slider" />
    </div>
}