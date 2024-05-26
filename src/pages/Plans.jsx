import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '@context/AppContext';
import { DB } from '@lib/database';
import useStorage from '@hooks/useStorage';

import '@assets/sass/pages/plans.scss'

import Layout from '@layouts/Layout';
import PlansSteps from '@components/form/PlansSteps';
import StepsHeader from '@components/form/steps/StepsHeader';
import Loader from '@components/element/Loader';

export default function Plans() {
    const [ isLoading, setIsLoading ] = useState(true)
    const { setUser, user, ageByDate, setStep, step } = useContext(AppContext);
    const { getItem } = useStorage()

    const navigate = useNavigate();

    const handlePrevStep = () => {
        if(step > 1) return setStep(step - 1)
        else navigate('/')
    }

    const handleButtonBack = (e) => {
        e.preventDefault()
        handlePrevStep()
    }

    const handleStep = (newStep) => {
        const plan_selection = getItem('plan_selection')
        const hasResume = plan_selection && plan_selection.product
        if(newStep <= step || hasResume){
            setStep(newStep)
        }
    }

    const steps = [
        {
            step: 1, 
            active: step === 1, 
            handle: handleStep, 
            text: 'Planes y coberturas'
        },
        {
            step: 2, 
            active: step === 2, 
            handle: handleStep, 
            text: 'Resumen'
        }
    ]

    useEffect(() => {
        const form_quote = getItem('form_quote')
        if(!user && !form_quote){
            navigate('/')
        }

        if(!user && form_quote) {
            DB('user').get().then((response) => {
                if(!response.error) {
                    setUser({
                        ...response,
                        ...form_quote,
                        age: ageByDate(response.birthDay)
                    })
                    setIsLoading(false)
                }
            })
        }

        if(user && form_quote){
            setIsLoading(false)
        }

    }, [])

    return (
        <Layout gradients={false} footer={false}>
            {
                isLoading ? <Loader /> : (
                    <>
                        <StepsHeader 
                            handleButton={handleButtonBack}
                            progress={(step * 100) / steps.length}
                            steps={steps}
                            step={step}
                        />
                        <PlansSteps 
                            handleButton={handleButtonBack}
                            step={step}
                        />
                    </>
                )
            }
        </Layout>
    )
}