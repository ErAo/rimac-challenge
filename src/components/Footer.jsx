import Img from '@components/element/Img';
import '@assets/sass/components/footer.scss';
export default function Footer() {
    return (
        <footer className='footer'>
            <Img 
                src="/img/logo-white-mobile.png" 
                alt="Logo" 
                className="logo" 
                breakpoints={[{ minWidth: 768, src: '/img/logo-white.png' }]}
            />
            
        </footer>
    )
}