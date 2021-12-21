import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { tailormadeAddToCart, tailormadeRemoveFromCart } from '../actions/tailormadeCartActions';
import MessageBox from '../components/MessageBox';

export default function TailormadeCartScreen(props) {
  const tailormadeId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split('=')[1])
    : 1;
  const tailormadeCart = useSelector((state) => state.tailormadeCart);
  const { tailormadeCartItems } = tailormadeCart;
  const dispatch = useDispatch();
  useEffect(() => {
    if (tailormadeId) {
      dispatch(tailormadeAddToCart(tailormadeId, qty));
    }
  }, [dispatch, tailormadeId, qty]);

  const tailormadeRemoveFromCartHandler = (id) => {
    dispatch(tailormadeRemoveFromCart(id));
  };

  const checkoutHandler = () => {
    props.history.push('/signin?redirect=dimensions');
  };
  return (
    <div className="row top">
      <div className="col-2">
        <h1>Koszyk</h1>
        {tailormadeCartItems.length === 0 ? (
          <MessageBox>
            Koszyk jest pusty. <Link to="/">Przejdź do zakupów.</Link>
          </MessageBox>
        ) : (
          <ul>
            {tailormadeCartItems.map((tailormadeItem) => (
              <li key={tailormadeItem.tailormade}>
                <div className="row">
                  <div>
                    <img
                      src={tailormadeItem.image}
                      alt={tailormadeItem.name}
                      className="small"
                    ></img>
                  </div>
                  <div className="min-30">
                    <Link to={`/tailormade/${tailormadeItem.tailormade}`}>{tailormadeItem.name}</Link>
                  </div>
                  <div>
                    <select
                      value={tailormadeItem.qty}
                      onChange={(e) =>
                        dispatch(
                          tailormadeAddToCart(tailormadeItem.tailormade, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(tailormadeItem.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>{tailormadeItem.price}zł</div>
                  <div>
                    <button
                      type="button"
                      onClick={() => tailormadeRemoveFromCartHandler(tailormadeItem.tailormade)}
                    >
                      Usuń
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="col-1">
        <div className="cards cards-body">
          <ul>
            <li>
              <h2>
                Razem: ({tailormadeCartItems.reduce((a, c) => a + c.qty, 0)} rzeczy):   
                 {tailormadeCartItems.reduce((a, c) => a + c.price * c.qty, 0)}zł
              </h2>
            </li>
            <li>
              <button
                type="button"
                onClick={checkoutHandler}
                className="primary block"
                disabled={tailormadeCartItems.length === 0}
              >
                Przejdź do realizacji
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}