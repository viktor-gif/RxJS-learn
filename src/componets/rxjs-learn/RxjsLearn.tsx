import React, { ReactElement, useEffect, useState } from "react";
import { fromEvent, Subject, BehaviorSubject} from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import s from "./RxjsLearn.module.css";

export const RxjsLearn = () => {
    
    useEffect(() => {
        const loggedIn: any = document.querySelector('span#logged-in');
        const login: HTMLElement | null = document.querySelector('button#login')
        const logout: any = document.querySelector('button#logout')
        const printState: any = document.querySelector('button#print-state')

        const isLoggedIn$ = new BehaviorSubject<boolean>(false);
        // @ts-ignore
        fromEvent(login, 'click').subscribe(() => isLoggedIn$.next(true))
        fromEvent(logout, 'click').subscribe(() => isLoggedIn$.next(false))

        isLoggedIn$.subscribe(
            isLoggedIn => loggedIn.innerText = isLoggedIn.toString()
        )

        isLoggedIn$.subscribe(isLoggedIn => {
            logout.style.display = isLoggedIn ? 'block' : 'none'
            // @ts-ignore
            login.style.display = !isLoggedIn ? 'block' : 'none'
        })

        fromEvent(printState, 'click').pipe(
            withLatestFrom(isLoggedIn$)
        ).subscribe(
            ([event, isLoggedIn]) => console.log('User is logged in: ', isLoggedIn)
        )
    }, [])
    
    return <div className={s.subjects}>
            <div className={s.loggedIn_wrap}>logged in: <span id="logged-in"></span></div>
            <button id="login">Login</button>
            <button id="logout">Logout</button>
            <button id="print-state">Print state</button>
    </div>
}