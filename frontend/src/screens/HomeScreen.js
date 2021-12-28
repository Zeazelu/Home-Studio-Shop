import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { listProducts } from '../actions/productActions';
import { Link } from 'react-router-dom';

export default function HomeScreen(props) {
  const dispatch = useDispatch();
  const productList = useSelector(state => state.productList);
  const { loading, error, products } = productList;
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
    <><div>
      <h4>Produtky</h4>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          {products.length === 0 && <MessageBox>No Seller Found</MessageBox>}
          <Carousel showArrows autoPlay showThumbs={false}>
            {products.map((product) => (
              <Link to={`/product/${product._id}`}>
                <img src={product.image} alt={product.name} />
              </Link>
            ))}
          </Carousel>
        </>
      )}
    </div>
      <div>
      <button
                type="button"
                onClick={readyproductsHandler}
                className="row-2"
              >
                GOTOWE PRODUKTY
              </button>
              <button
                type="button"
                onClick={tailormadeHandler}
                className="row-2"
              >
                SZYCIE NA MIARĘ
              </button>
      </div>
    </>
  );
}