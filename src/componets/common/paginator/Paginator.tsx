import React, { useState } from "react"
import s from "./Paginator.module.css"

type paginatorPropsType = {
    usersCount: number | null
    pageSize: number
    term: string
    isFriend: boolean
    currentPage: number
    currentPorsion: number

    setCurrentPorsion: any
    setCurrentPage: any
    getUsers: (pageNumber: number, term: string, isFriend: boolean) => void
}

export const Paginator = React.memo((props: paginatorPropsType) => {

    const pagesCount: number | null = props.usersCount && Math.ceil(props.usersCount / props.pageSize)

    const porsionSize = 5;
    const porsionsCount = pagesCount && Math.ceil(pagesCount / porsionSize)

    let leftPorsionPageNumber = props.currentPorsion * porsionSize - porsionSize
    let rightPorsionPageNumber = props.currentPorsion * porsionSize

    let pagesNumbers = []
    if (pagesCount) {
        for (let i = 1; i <= pagesCount; i++) {
            pagesNumbers.push(i)
        }
    }

    const pages = pagesNumbers
    .filter((p) => p > leftPorsionPageNumber && p <= rightPorsionPageNumber )
    .map(p => {
        return <span key={p} className={s.page + ' ' + (props.currentPage === p ? s.currentPage : '')}
            onClick={() => {
            props.getUsers(p, props.term, props.isFriend);
            props.setCurrentPage(p);
            }}>
            {p}
        </span>
    })

    return <div className={s.paginator}>
        { props.currentPorsion > 1 && <span
            className={s.arrows} 
            onClick={() => props.setCurrentPorsion((prev: number) => prev - 1)}>
            {'\u2B05'}
        </span>}
        <span className={s.pages}>{pages}</span>
        { porsionsCount && props.currentPorsion < porsionsCount && <span
            className={s.arrows} 
            onClick={() => props.setCurrentPorsion((prev: number) => prev + 1)}>
            {'\u27A1'}
        </span>}
    </div>
})