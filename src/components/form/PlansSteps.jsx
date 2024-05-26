import StepOne from "@components/form/steps/StepOne"
import StepTwo from "@components/form/steps/StepTwo"
import ChevronLeft from '@assets/img/chevron-left.svg?react'
import '@assets/sass/components/form/plans-steps.scss'

export default function PlansSteps({handleButton, step}) {
    return (
        <>
            <div className='container plans-steps'>
                <button onClick={handleButton} className="button-back plans-steps__button">
                    <ChevronLeft width={20} height={20}/>
                    <span>
                        Volver
                    </span>
                </button>
                {step === 1 && <StepOne />}
                {step === 2 && <StepTwo />}
            </div>
        </>
    )
}