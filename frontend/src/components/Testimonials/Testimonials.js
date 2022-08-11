import React from 'react'
import TitleStyle from '../../components/TitleStyle/TitleStyle'
import './Testimonials.css'
import {ImQuotesLeft} from 'react-icons/im'
import Image1 from '../../assets/client1.jpg'
import Image2 from '../../assets/client3.jpg'

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Pagination, Mousewheel, Keyboard } from "swiper";

function Testimonials() {
  return (
    <div className="testimonials">
      <div className="Testimonials-title">
        <TitleStyle>نظرات مشتریان</TitleStyle>
      </div>
      <div className="testimonials-cards container">


        <Swiper
        breakpoints={{
          768: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          992: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 50,
          },
        }}
          cssMode={true}
          pagination={{
            clickable: true,
          }}
          mousewheel={true}
          freeMode={true}
          keyboard={true}
          modules={[Pagination, Mousewheel, Keyboard]}
          className="mySwiper"
        >
          <SwiperSlide>
            <div className="tesimonial-card">
              <div className="testimonial-card-body">
                <div className="testimonial-card-image">
                  <img src={Image1} alt="avatar" />
                </div>
                <h3 className="testimonial-card-name">
                  رستم محمودی
                </h3>
                <h4 className="testimonial-card-des">
                  محصولات ارسال شده به شدت باکیفیت بودند همچنین زمان ارسال به شدت مناسب بود تشکر از همه کارکنان.
                </h4>
              </div>
              <span className="testimonial-overlay"></span>
              <span className="testimonial-icon"><ImQuotesLeft /></span>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="tesimonial-card">
              <div className="testimonial-card-body">
                <div className="testimonial-card-image">
                  <img src={Image2} alt="avatar" />
                </div>
                <h3 className="testimonial-card-name">
                  قاسم محمدی
                </h3>
                <h4 className="testimonial-card-des">
                  خرید از فروشگاه پرونیا یک خرید ساده سریع موفق بود.
                </h4>
              </div>
              <span className="testimonial-overlay"></span>
              <span className="testimonial-icon"><ImQuotesLeft /></span>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="tesimonial-card">
              <div className="testimonial-card-body">
                <div className="testimonial-card-image">
                  <img src={Image1} alt="avatar" />
                </div>
                <h3 className="testimonial-card-name">
                  ابراهیم کاظمی
                </h3>
                <h4 className="testimonial-card-des">
                  با توجه به خرید موفق از این فروشگاه حتما در آینده هم از شما خرید خواهم کرد.
                </h4>
              </div>
              <span className="testimonial-overlay"></span>
              <span className="testimonial-icon"><ImQuotesLeft /></span>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="tesimonial-card">
              <div className="testimonial-card-body">
                <div className="testimonial-card-image">
                  <img src={Image2} alt="avatar" />
                </div>
                <h3 className="testimonial-card-name">
                  اسماعیل هلالی
                </h3>
                <h4 className="testimonial-card-des">
                  من این فروشگاه رو به چندتا از دوستام معرفی کردم و الان همگی از شما خرید میکنن و البته کاملا راضین.
                </h4>
                <span className="testimonial-overlay"></span>
                <span className="testimonial-icon"><ImQuotesLeft /></span>
              </div>
            </div>
          </SwiperSlide>

        </Swiper>
      </div>
    </div>
  )
}

export default Testimonials