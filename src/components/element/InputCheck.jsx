import '@assets/sass/components/element/input-check.scss'
export default function InputCheck({ 
    label, 
    name,
    hasError,
    type = 'checkbox',
    register, 
    validation, 
    ...props 
}) {

    return (
        <label className="input-check">
            <input 
                className="input-check__input" 
                type={type}
                placeholder="999333555"
                {...register(name, validation)}
                {...props}
                />
            <span className="input-check__fake-checkbox"></span>
            <span className="input-check__label">{label}</span>
        </label>
    )
}