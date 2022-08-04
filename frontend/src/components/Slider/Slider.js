import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import sliderImg1 from '../../assets/5466944-min.jpg'
import sliderImg2 from '../../assets/abundance_agriculture_background_bunch_carotene_603010-min.jpg'
import sliderImg3 from '../../assets/sheep_lamb_new_zealand-min.jpg'
import sliderImg4 from '../../assets/grass_514917-min.jpg'

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "./Slider.css";

// import required modules
import { EffectFade, Navigation, Pagination } from "swiper";

export default function Slider() {
  return (
    <>
      <Swiper
        spaceBetween={30}
        effect={"fade"}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        modules={[EffectFade, Navigation, Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src={sliderImg1} alt='sliderImage1'/>
        </SwiperSlide>
        <SwiperSlide>
          <img src={sliderImg2} alt='sliderImage2' />
        </SwiperSlide>
        <SwiperSlide>
          <img src={sliderImg3} alt='sliderImage3' />
        </SwiperSlide>
        <SwiperSlide>
          <img src={sliderImg4} alt='sliderImage4' />
        </SwiperSlide>
      </Swiper>
    </>
  );
}
