import React, { useEffect } from "react";
import {forkJoin, Observable} from 'rxjs';
import { filter, map } from 'rxjs/operators';
import s from "./RxjsLearn.module.css";
import {ajax} from 'rxjs/ajax';

export const RxjsLearn = () => {

    interface NewsItem {
        category: 'Business' | 'Sports';
        content: string;
    }
   
    // useEffect(() => {
    //     const newsFeed$ = new Observable<NewsItem>(subscriber => {
    //         setTimeout(() => {
    //             subscriber.next({category: 'Business', content: 'A'});
    //         }, 1000)
    //         setTimeout(() => {
    //             subscriber.next({category: 'Sports', content: 'B'});
    //         }, 3000)
    //         setTimeout(() => {
    //             subscriber.next({category: 'Business', content: 'C'});
    //         }, 4000)
    //         setTimeout(() => {
    //             subscriber.next({category: 'Sports', content: 'D'});
    //         }, 6000)
    //         setTimeout(() => {
    //             subscriber.next({category: 'Business', content: 'E'});
    //         }, 7000)
    //     }) 

    //     const newsSportsFeed$ = newsFeed$
    //         .pipe(filter(item => item.category === 'Sports'));
        
    //     newsSportsFeed$.subscribe(item => console.log(item));
    // }, [])

    useEffect(() => {
        const randomName$ = ajax(
            //@ts-ignore
            'https://random-data-api.com/api/name/random_name').pipe(map(res => res.response.first_name)
            );
    
        const randomCapital$ = ajax(
            //@ts-ignore
            'https://random-data-api.com/api/nation/random_nation').pipe(map(res => res.response.capital)
            );
    
        const randomFood$ = ajax(
            //@ts-ignore
            'https://random-data-api.com/api/food/random_food').pipe(map(res => res.response.dish)
            );

        forkJoin([randomName$, randomCapital$, randomFood$]).subscribe(
            ([firstName, capital, dish]) => console.log(
                //@ts-ignore
                `${firstName} is from ${capital} and likes to eat ${dish}.`
            )
        )
        
    }, [])

    
    
    return <div>

    </div>
}