import Img from '@components/element/Img';
import Check from '@assets/img/ic_check.svg?react';
import '@assets/sass/components/element/option-card.scss';

export default function OptionCard({title, description, image, onClick, active = false}) {
    return (
        <div className={`option-card${active ? ' active' : ''}`} onClick={onClick}>
            <div className="option-card__marker">
                <div className="option-card__marker__circle">
                    <Check />
                </div>
            </div>
            <div className="option-card__title">
                <Img 
                    src={image} 
                    alt={title} 
                    className='option-card__title_img'
                />
                <h3 className='option-card__title_text'>
                    {title}
                </h3>
            </div>
            <div className="option-card__description">
                <p className="option-card__description_text">
                    {description}
                </p>
            </div>
        </div>
    )
}