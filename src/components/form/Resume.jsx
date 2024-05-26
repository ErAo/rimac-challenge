import UsersIcon from '@assets/img/users.svg?react';
import { useContext } from 'react';
import { AppContext } from '@context/AppContext';
import useStorage from '../../hooks/useStorage';
import '@assets/sass/components/form/resume.scss';

export default function Resume() {
    const { user } = useContext(AppContext);

    const { getItem, KEYS } = useStorage();
    const { PLAN_SELECTION, FORM_QUOTE } = KEYS

    const plan_selection = getItem(PLAN_SELECTION)
    const form_quote = getItem(FORM_QUOTE)

    const product = plan_selection?.product;
    const discountPercentage = product?.discountPercentage;

    /// calculate discount percentage form product amount 
    const calcDiscount = (amount) => {
        if (!discountPercentage) return amount;
        return amount - (amount * discountPercentage / 100);
    }

    return (
        <div className="resume">
            <h2 className='resume__title'>
                Resumen del seguro
            </h2>

            <div className="resume__wrapper">
                <div className="resume__box">
                    <div className="resume__header">
                        <h4 className='resume__header__subtitle'>Precios calculados para:</h4>
                        <h3 className='resume__header__title'>
                            <UsersIcon />
                            <span>
                            {user?.name} {user?.lastName}
                            </span>
                        </h3>
                    </div>
                    <hr className='resume__separator'/>
                    <div className="resume__block">
                        <h3 className='resume__block__title'>
                            Responsable de pago
                        </h3>
                        <ul className='resume__block__list'>
                            <li className='resume__block__item'>{form_quote?.documentType.toUpperCase()}: <span>{form_quote?.documentNumber}</span></li>
                            <li className='resume__block__item'>Celular: <span>{form_quote?.phone}</span></li>
                        </ul>
                    </div>

                    <div className="resume__block">
                        <h3 className='resume__block__title'>Plan elegido</h3>
                        <ul className='resume__block__list'>
                            <li className='resume__block__item'>{product?.title}</li>
                            <li className='resume__block__item'>
                                Costo del Plan: <span className={discountPercentage ? 'line-through' : ''}>${product?.amount}</span> {discountPercentage && `$${calcDiscount(product?.amount)}`} al mes
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}