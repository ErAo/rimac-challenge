import PlansList from '@components/form/steps/PlansList';
import OptionCard from "@components/element/OptionCard";
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '@context/AppContext';
import { DB } from '@lib/database';
import useStorage from '@hooks/useStorage';

export default function StepOne() {
    const { user, setStep } = useContext(AppContext)
    const [ plans, setPlans ] = useState({})
    const [ planSelection, setPlanSelection ] = useState(null)
    const { setItem, getItem } = useStorage()

    const handleClick = (forMe) => {
        const plan_selection = { forMe }
        setPlanSelection(plan_selection)
        setItem('plan_selection', plan_selection)
    }

    const handleProductSelection = (product) => {
        const plan_selection = { ...planSelection, product }
        setPlanSelection(plan_selection)
        setItem('plan_selection', plan_selection)
        setStep(2)
    }

    useEffect(() => {
        if(user && !plans.list) {
            DB('plans').get().then((response) => {
                if(!response.error) {
                    setPlans(response)
                    const plan_selection = getItem('plan_selection')
                    if(plan_selection) {
                        setPlanSelection(plan_selection)
                    }
                }
            })
        }
    }, [])

    return (
        <>
            <div className="plans-steps__type">
                <div className="plans-steps__header">
                    <h2 className="plans-steps__header__title">
                        {user?.name} ¿Para quién deseas cotizar?
                    </h2>
                    <p className="plans-steps__header__description">
                        Selecciona la opción que se ajuste más a tus necesidades.
                    </p>
                </div>
                <div className="plans-steps__options">
                    <OptionCard 
                        onClick={()=> handleClick(true)}
                        title="Para mí"
                        description="Cotiza tu seguro de salud y agrega familiares si así lo deseas."
                        image="img/single-user.svg"
                        active={planSelection?.forMe}
                    />
                    <OptionCard 
                        onClick={()=> handleClick(false)}
                        title="Para alguien más"
                        description="Realiza una cotización para uno de tus familiares o cualquier persona."
                        image="img/add-user.svg"
                        active={!planSelection?.forMe && planSelection !== null}
                    />
                </div>
            </div>

            { planSelection && 
                <PlansList 
                    plans={plans} 
                    planSelection={planSelection} 
                    handleProductSelection={handleProductSelection}
                /> 
            }
        </>
    )
}