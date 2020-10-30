import React, { useEffect } from 'react'
import { clearLocalStorage } from '../functions/LocalDataHandler'

export default () => {

    useEffect(() => {
        clearLocalStorage()
    }, [])
    return <div>Kiitos osallistumisestasi! Voit nyt sulkea selainikkunan.</div>
}