import PlansList from '@components/form/steps/PlansList';
import OptionCard from "@components/element/OptionCard";
import { useContext, useEffect, useState, useRef } from 'react';
import { AppContext } from '@context/AppContext';
import { DB } from '@lib/database';
import useStorage from '@hooks/useStorage';

export default function StepOne() {
    const productListContainer = useRef(null)
    const { user, setStep } = useContext(AppContext)
    const [ plans, setPlans ] = useState({})
    const [ planSelection, setPlanSelection ] = useState(null)

    const { setItem, getItem, KEYS } = useStorage()
    const { PLAN_SELECTION } = KEYS;

    const handlePlanTypeSelection = (planType) => {
        const plan_selection = { planType }
        setPlanSelection(plan_selection)
        setItem(PLAN_SELECTION, plan_selection)
        setTimeout(() => {
            productListContainer.current.scrollIntoView({ behavior: 'smooth' })
        }, 200)
    }

    const handleProductSelection = (product) => {
        const plan_selection = { ...planSelection, product }
        setPlanSelection(plan_selection)
        setItem(PLAN_SELECTION, plan_selection)
        setStep(2)
    }

    // get plans from API if user is already set and plans are not loaded
    useEffect(() => {
        if(user && !plans.list) {
            DB('plans').get().then((response) => {
                if(!response.error) {
                    setPlans(response)
                    const plan_selection = getItem(PLAN_SELECTION)
                    if(plan_selection) {
                        setPlanSelection(plan_selection)
                    }
                }
            })
        }
    }, [])

    // plans type list
    const plansTypeList = [
        {
            id: 1,
            title: "Para mí",
            description: "Cotiza tu seguro de salud y agrega familiares si así lo deseas.",
            image: "/img/single-user.svg",
            type: "forMe"
        },
        {
            id: 2,
            title: "Para alguien más",
            description: "Realiza una cotización para uno de tus familiares o cualquier persona.",
            image: "/img/add-user.svg",
            type: "forSomeoneElse"
        }
    ]

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
                    {plansTypeList.map((option) => (
                        <OptionCard 
                            key={option.id}
                            onClick={() => handlePlanTypeSelection(option.type)}
                            title={option.title}
                            description={option.description}
                            image={option.image}
                            active={planSelection?.planType === option.type}
                        />
                    ))}
                </div>
            </div>

            <div ref={productListContainer}>
            { planSelection && 
                <PlansList 
                    plans={plans} 
                    planSelection={planSelection} 
                    handleProductSelection={handleProductSelection}
                /> 
            }
            </div>
        </>
    )
}