import React, { useEffect } from "react";
import {ajax} from "rxjs/ajax";
import {Observable} from 'rxjs';
import s from './RxjsLearn.module.css';

export const RxjsLearn = () => {

    //cold observable
    // const ajax$ = ajax<any>('https://random-data-api.com/api/name/random_name');
    
    // ajax$.subscribe(data => {
    //     console.log('Sub1', data.response.first_name);
    // });
    // ajax$.subscribe(data => {
    //     console.log('Sub2', data.response.first_name);
    // });
    // ajax$.subscribe(data => {
    //     console.log('Sub3', data.response.first_name);
    // });

    

    //hot observable
    useEffect(() => {
        const helloButton = document.getElementById('hello');

        const helloClick$ = new Observable<MouseEvent>(sub => {
            helloButton?.addEventListener('click', (event) => {
                sub.next(event);
            });
        })
    
        helloClick$.subscribe(e => console.log('Sub1 ', e.x, e.y));

        setTimeout (() => {
            console.log('Hello');
            helloClick$.subscribe(e => console.log('Sub2 ', e.x, e.y));
        }, 5000)
        
    }, [])

    





    return <div>
        <button className={s.hello} id="hello">Hello!</button>
    </div>
}