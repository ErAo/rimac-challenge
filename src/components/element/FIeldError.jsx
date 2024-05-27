export default function FieldError({ errors, name }) {
    const handleError = (errors) => {
        const errorKey = name
        const errorValue = errors[errorKey]
        return errorValue?.message ? errorValue.message : false
    }

    return (
        handleError(errors) &&
        <div className='form__errors'>
            {handleError(errors)}
        </div>
    )
}