import { useState } from "react"
import '@assets/sass/components/form/form.scss'
import { useForm } from "react-hook-form"

export default function HomeForm() {
    const [formData, setFormData] = useState({})
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm(formData);

    // watch field input
    const watchDocumentType = watch("documentType", "dni")

    // handle error class
    const hasError = (field) => errors[field] ? ' form__control--error' : ''

    // handle error message
    const handleError = (error) => {
        const errorKey = Object.keys(error)[0]
        const errorValue = error[errorKey]
        return errorValue?.message ? errorValue.message : ''
    }

    // handle form submit event
    const onSubmitForm = (data) => {
        setFormData({...data})
    }

    // check document type selection
    const DNISelected = watchDocumentType === 'dni'

    // inputs validations
    const documentNumberValidation = {
        required: {
            value: true,
            message: 'El Nro. de documento es obligatorio'
        },
        minLength: {
            value: DNISelected ? 8 : 11,
            message: `El documento debe tener al menos ${DNISelected ? 8 : 11} caracteres`
        },
        pattern: {
            value: DNISelected ? /^[0-9]{8}$/ : /^[0-9]{2} [0-9]{8} [0-9]{1}$/,
            message: 'El documento no es válido'
        }
    }

    const phoneValidation = {
        required: {
            value: true,
            message: 'El número de celular es obligatorio'
        },
        minLength: {
            value: 9,
            message: 'El número de celular debe tener al menos 9 caracteres'
        }
    }

    return (
        <form className="form" onSubmit={handleSubmit(onSubmitForm)} >
            
            <div className="form__group">
                <div className={`form__control${hasError('documentType')}`}>
                    <div className="form__control--select">
                        <select {...register('documentType')} className="form__control__field form__control__field--select">
                            <option value="dni">DNI</option>
                            <option value="ruc">RUC</option>
                        </select>
                    </div>
                </div>
                <div className={`form__control${hasError('documentNumber')}`}>
                    <label>
                        <span className="form__control__label">Nro. de documento</span>
                        <input 
                            placeholder={DNISelected ? '00000000' : '00 00000000 0'} 
                            className="form__control__field" 
                            type="text" 
                            {...register("documentNumber", documentNumberValidation)} />
                    </label>
                </div>
            </div>

            <div className={`form__control${hasError('phone')}`}>
                <label>
                    <span className="form__control__label">Celular</span>
                    <input 
                        placeholder="999333555"
                        type="tel"
                        className="form__control__field" 
                        {...register('phone', phoneValidation)} />
                </label>
            </div>

            <div className="form__legals">
                <label className="form__selector">
                    <input 
                        {...register('legals__privacy')}  
                        className="form__selector__field" 
                        type="checkbox" 
                        placeholder="999333555"/>
                    <span className="form__selector__checkbox"></span>
                    Acepto lo Política de Privacidad
                </label>

                <label className="form__selector">
                    <input 
                        {...register('legals__campaigns')}  
                        className="form__selector__field" 
                        type="checkbox" 
                        placeholder="999333555"/>
                    <span className="form__selector__checkbox"></span>
                    Acepto la Política Comunicaciones Comerciales
                </label>

                <a href="#" className="form__legals__link">Aplican Términos y Condiciones.</a>
            </div>
            
            {errors && <div className="form__errors">
                {handleError(errors)}
            </div>}

            <button className="form__button">Cotiza aquí</button>
        </form>
    )
}