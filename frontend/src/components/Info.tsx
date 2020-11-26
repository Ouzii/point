import React from 'react'
import { INFO_TYPE } from '../config/enums'

type InfoProps = {
    type: number
    nextStep: () => void
}
// Info text for different types of tasks
// type = type of task
// nextStep = callback for advancing
export default ({ type, nextStep }: InfoProps) => {

    const renderInfoText = () => {
        if (type === INFO_TYPE.TIME_GUESS) {
            return <div>
                <h1>Tässä osiossa klikkaillaan palloja.</h1>
                <h1>Kun niitä on klikkailtu seuraa vaihe, jossa arvioidaan kauanko tehtävä vei aikaa.</h1>
                <h1>Tämä toistuu useita kertoja. Setin läpäiseminen edellyttää satoja klikkauksia.</h1>
                <h1>Arvioitu suoritusaika on välineestä riippuen puolesta tunnista tuntiin.</h1>
                <h1>Ensimmäiset kaksi tehtävää ovat harjoituksia. Harjoituksien aikana ruudun yläreunassa lukee "HARJOITUS".</h1>
            </div>
        } else if (type === INFO_TYPE.TIME_COMPARISON) {
            return <div>
                <h1>Tässäkin osiossa klikkaillaan palloja.</h1>
                <h1>Tuplasti enemmän kuin edellisessä osiossa, sillä settejä on aina A ja B.</h1>
                <h1>Klikkailua seuraa osio, jossa verrataan kahden setin tekemiseen kulunutta aikaa keskenään.</h1>
                <h1>Tämä toistuu useita kertoja.</h1>
                <h1>Huolellisuus palkitaan ja kaikki tehtävät huolellisesti suorittaneet osallistujat palkitaan mahdollisuudella osallistua vihreillä palloilla tehtävään kokeeseen.</h1>
                <h1>Tutkimuksen tuloksia hyödynnetään tieteellisessä tutkimuksessa.</h1>
                <h1>Klikkauksia punaisiin palloihin jäljellä: 384</h1>
                <h1>Ensimmäiset kaksi tehtävää ovat harjoituksia. Harjoituksien aikana ruudun yläreunassa lukee "HARJOITUS".</h1>
            </div>
        }
    }

    return (
        <div style={{ marginTop: -300 }}>
            {renderInfoText()}
            <button onClick={() => nextStep()}>Jatka</button>
        </div>
    )
}