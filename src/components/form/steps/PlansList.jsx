import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import ProductCard from '@components/element/ProductCard';
import services from '@mocks/services.json';

import ChevronLeft from '@assets/img/chevron-left.svg?react';
import ChevronRight from '@assets/img/chevron-right.svg?react';

import { useContext } from 'react';
import { AppContext } from '@context/AppContext';

export default function PlansList({ plans, planSelection, handleProductSelection }) {
    const { list } = plans || services;
    const { user } = useContext(AppContext);
    const PLAN_TYPE_FOR_ME = 'forMe';
    const DISCOUNT_PERCENTAGE = 5;

    const isForMe = planSelection.planType === PLAN_TYPE_FOR_ME;

    // sort data to display on cards, and filter services by age 
    const filtered_services = list?.map(service => {
        const newData = {
            title: service.name,
            amount: service.price,
            services: service.description,
            age: service.age,
            discountPercentage: isForMe ? false : DISCOUNT_PERCENTAGE, 
            recommended : isForMe ? false : service.age <= user.age
        }
        return newData
    })?.filter(service => {
        if(isForMe) {
            return service.age <= user.age
        }
        return true
    });

    return (
        <div className='plans-steps__list'>
            <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={0}
                navigation={{
                    nextEl: '.swiper_custom_controls__next',
                    prevEl: '.swiper_custom_controls__prev'
                }}
                slidesPerView={1}
                initialSlide={0}
                pagination={{
                    type: 'fraction',
                    el: '.swiper-pagination',
                }}
                centeredSlides={true}
                breakpoints={
                    {
                        768: {
                            slidesPerView: 2
                        },
                        1024: {
                            slidesPerView: 3
                        }
                    }
                }
            >
                {filtered_services.map((service, index) => (
                    <SwiperSlide key={index}>
                        <ProductCard 
                            product={service}
                            image={index % 2 ? '/img/house.svg' : '/img/hospital.svg'}
                            onClick={() => handleProductSelection(service)}
                        />
                    </SwiperSlide>
                ))}
                <div className="swiper_custom_controls">
                    <button className="swiper_custom_controls__prev">
                        <ChevronLeft width={32} height={32} />
                    </button>
                    <p className='swiper-pagination'>
                    </p>
                    <button className="swiper_custom_controls__next">
                        <ChevronRight width={32} height={32} />
                    </button>
                </div>
            </Swiper>
        </div>
    )
}