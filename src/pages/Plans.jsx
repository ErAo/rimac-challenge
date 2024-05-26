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
    const [ loading, setLoading ] = useState(true);
    const { 
        setUser, 
        user, 
        ageByDate,
        setStep, 
        step,
        stepLoading
    } = useContext(AppContext);
    const { getItem, KEYS, setItem, clear: clearStorage } = useStorage()
    const { FORM_QUOTE, PLAN_SELECTION } = KEYS
    const plan_selection = getItem(PLAN_SELECTION)
    const hasResume = plan_selection && plan_selection.product
    const currentStep = plan_selection?.step;

    const navigate = useNavigate();

    // control steps navigation
    const changeStep = (newStep) => {
        if(newStep === step) return

        setItem(PLAN_SELECTION, {
            ...plan_selection,
            step: newStep
        })

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })

        setStep(newStep)
    }

    const handleButtonBack = (e) => {
        e.preventDefault()
        if(step > 1) {
            return changeStep(step - 1)
        } else {
            navigate('/')
        }
    }

    const handleStep = (newStep) => {
        if(newStep <= step || hasResume){
            changeStep(newStep)
        }
    }

    const checkStep = () => {
        if(currentStep) {
            setStep(currentStep)
        }else if(hasResume) {
            setStep(2)
        }else  {
            setStep(1)
        }
    }
    // Validate if user has been set and form quote is saved
    useEffect(() => {
        const form_quote = getItem(FORM_QUOTE)
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
                    checkStep()
                    setLoading(false)
                }
            })
        }else {
            checkStep()
            setLoading(false)
        }
    }, [])

    // step list
    const steps = [
        {
            id: 1,
            step: 1, 
            active: step === 1, 
            handle: handleStep, 
            text: 'Planes y coberturas'
        },
        {
            id: 2,
            step: 2, 
            active: step === 2, 
            handle: handleStep, 
            text: 'Resumen'
        }
    ]

    return (
        <Layout gradients={false} footer={false}>
            {stepLoading && <Loader />}
            {
                loading ? <Loader /> : (
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