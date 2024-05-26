import Img from '@components/element/Img';
import '@assets/sass/components/element/product-card.scss';

export default function ProductCard({product, onClick, image}) {
    const {
        title,
        shortDescription,
        services,
        amount,
        discountPercentage,
        recommended
    } = product;

    // Calculate the discount
    const calcDiscount = (amount) => {
        if (!discountPercentage) return amount;
        return amount - (amount * discountPercentage / 100);
    }

    return (
        <div className='product-card'>
            {recommended &&
                <span className="product-card__recommended tag">
                    Plan recomendado
                </span>
            }
            <div className="product-card__header">
                <div className="product-card__header__content">
                    <h3 className='product-card__title'>
                        {title}
                    </h3>
                    <div className="product-card__price">
                        <span className='product-card__price__text'>
                            Costo del plan
                        </span>
                        {discountPercentage && 
                            <span className='product-card__price__discount'>
                                ${amount}% antes
                            </span>
                        }
                        <span className='product-card__price__value'>
                            ${calcDiscount(amount)} al mes
                        </span>
                    </div>
                </div>
                <Img 
                    src={image} 
                    alt={title} 
                    className='product-card__header__img'
                />
            </div>
            <hr className='product-card__separator' />
            <div className="product-card__description">
                {shortDescription && <p className="product-card__description_text">
                    {shortDescription}
                </p>}
                {services &&
                    <ul className="product-card__services">
                        {services?.map((service, index) => (
                            <li key={index} className="product-card__services__service">
                                <span className={`product-card__services__service_icon`} style={
                                    {'--service-icon': `url('/img/checked-black.svg')`}
                                }></span>
                                <span className='product-card__services__service_text'>
                                {service}
                                </span>
                            </li>
                        ))}
                    </ul>
                }
            </div>
            <button onClick={onClick} className="product-card__button">
                Seleccionar Plan
            </button>
        </div>
    )
}