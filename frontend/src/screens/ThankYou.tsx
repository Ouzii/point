import React, { useEffect } from 'react'
import { clearLocalStorage } from '../functions/LocalDataHandler'

export default () => {

    useEffect(() => {
        // Clear data from localStorage
        clearLocalStorage()
    }, [])
    return <div>Kiitos osallistumisestasi! Voit nyt sulkea selainikkunan.</div>
}