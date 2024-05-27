import { useState } from 'react'
import '@assets/sass/components/element/input.scss'

export default function Input({
    label, 
    labelClass = '', 
    inputMode = false, 
    validation = {},
    updateValue = () => {},
    className,
    register,
    ...props}) {

    const [value, setValue] = useState('')

    const removeLetters = (currentValue) => {
        return isNaN(currentValue) ? value : currentValue
        
    }

    const handleKeyUp = (e) => {
        if(inputMode === 'numeric') {
            const newValue = removeLetters(e.target.value)
            setValue(newValue)
            updateValue(props.name, newValue)
        }
    }

    return (
        <label className='input-text'>
            <input 
                className={className ? className : `input-text__input${value.length > 0 ? ' input-text__input--active' : ''}`}
                {...props} 
                {...register(props.name, validation)} onKeyUp={handleKeyUp}/>
            <span className={labelClass ? labelClass : `input-text__label`} data-label={label}>
                {label}
            </span>
        </label>
    )
}