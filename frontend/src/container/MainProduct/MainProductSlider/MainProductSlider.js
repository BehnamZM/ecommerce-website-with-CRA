
import React, { useState } from "react";
import './MainProductSlider.css'
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper";


function MainProductSlider(props) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  return (
    <div className="main-product-slider">
      <div className="main-product-slider-body">

        <Swiper
          style={{
            "--swiper-navigation-color": "#fff",
            "--swiper-pagination-color": "#fff",
            "height": "50vh",
            "marginBottom": "10px",
          }}
          spaceBetween={10}
          navigation={true}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper2"
        >
          {
            props.img.map(item => (
              <SwiperSlide>
                <img src={item} alt={item.name} />
              </SwiperSlide>
            ))
          }
        </Swiper>
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={10}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper"
          style={{ 'height': '100px' }}
        >
          {
            props.img.map(item => (
              <SwiperSlide>
                <img src={item} />
              </SwiperSlide>
            ))
          }
        </Swiper>

      </div>
    </div>
  )
}

export default MainProductSlider