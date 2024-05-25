import Img from '@components/element/Img';
import PhoneIcon from '@assets/img/phone-icon.svg?react';
import '@assets/sass/components/header.scss';

export default function Header() {
    return (
        <header className='header'>
            <div className="container header__wrapper">
                <a className="header__logo__link" href='/'>
                    <Img 
                        src="/img/logo.png" 
                        alt="Logo RIMAC header" 
                        className="header__logo__img" 
                        breakpoints={[{ minWidth: 768, src: '/img/logo.png' }]}
                    />
                </a>
                
                <nav className='header__nav'>
                    <div className='header__nav__item header__nav__item--desktop'>
                        <a className='header__nav__link'>¡Compra por este medio!</a>
                    </div>
                    <div className='header__nav__item'>
                        <a className='header__nav__link header__nav__link--primary' href="tel:(01) 411 6001">
                        <PhoneIcon width={20} height={20} /> (01) 411 6001
                        </a>
                    </div>
                </nav>
            </div>
        </header>
    )
}