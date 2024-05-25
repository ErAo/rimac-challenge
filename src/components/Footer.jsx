import Img from '@components/element/Img';
import '@assets/sass/components/footer.scss';
export default function Footer() {
    const copyDateYear = new Date().getFullYear()
    return (
        <footer className='footer'>
            <div className="footer__wrapper container">
                <a href="/" className='footer__logo__link'>
                    <Img 
                        src="/img/logo-white-mobile.png" 
                        alt="Logo RIMAC footer" 
                        className="footer__logo__img" 
                        breakpoints={[{ minWidth: 768, src: '/img/logo-white.png' }]}
                    />
                </a>
                <hr className='footer__separator' />
                <div className="footer__copyright">
                    <p>© {copyDateYear} RIMAC Seguros y Reaseguros.</p>
                </div>
            </div>
            
        </footer>
    )
}