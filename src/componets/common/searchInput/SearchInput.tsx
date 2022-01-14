import React from "react";
import s from "./SearchInput.module.css"

type propsType = {
    value: string
    placeholder: string
    onChange: any
    onKeyPress: any
}

export const SearchInput = (props: propsType) => {
    return (
        <div className={s.searchUsers}>
            <input value={props.value} 
                onChange={props.onChange}
                placeholder={props.placeholder}
                onKeyPress={props.onKeyPress} />
            {/* @ts-ignore */}
            <ion-icon name="search-outline"></ion-icon>
        </div>
    )
}