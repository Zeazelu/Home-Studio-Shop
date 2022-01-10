import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { listProducts } from '../actions/productActions';

export default function HomeScreen(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  const readyproductsHandler = () => {
    props.history.push('/readyproducts');
  };
  const tailormadeHandler = () => {
    props.history.push('/tailormadeproducts');
  };
  return (
    <div>
      <img src={require("../assets/herb.png")} className="home" alt="logo" />
      <form className="form" >
        <button
          type="button"
          onClick={readyproductsHandler}
          className="primarys"
        >
          GOTOWE PRODUKTY
        </button>
        <button
          type="button"
          onClick={tailormadeHandler}
          className="primarys"
        >
          SZYCIE NA MIARĘ
        </button>
      </form>
    </div>
  );
}