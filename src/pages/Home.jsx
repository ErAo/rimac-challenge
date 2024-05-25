import Img from '@components/element/Img';
import '@assets/sass/pages/home.scss';
import HomeForm from '@components/form/HomeForm';

export default function Home() {
    return (
        <>
            <div className="container">
                <div className="home-form">
                    <div className="home-form__header">
                        <span className='tag tag--gradient home-form__subtitle'>Seguro Salud Flexible</span>
                        <h1 className='home-form__title'>Creado para ti y tu familia</h1>
                    </div>
                    <div className="home-form__img">
                        <Img src="img/home-img-mobile.png" breakpoints={
                            [
                                { minWidth: 768, src: '/img/home-img.png' }
                            ]
                        } alt="Imagen de fondo" />
                    </div>
                    <hr className='home-form__separator' />
                    <div className="home-form__body">
                        <p className="home-form__description">
                            Tú eliges cuánto pagar. Ingresa tus datos, cotiza y recibe nuestra asesoría. 100% online.
                        </p>
                        <div className="home-form__form">
                            <HomeForm />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}