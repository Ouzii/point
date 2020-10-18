import React from 'react'

type WelcomeProps = {
    nextStep: () => void
}
export default ({ nextStep }: WelcomeProps) => {
    return <div>
        <h1>Tervetuloa klikkaamaan palloja, kiva kun osallistut</h1>
        <p>Ensimmäiseksi tehtävänä on klikata ensin yhtä palloa, sitten toista. Tämä toistetaan useita kertoja.</p>
        <p>Tehtävän toisessa vaiheessa arvioidaan kuinka kauan suorituksissa kesti, arvio suoritetaan klikkaamalla.</p>
        <button onClick={nextStep}>Jatka</button>
    </div>
}