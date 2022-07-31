import React, { useReducer, useEffect, useState } from 'react'
import './ProductsScreen.css'
import { FaThList } from 'react-icons/fa'
import { CgMenuGridR } from 'react-icons/cg'
import TitleStyle from '../../components/TitleStyle/TitleStyle'
import Sidebar from '../../components/Sidebar/Sidebar'
import ProductStyle from '../../components/ProductStyle/ProductStyle'
import axios from 'axios'
import logger from 'use-reducer-logger'
import Preload from '../../components/Preload/Preload'

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, products: action.payload };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}


function ProductsScreen() {

  const [currentPage, setCurrentPage] = useState(1)
  const [paginatedProducts, setPaginatedProducts] = useState([])
  let pageSize = 6
  let pagesNumbers

  const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
    products: [],
    loading: true,
    error: ''
  })



  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get('/api/products')
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
        let endIndex = pageSize * currentPage
        let startIndex = endIndex - pageSize
        let allShownProducts = result.data.slice(startIndex, endIndex)
        setPaginatedProducts(allShownProducts)
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    let endIndex = pageSize * currentPage
    let startIndex = endIndex - pageSize
    let allShownProducts = products.slice(startIndex, endIndex)
    setPaginatedProducts(allShownProducts)
  }, [currentPage])

  const changePaginate = (newPage) => {
    setCurrentPage(newPage)

  }

  const pagesCount = Math.ceil(products.length / pageSize)
  pagesNumbers = Array.from(Array(pagesCount).keys())

  return (
    <div className="products">
      <div className="products-title">
        <TitleStyle>فروشگاه</TitleStyle>
      </div>
      <div className="products-body container">
        <Sidebar />
        <div className="products-inner">
          <div className="products-controls">
            <div className="show-products-Horizontal">
              <CgMenuGridR />
            </div>
            <div className="show-products-vertical">
              <FaThList />
            </div>
            <div className="number-of-products">
              9 محصول از 30 تا
            </div>
            <select className="sort-products">
              <option value='newest'>جدیدترین ها</option>
              <option value='highest'>ارزانترین ها</option>
              <option value='lowest'>گرانترین ها</option>
              <option value='toprated'>پیشنهاد خریداران</option>
            </select>
          </div>
          <div className="products-list">
            {
              loading ? <Preload /> :
                error ? (<h3>{error}</h3>) : (
                  paginatedProducts.map(product => (
                    <ProductStyle {...product} key={product._id} />)
                  ))
            }
          </div>
          <div className='pagination'>
            {pagesNumbers.map(pageNumber => (
              <div className={currentPage === pageNumber + 1 ? 'pagination-item page-active' : 'pagination-item'} onClick={() => changePaginate(pageNumber + 1)}>{pageNumber + 1}</div>
            ))}

          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductsScreen