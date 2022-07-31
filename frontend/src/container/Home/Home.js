import React from 'react'
import './Home.css'
import ImageStyle from '../../components/ImageStyle/ImageStyle'
import Services from '../../components/Services/Services'
import Slider from '../../components/Slider/Slider'
import TabmenuProducts from '../../components/TabmenuProducts/TabmenuProducts'
import posterImg1 from '../../assets/adeniom.jpg'
import posterImg2 from '../../assets/adeniom.jpg'
import posterImg3 from '../../assets/adeniom.jpg'
import posterImg4 from '../../assets/adeniom.jpg'
function Home() {
  return (
    <>
      <Slider />
      <Services />
      <TabmenuProducts />
      <div className="images-box container">
        <ImageStyle src={posterImg1} title1="بهترین کیفیت" title2="بهترین ضمانت" />
        <ImageStyle src={posterImg2} title1="بهترین کیفیت" title2="بهترین ضمانت" />
      </div>
      <div className="images-box container" dir='ltr'>
        <ImageStyle src={posterImg3} title1="بهترین کیفیت" title2="بهترین ضمانت" />
        <ImageStyle src={posterImg4} title1="بهترین کیفیت" title2="بهترین ضمانت" />
      </div>
    </>
  )
}

export default Home