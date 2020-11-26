import React, { useState } from 'react'
import { getLocalData, setLocalData } from '../functions/LocalDataHandler'
import { updateUser } from '../services/userService'

type QuizProps = {
    nextStep: () => void
}
// Component for asking user information
// nextStep = callback for advancing in app
export default ({ nextStep }: QuizProps) => {

    const [formValues, setFormValues] = useState({ age: '18', gender: 'none', inputDevice: 'mouse' })

    const onChange = (e: React.FormEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault()

        setFormValues({ ...formValues, [e.currentTarget.name]: e.currentTarget.value })
    }

    const onSubmit = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault()
        // Set given values to localStorage
        const currentLocalData = getLocalData()
        currentLocalData.age = Number.parseInt(formValues.age)
        currentLocalData.gender = formValues.gender
        currentLocalData.inputDevice = formValues.inputDevice

        // Send the data to backend. If succeeds, update local
        if (sendUserUpdate({ id: currentLocalData.id, ...formValues })) setLocalData(currentLocalData)

        nextStep()
    }

    const sendUserUpdate = async (data: { id: number, age: string, gender: string, inputDevice: string }) => {
        const res = await updateUser(data)
        if (res) return true
        return false
    }
    return (
        <div style={{ width: '50%', height: '60%', display: "flex", justifyContent: 'center', alignItems: 'center' }}>
            <form style={{ display: "flex", height: 200, flexDirection: "column", justifyContent: 'space-around' }}>
                <label>Ikä</label>
                <input type="number" name="age" value={Number.parseInt(formValues.age)} onChange={onChange} min={18} />
                <label>Sukupuoli</label>
                <select name="gender" value={formValues.gender} onChange={onChange}>
                    <option value="male">Mies</option>
                    <option value="female">Nainen</option>
                    <option value="none">En halua sanoa / muu</option>
                </select>
                <label>Syöttölaite</label>
                <select name="inputDevice" value={formValues.inputDevice} onChange={onChange}>
                    <option value="mouse">Hiiri</option>
                    <option value="touchpad">Kosketuslevy</option>
                    <option value="touchscreen">Kosketusnäyttö</option>
                    <option value="other">Muu</option>
                </select>
                <input type="submit" onClick={onSubmit} value="Jatka" style={{ marginTop: 10 }} />
            </form>
        </div>
    )
}