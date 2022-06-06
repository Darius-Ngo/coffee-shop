import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay } from 'swiper';
import slide_1 from '../../../../assets/img/slide-1.png';
import slide_2 from '../../../../assets/img/slide-2.png';
import slide_3 from '../../../../assets/img/slide-3.png';
import slide_4 from '../../../../assets/img/slide-4.png';
import './styles.scss';

const index = () => {
    const sliderList = [
        , slide_1, slide_2, slide_3, slide_4
    ]
    SwiperCore.use([Autoplay])
    return (
        <div className="wrap-slider">
            <Swiper
                modules={[Autoplay]}
                grabCursor={true}
                spaceBetween={0}
                slidesPerView={1}
                autoplay={{ delay: 3000 }}
            >
                {sliderList.map((item, i) => (
                    <SwiperSlide key={i}>
                        {({ isActive }) => (
                            <div
                                className={`slide-item ${isActive ? 'active' : ''}`}
                                style={{ backgroundImage: `url(${item})` }}
                            >
                                {/* <img src={item} alt="" /> */}
                            </div>
                        )}
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

export default index