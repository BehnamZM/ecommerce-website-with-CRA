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
    name: '$1 to $50',
    value: '1-50',
  },
  {
    name: '$51 to $200',
    value: '51-200',
  },
  {
    name: '$201 to $1000',
    value: '201-1000',
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
      loading: true,
      error: '',
    });



  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `/api/products/search?page=${page}&query=${query}&category=${category}&price=${price}&rating=${rating}&order=${order}`
        );
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({
          type: 'FETCH_FAIL',
          payload: err.message,
        });
      }
    };
    fetchData();
  }, [category, error, order, page, price, query, rating]);

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
        <TitleStyle>سرچ بین محصولات</TitleStyle>
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
              <button type='submit'>
                <BsSearch className='search-in-products-icon' />
              </button>

            </form>

            <div className="products-category">
              <h4>دسته بندی محصولات</h4>
              <div>
                <ul>
                  <li>
                    <Link className='link'
                      className={'all' === category ? 'text-bold' : ''}
                      to={getFilterUrl({ category: 'all' })}
                    >
                      همه محصولات
                    </Link>
                  </li>
                  {categories.map((c) => (
                    <li key={c}>
                      <Link className='link'
                        className={c === category ? 'text-bold' : ''}
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
                    <Link className='link'
                      className={'all' === price ? 'text-bold' : ''}
                      to={getFilterUrl({ price: 'all' })}
                    >
                      همه
                    </Link>
                  </li>
                  {prices.map((p) => (
                    <li key={p.value}>
                      <Link className='link'
                        to={getFilterUrl({ price: p.value })}
                        className={p.value === price ? 'text-bold' : ''}
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
                      <Link className='link'
                        to={getFilterUrl({ rating: r.rating })}
                        className={`${r.rating}` === `${rating}` ? 'text-bold' : ''}
                      >
                        <Rating caption={' & up'} rating={r.rating}></Rating>
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link className='link'
                      to={getFilterUrl({ rating: 'all' })}
                      className={rating === 'all' ? 'text-bold' : ''}
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
              {countProducts === 0 ? 'No' : countProducts} Results
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
            <ImageStyle src={imgSrc} title1="بهترین گیاهان آپارتمانی" title2="با ضمانت تعویض" />
          </div>
        </aside>

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
            <select
              className="sort-products"
              value={order}
              onChange={(e) => {
                navigate(getFilterUrl({ order: e.target.value }));
              }}>
              <option value='newest'>جدیدترین ها</option>
              <option value='highest'>ارزانترین ها</option>
              <option value='lowest'>گرانترین ها</option>
              <option value='toprated'>پیشنهاد خریداران</option>
            </select>
          </div>
          <div className="products-list-one">
            {
              loading ? <Preload /> :
                error ? (<h3>{error}</h3>) : (
                  products.map(product => (
                    <ProductStyle {...product} key={product._id} />)
                  ))
            }
          </div>
          <div className='pagination'>
            {[...Array(pages).keys()].map((x) => (
              <Link className='link'
                key={x + 1}
                to={getFilterUrl({ page: x + 1 })}
              >
                <div
                  className={Number(page) === x + 1 ? 'pagination-item page-active' : 'pagination-item'}>
                  {x + 1}
                </div>
              </Link>
            ))}

          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchScreen