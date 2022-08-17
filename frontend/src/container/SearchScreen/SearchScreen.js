import React, { useReducer, useEffect, useState } from 'react'
import './SearchScreen.css'
import { FaThList } from 'react-icons/fa'
import { CgMenuGridR } from 'react-icons/cg'
import TitleStyle from '../../components/TitleStyle/TitleStyle'
import ProductStyle from '../../components/ProductStyle/ProductStyle'
import axios from 'axios'
import Preload from '../../components/Preload/Preload'
import { useLocation, useNavigate } from 'react-router-dom'
import ImageStyle from '../../components/ImageStyle/ImageStyle'
import imgSrc from '../../assets/sanseveria(8).png'
import { BsSearch } from 'react-icons/bs'
// import { IoIosArrowBack } from 'react-icons/io'
import { Link } from 'react-router-dom'
import Input from '../../components/Input/Input'
import Rating from '../../components/Rating/Rating'

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        products: action.payload.products,
        page: action.payload.page,
        pages: action.payload.pages,
        countProducts: action.payload.countProducts,
        loading: false,
      };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

const prices = [
  {
    name: '100000 - 300000',
    value: '100000-300000',
  },
  {
    name: '300001 - 700000',
    value: '300001-700000',
  },
  {
    name: '700001 - 3000000',
    value: '700001-3000000',
  },
];

export const ratings = [
  {
    name: '4stars & up',
    rating: 4,
  },

  {
    name: '3stars & up',
    rating: 3,
  },

  {
    name: '2stars & up',
    rating: 2,
  },

  {
    name: '1stars & up',
    rating: 1,
  },
];


