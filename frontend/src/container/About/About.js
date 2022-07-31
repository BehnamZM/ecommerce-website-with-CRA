import React from 'react'
import './About.css'
import TitleStyle from '../../components/TitleStyle/TitleStyle'
import Services from '../../components/Services/Services'

function About() {
  return (
    <div className="about-page">
      <div className="about-inner container">
        <div className="about-title">
          <TitleStyle>
            درباره ما
          </TitleStyle>
        </div>
        <div className="about-des">
          <h2>
            <span className="story-word"> داستان</span>
            <span> ما</span>
          </h2>
          <p>وبسایت بزرگ پرونیا کار خودشو از خرداد 1401 آغاز کرد و تا اینجا تونسته به اهداف خودش نزدیک بشه و بتونه در زمینه کشاورزی به مردم کشورش کمک کنه و قدم های بزرگی رو برداره. ما تو این مجموعه کارهای مختلفی رو انجام میده مثل فروش هر چیزی که تو زمینه کشاورزی لازم دارید و همینطور ما آماده ایم تا تو هر بخشی از کارتون که به مشکل برخورد کردید به شمامشاوره بدیم .همینطور ما آماده ایم که کارهای مربوط به درمان گیاهان شما رو انجام بدیم پس اگر مایل بودید با ما همراه باشید چون ما به کمک تک تک شما برای پیشرفت کارمون احتیاج داریم :)</p>
        </div>
        <Services />
      </div>
    </div>
  )
}

export default About