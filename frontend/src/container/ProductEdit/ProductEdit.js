import axios from 'axios';
import React, { useContext, useEffect, useReducer, useState } from 'react'
import './ProductEdit.css'
import { useNavigate, useParams } from 'react-router-dom';
import ButtonStyle from '../../components/ButtonStyle/ButtonStyle';
import Input from '../../components/Input/Input';
import Preload from '../../components/Preload/Preload';
import TitleStyle from '../../components/TitleStyle/TitleStyle';
import { Store } from '../../Store';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'UPDATE_REQUEST':
      return { ...state, loadingUpdate: true };
    case 'UPDATE_SUCCESS':
      return { ...state, loadingUpdate: false };
    case 'UPDATE_FAIL':
      return { ...state, loadingUpdate: false };
    case 'UPLOAD_REQUEST':
      return { ...state, loadingUpload: true, errorUpload: '' };
    case 'UPLOAD_SUCCESS':
      return {
        ...state,
        loadingUpload: false,
        errorUpload: '',
      };
    case 'UPLOAD_FAIL':
      return { ...state, loadingUpload: false, errorUpload: action.payload };

    default:
      return state;
  }
};

function ProductEdit() {

  const navigate = useNavigate();
  const params = useParams(); // /product/:id
  const { id: productId } = params;

  const { state } = useContext(Store);
  const { userInfo } = state;
  const [{ loading, error, loadingUpdate, loadingUpload }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: '',
    });

  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [images, setImages] = useState([]);
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState('');
  const [brand, setBrand] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/products/${productId}`);
        setName(data.name);
        setSlug(data.slug);
        setPrice(data.price);
        setImage(data.image);
        setImages(data.images);
        setCategory(data.category);
        setCountInStock(data.countInStock);
        setBrand(data.brand);
        setDescription(data.description);
        dispatch({ type: 'FETCH_SUCCESS' });
      } catch (err) {
        dispatch({
          type: 'FETCH_FAIL',
          payload: err.message,
        });
      }
    };
    fetchData();
  }, [productId]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: 'UPDATE_REQUEST' });
      await axios.put(
        `/api/products/${productId}`,
        {
          _id: productId,
          name,
          slug,
          price,
          image,
          images,
          category,
          brand,
          countInStock,
          description,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({
        type: 'UPDATE_SUCCESS',
      });
      alert('Product updated successfully');
      navigate('/admin/product-list');
    } catch (err) {
      alert(err.message);
      dispatch({ type: 'UPDATE_FAIL' });
    }
  };
  const uploadFileHandler = async (e, forImages) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('file', file);
    try {
      dispatch({ type: 'UPLOAD_REQUEST' });
      const { data } = await axios.post('/api/upload', bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          authorization: `Bearer ${userInfo.token}`,
        },
      });
      dispatch({ type: 'UPLOAD_SUCCESS' });

      if (forImages) {
        setImages([...images, data.secure_url]);
      } else {
        setImage(data.secure_url);
      }
      alert('Image uploaded successfully. click Update to apply it');
    } catch (err) {
      alert(err.message);
      dispatch({ type: 'UPLOAD_FAIL', payload: err.message });
    }
  };
  const deleteFileHandler = async (fileName, f) => {
    console.log(fileName, f);
    console.log(images);
    console.log(images.filter((x) => x !== fileName));
    setImages(images.filter((x) => x !== fileName));
    alert('Image removed successfully. click Update to apply it');
  };
  return (
    <div className='edit-product'>
      <div className='edit-product-title'>
        <TitleStyle>
          ویرایش محصول { name }
        </TitleStyle>
      </div>
      <div className='edit-product-body'>
        {
          loading ? <Preload /> :
            error ? (<h3>{error}</h3>) :
              (<form onSubmit={submitHandler}>
                <label>نام
                  <Input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)} />
                </label>
                <label>نام در آدرس
                  <Input
                    type="text"
                    value={slug}
                    onChange={e => setSlug(e.target.value)} />
                </label>
                <label>قیمت
                  <Input
                    type="text"
                    value={price}
                    onChange={e => setPrice(e.target.value)} />
                </label>
                <label>تصویر
                  <Input
                    type="text"
                    value={image}
                    onChange={e => setImage(e.target.value)} />
                </label>
                <label>تصاویر
                  <Input
                     type="file" 
                     onChange={uploadFileHandler} />
                     {loadingUpload && <preload />}
                </label>
                <label>برند
                  <Input
                    type="text"
                    value={brand}
                    onChange={e => setBrand(e.target.value)} />
                </label>
                <label>دسته بندی
                  <Input
                    type="text"
                    value={category}
                    onChange={e => setCategory(e.target.value)} />
                </label>
                <label>تعداد موجودی
                  <Input
                    type="text"
                    value={countInStock}
                    placeholder='نام کاربر'
                    onChange={e => setCountInStock(e.target.value)} />
                </label>
                <label>توضیحات
                  <textarea
                    type="text"
                    value={description}
                    placeholder='نام کاربر'
                    onChange={e => setDescription(e.target.value)}></textarea>
                </label>
                

                <div>
                  <ButtonStyle>{loadingUpdate ? '...' : 'آپدیت'}</ButtonStyle>
                </div>
              </form>)
        }

      </div>
    </div>
  )
}

export default ProductEdit