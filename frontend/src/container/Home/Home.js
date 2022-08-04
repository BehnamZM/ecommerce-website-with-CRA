import React, { useEffect, useReducer } from 'react'
import './Home.css'
import ImageStyle from '../../components/ImageStyle/ImageStyle'
import Services from '../../components/Services/Services'
import Slider from '../../components/Slider/Slider'
import posterImg1 from '../../assets/pot1.jpg'
import posterImg2 from '../../assets/adeniom.jpg'
import posterImg3 from '../../assets/tools.jpg'
import posterImg4 from '../../assets/Poisons-fertilizers.jpg'
import logger from 'use-reducer-logger'
import ProductStyle from '../../components/ProductStyle/ProductStyle'
import axios from 'axios'
import TitleStyle from '../../components/TitleStyle/TitleStyle'

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, newestProducts: action.payload };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}
function Home() {

  const [{ loading, error, newestProducts }, dispatch] = useReducer(logger(reducer), {
    products: [],
    loading: true,
    error: ''
  })

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get('/api/products')

        let newData = result.data.reverse(result.data)
        let newestProducts = newData.slice(0, 4)
        dispatch({ type: 'FETCH_SUCCESS', payload: newestProducts });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <Slider />
      <Services />
      <div className='newest-products'>
        <div>
          <TitleStyle>جدیدترین محصولات</TitleStyle>
        </div>
        <div className='newest-products-list'>
          {
            loading ? <p>loading...</p> : error ? <p>{error.message}</p> :
              newestProducts.map(product => (
                <ProductStyle {...product} key={product._id} />
              ))}
        </div>
      </div>
      <div className="images-box container">
        <ImageStyle src={posterImg1} title1="انواع گلدان" title2="بهترین کیفیت" />
        <ImageStyle src={posterImg2} title1="گیاهان آپارتمانی" title2="ارسال سریع" />
      </div>
      <div className="images-box container" dir='ltr'>
        <ImageStyle src={posterImg3} title1="ابزارآلات" title2="تضمین ضمانت" />
        <ImageStyle src={posterImg4} title1="کود و سموم" title2="معتبرترین شرکتها" />
      </div>
    </>
  )
}

export default Home