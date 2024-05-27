import { useState, useEffect } from 'react';
import '@assets/sass/components/element/dropdown.scss'

export default function DropDown({
    options,
    name,
    updateValue,
    validation,
    register,
    defaultValue,
    ...props
}) {
    const getDefaultValue = () => {
        if(defaultValue) {
            return options.find(option => option.value === defaultValue)?.name
        }
        return ''
    }
    const [active, setActive] = useState(false)
    const [ selected, setSelected ] = useState(getDefaultValue())
    
    const handleSelect = (e) => {
        e.stopPropagation();
        setSelected(e.target.dataset.name)
        updateValue(name, e.target.value)
        setActive(false)
    }

    const handleActive = () => {
        setActive(!active)
    }

    useEffect(() => {
        const reset = (e) => {
            e.stopPropagation();
            const dropdown = e?.target?.closest('.dropdown')
            if(!dropdown) {
                setActive(false)
            }
        }
        document.addEventListener('click', reset)

        return () => {
            document.removeEventListener('click', reset)
        }
    }, [])

    return (
        <div className='dropdown'>
            <div className="dropdown__selected" onClick={handleActive}>
                <span className="dropdown__selected__value">
                    {selected}
                </span>
            </div>
            <div className={`dropdown__drop${active ? ' dropdown__drop--active' : ''}`}>
                <div className={`dropdown__options`}>
                    {options.map((option, index) => (
                        <label className="dropdown__option" key={index}>
                            <input 
                                defaultChecked={defaultValue === option.value}
                                onClick={handleSelect}
                                type='radio'
                                name={name}
                                value={option.value}
                                data-name={option.name}
                                {...register(name, validation)} 
                                {...props}
                            />
                            <span className='dropdown__option__label'>{option.name}</span>
                        </label>
                    ))}
                </div>
            </div>
        </div>
    )
}