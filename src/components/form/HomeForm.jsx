import { useState } from "react"
import '@assets/sass/components/form/form.scss'
import { useForm } from "react-hook-form"
import useStorage from "@hooks/useStorage"
import { useNavigate } from "react-router-dom"
import { DB } from '@lib/database'

import { useContext } from "react"
import { AppContext } from "@context/AppContext"

import Input from "@components/element/Input"
import DropDown from "@components/element/DropDown"
import InputCheck from "../element/InputCheck"
import FieldError from "../element/FIeldError"

export default function HomeForm() {
    const { setUser, ageByDate } = useContext(AppContext);
    let navigate = useNavigate();
    const [formData, setFormData] = useState({})
    const { setItem, KEYS } = useStorage()
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm(formData);

    // handle errors
    const hasError = (field) => errors[field] ? ' form__control--error' : ''

    // handle form submit event
    const onSubmitForm = (data) => {
        setFormData({...data})
        setItem(KEYS.FORM_QUOTE, data)
        DB('user').get().then((response) => {
            if(!response.error) {
                setUser({
                    ...response,
                    ...data,
                    age: ageByDate(response.birthDay)
                })
                navigate('/plans')
            }
        })
    }

    // check document type value
    const watchDocumentType = watch("documentType", "dni")
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
            value: DNISelected ? /^[0-9]{8}$/ : /^[0-9]{2}[0-9]{8}[0-9]{1}$/,
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
        },
        pattern: {
            value: /^[0-9]{9}$/,
            message: 'El número de celular no es válido'
        }
    }

    const legalsValidation = {
        required: {
            value: true,
            message: 'Debes aceptar los términos y condiciones'
        }
    }

    return (
        <form className="form" onSubmit={handleSubmit(onSubmitForm)} >
            
            <div className="form__group">
                <div className={`form__control${hasError('documentType')}`}>
                    <DropDown 
                        options={[
                            {name: 'DNI', value: 'dni'},
                            {name: 'RUC', value: 'ruc'},
                        ]}
                        name="documentType"
                        updateValue={setValue}
                        validation={{}}
                        register={register}
                        defaultValue="dni"
                    />
                </div>
                <div className={`form__control${hasError('documentNumber')}`}>
                    <Input 
                        label="Nro. de documento"
                        placeholder={DNISelected ? 'Ejem: 12345678' : 'Ejem: 0012345680'} 
                        type="text"
                        inputMode="numeric"
                        name="documentNumber"
                        updateValue={setValue}
                        validation={documentNumberValidation}
                        register={register} />
                </div>
            </div>

            <FieldError errors={errors} name="documentNumber" />

            <div className={`form__control${hasError('phone')}`}>
                <Input 
                    label="Celular"
                    placeholder="Ejem: 999333555"
                    type="tel" 
                    name="phone"
                    updateValue={setValue}
                    inputMode="numeric"
                    validation={phoneValidation}
                    register={register} />
            </div>

            <FieldError errors={errors} name="documentNumber" />

            <div className="form__legals">
                <div className={`form__selector${hasError('legals_privacy')}`}>
                    <InputCheck 
                        label='Acepto lo Política de Privacidad'
                        name={'legals_privacy'}
                        validation={legalsValidation}
                        register={register}
                    />
                </div>

                <div className={`form__selector${hasError('legals_campaigns')}`}>
                    <InputCheck 
                        name={'legals_campaigns'}
                        validation={legalsValidation}
                        register={register}
                        label='Acepto la Política Comunicaciones Comerciales'
                    />  
                </div>

                <a href="#" className="form__legals__link">Aplican Términos y Condiciones.</a>
            </div>

            <button className="form__button">Cotiza aquí</button>
        </form>
    )
}