function SearchScreen() {
  const [listType, setListType] = useState(true)
  const navigate = useNavigate();
  const { search } = useLocation();
  const sp = new URLSearchParams(search); // /search?category=Shirts
  const category = sp.get('category') || 'all';
  const query = sp.get('query') || 'all';
  const price = sp.get('price') || 'all';
  const rating = sp.get('rating') || 'all';
  const order = sp.get('order') || 'newest';
  const page = sp.get('page') || 1;
  const [searchQuery, setSearchQuery] = useState('');

  const [{ loading, error, products, pages, countProducts }, dispatch] =
    useReducer(reducer, {
      products: [],
      loading: true,
      error: '',
    });
  const [currentPage, setCurrentPage] = useState(1)
  const [paginatedProducts, setPaginatedProducts] = useState([])
    let pageSize = 6
  let pagesNumbers



  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `/api/products/search?page=${page}&query=${query}&category=${category}&price=${price}&rating=${rating}&order=${order}`
        );
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
        let endIndex = pageSize * currentPage
        let startIndex = endIndex - pageSize
        let allShownProducts = data.slice(startIndex, endIndex)
        setPaginatedProducts(allShownProducts)
      } catch (err) {
        dispatch({
          type: 'FETCH_FAIL',
          payload: err.message,
        });
      }
    };
    fetchData();
  }, [category, error, order, page, price, query, rating]);
  
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

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`/api/products/categories`);
        setCategories(data);
      } catch (err) {
        alert(err.message);
      }
    };
    fetchCategories();
  }, [dispatch]);

  const getFilterUrl = (filter) => {
    const filterPage = filter.page || page;
    const filterCategory = filter.category || category;
    const filterQuery = filter.query || query;
    const filterRating = filter.rating || rating;
    const filterPrice = filter.price || price;
    const sortOrder = filter.order || order;
    return `/search?category=${filterCategory}&query=${filterQuery}&price=${filterPrice}&rating=${filterRating}&order=${sortOrder}&page=${filterPage}`;
  };

  const submitHandler = (e) => {
    e.preventDefault();
    navigate(query ? `/search/?query=${searchQuery}` : '/search');
  };

  return (
    <div className="products">
      <div className="products-title">
        <TitleStyle>جستجو</TitleStyle>
      </div>
      <div className="products-body container">

        <aside>
          <div className="aside-inner">

            <form className="products-searchbox" onSubmit={submitHandler}>
              <Input
                type='text'
                placeholder='سرچ کن'
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type='submit'
                className='search-in-products-icon'>
                <BsSearch />
              </button>

            </form>

            <div className="products-category">
              <h4>دسته بندی محصولات</h4>
              <div>
                <ul>
                  <li>
                    <Link
                      className={'all' === category ? 'link link-active' : 'link'}
                      to={getFilterUrl({ category: 'all' })}
                    >
                      همه محصولات
                    </Link>
                  </li>
                  {categories.map((c) => (
                    <li key={c}>
                      <Link
                        className={c === category ? 'link link-active' : 'link'}
                        to={getFilterUrl({ category: c })}
                      >
                        {c}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3> بر اساس قیمت</h3>
                <ul>
                  <li>
                    <Link
                      className={'all' === price ? 'link link-active' : 'link'}
                      to={getFilterUrl({ price: 'all' })}
                    >
                      همه
                    </Link>
                  </li>
                  {prices.map((p) => (
                    <li key={p.value}>
                      <Link
                        to={getFilterUrl({ price: p.value })}
                        className={p.value === price ? 'link link-active' : 'link'}
                      >
                        {p.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3>براساس امتیاز مشتریان</h3>
                <ul>
                  {ratings.map((r) => (
                    <li key={r.name}>
                      <Link
                        to={getFilterUrl({ rating: r.rating })}
                        className={`${r.rating}` === `${rating}` ? 'link link-active' : 'link'}
                      >
                        <Rating caption={' & up'} rating={r.rating}></Rating>
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link
                      to={getFilterUrl({ rating: 'all' })}
                      className={rating === 'all' ? 'link link-active' : 'link'}
                    >
                      <Rating caption={' & up'} rating={0}></Rating>
                    </Link>
                  </li>
                </ul>
              </div>

              {/* <ul className='catagury-items'>
                {
                  categories.map(category => (
                    <Link to={`search?category=${category}`} className="categury-item" key={category}>
                      <IoIosArrowBack />
                      {category}
                    </Link>
                  ))
                }
              </ul> */}
            </div>

            <div>
              {countProducts === 0 ? 'No' : countProducts} نتایج
              {query !== 'all' && ' : ' + query}
              {category !== 'all' && ' : ' + category}
              {price !== 'all' && ' : Price ' + price}
              {rating !== 'all' && ' : Rating ' + rating + ' & up'}
              {query !== 'all' ||
                category !== 'all' ||
                rating !== 'all' ||
                price !== 'all' ? (
                <div
                  variant="light"
                  onClick={() => navigate('/search')}
                >
                  <i className="fas fa-times-circle"></i>
                </div>
              ) : null}
            </div>
            <ImageStyle search='/search?category=آپارتمانی&query=all&price=all&rating=all&order=newest&page=1' src={imgSrc} title1="بهترین گیاهان آپارتمانی" title2="با ضمانت تعویض" />
          </div>
        </aside>

        <div className="products-inner">
          <div className="products-controls">
            <div className="show-products-Horizontal">
              <CgMenuGridR onClick={() => setListType(true)} />
            </div>
            <div className="show-products-vertical">
              <FaThList onClick={() => setListType(false)} />
            </div>
            <div className="number-of-products">
               {products.length} محصول
            </div>
            <select
              className="sort-products"
              value={order}
              onChange={(e) => {
                navigate(getFilterUrl({ order: e.target.value }));
              }}>
              <option value='newest'>جدیدترین ها</option>
              <option value='lowest'>ارزانترین ها</option>
              <option value='highest'>گرانترین ها</option>
              <option value='toprated'>پیشنهاد خریداران</option>
            </select>
          </div>
          <div className={listType ? "products-list-one" : "products-list-two"}>
            {
              loading ? <Preload /> :
                error ? (<h3>{error}</h3>) : (
                  paginatedProducts.map(product => (
                    <ProductStyle type={listType} {...product} key={product._id} />)
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

export default SearchScreen
