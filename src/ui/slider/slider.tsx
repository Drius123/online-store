import { useEffect, useState } from 'react';
import { Navigation, Pagination, EffectCoverflow, Controller } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { SliderProps } from '../../types';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/scss/effect-coverflow';

export default function Slider({ src, modalActive, pagination }: SliderProps) {
  const [showNavigation, setShowNavigation] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setShowNavigation(window.innerWidth >= 768);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Swiper
      modules={[Navigation, Pagination, EffectCoverflow, Controller]}
      spaceBetween={50}
      slidesPerView={1}
      loop
      navigation={showNavigation}
      effect='coverflow'
      freeMode
      speed={500}
      pagination={pagination}
      initialSlide={0}
    >
      {src.map((item, i) => {
        return (
          <SwiperSlide
            // eslint-disable-next-line react/no-array-index-key
            key={i}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            {' '}
            <img
              src={item}
              alt='product-img'
              onClick={() => {
                document.body.classList.add('hidden');
                modalActive(true);
              }}
              role='presentation'
            />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
