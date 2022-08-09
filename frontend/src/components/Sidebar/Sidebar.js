import React, { useEffect, useState } from 'react'
import './Sidebar.css'
import Input from '../../components/Input/Input'
import ImageStyle from '../../components/ImageStyle/ImageStyle'
import { BsSearch } from 'react-icons/bs'
import { IoIosArrowBack } from 'react-icons/io'
import imgSrc from '../../assets/sanseveria(8).png'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import ButtonStyle from '../ButtonStyle/ButtonStyle'

function Sidebar() {

  const [categories, setCategories] = useState([])

  const [query, setQuery] = useState('')
  const navigate = useNavigate()
  const submitHandler = (e) => {
    e.preventDefault()
    navigate(query ? `/search/?query=${query}` : '/search')
  }

  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await axios.get('api/products/categories')
      setCategories(data)
    }
    fetchCategories()
  }, [])

  return (
    <>
      <aside>
        <div className="aside-inner">

          <form className="products-searchbox" onSubmit={submitHandler}>
            <Input
              type='text'
              placeholder='سرچ کن'
              onChange={(e) => setQuery(e.target.value)}
            />
            <button type='submit'>
              <BsSearch className='search-in-products-icon' />
            </button>
          </form>

          {/* <div className="products-categury">
            <h4>دسته بندی محصولات</h4>
            <ul className='catagury-items'>
              {
                categories.map(category => (
                  <Link to={`search?category=${category}`} className="categury-item" key={category}>
                    <IoIosArrowBack />
                    {category}
                  </Link>
                ))
              }

            </ul>

          </div> */}
          <Link to='/search' className='link'>
            <ButtonStyle>فیلتر محصولات</ButtonStyle>
          </Link>

          <ImageStyle src={imgSrc} title1="بهترین گیاهان آپارتمانی" title2="با ضمانت تعویض" />
        </div>
      </aside>
    </>
  )
}

export default Sidebar