import { rejects } from "assert";
import React, { useEffect, useState } from "react";
import {combineLatest, forkJoin, from, fromEvent, interval, Observable, of, timer} from 'rxjs';
import s from "./RxjsLearn.module.css";
import {ajax} from "rxjs/ajax";

export const RxjsLearn = () => {
    const [help, setHelp] = useState(0);
   
    // forkJoin-Observable that emittes successfully
    useEffect(() => {
        const input: any = document.getElementById('t-input');
        const select: any = document.getElementById('conv-select');
        const result = document.getElementById('result-text');
        console.log(result?.innerText);

        if (input && select && result) {
            const inputEv = fromEvent(input, 'input');
            const selectEv = fromEvent(select, 'input');

            combineLatest([inputEv, selectEv]).subscribe(
                ([temperature, conversion]: any[]) => {
                    const temp = temperature.target.value;
                    if (conversion.target.value === "f-to-c") {
                            result.innerText = String(Number(temp - 32) * 5/9);
                    } else if (conversion.target.value === "c-to-f") {
                        result.innerText = String(Number(temp * 9/5 + 32));
                    } else {
                        result.innerText = "Please choose conversion";
                    }
                    console.log(temp, conversion.target.value)
                }
            )
        }
        
        
    }, [])

    
    
    return <div>
        <div className={s.temperature}>
            <input type="text" id="t-input" placeholder="Temperature" />
            <br />
            <select id="conv-select">
                <option value="">Choose version</option>
                <option value="f-to-c">F -&gt; C</option>
                <option value="c-to-f">C -&gt; F</option>
            </select>
            <br />
            <p id="result-text">Please fill the above form</p>
        </div>
    </div>
}