import '@assets/sass/components/form/steps/steps-header.scss';
import ChevronLeft from '@assets/img/chevron-left.svg?react';
import DashedLine from '@assets/img/dashed-line.svg?react';

export default function StepsHeader({handleButton, progress, steps, step}) {
    return (
        <div className="steps-header">
            <div className="steps-header__wrapper container">
                <button className="steps-header__button button-back" onClick={handleButton}>
                    <ChevronLeft />
                </button>

                <div className="steps-header__block steps-header__block--desktop">
                    {steps?.map(({step, active, handle, text}) => (
                        <div className={`steps-header__block__step${active ? ' active' : ''}`} key={step}>
                            <button onClick={()=> handle(step)} className='steps-header__block__step__button'> 
                                <span className="steps-header__block__step__number">{step}</span>
                                {text}
                                { step < steps.length &&
                                    <DashedLine />
                                }
                            </button>
                        </div>
                    ))}
                </div>

                <div className="steps-header__block steps-header__block--mobile">
                    <p className="steps-header__subtitle">Paso {step} de {steps?.length || 0}</p>
                    <div className="steps-header__progress">
                        <div className="steps-header__progress__bar">
                            <div className="steps-header__progress__bar__fill" style={{width: `${progress}%`}}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}