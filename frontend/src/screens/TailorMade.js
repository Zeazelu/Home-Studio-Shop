import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsTailormade } from '../actions/tailormadeActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function TailormadeProducts(props) {
  const dispatch = useDispatch();
  const tailormadeId = props.match.params.id;
  const [qty, setQty] = useState(1);
  const tailormadeDetails = useSelector((state) => state.tailormadeDetails);
  const { loading, error, tailormade } = tailormadeDetails;

  useEffect(() => {
    dispatch(detailsTailormade(tailormadeId));
  }, [dispatch, tailormadeId]);

  const addToTailormadeCartHandler = () => {
    props.history.push(`/tailormadecart/${tailormadeId}?qty=${qty}`);
  };
  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div>
          <div className="row top">
            <div className="col-2">
              <img
                className="large"
                src={tailormade.image}
                alt={tailormade.name}
              ></img>
            </div>
            <div className="col-1">
              <ul>
                <li>
                  <h1>{tailormade.name}</h1>
                </li>
                <li>
                  <p>Cena:</p>
                  {tailormade.price}zł
                </li>
                <li>
                  <p>Opis produktu:</p>
                  {tailormade.description}
                </li>
              </ul>
            </div>
            <div className="col-1">
              <div className="card card-body">
                <ul>
                  <li>
                    <div className="row">
                      <div>Cena:</div>
                      <div className="price">{tailormade.price}zł</div>
                    </div>
                  </li>
                  <li>
                  </li>
                  <li>
                    <div className="row">
                      <div>Status:</div>
                      <div>
                        {tailormade.countInStock > 0 ? (
                          <span className="success">W magazynie</span>
                        ) : (
                          <span className="danger">Niedostępny</span>
                        )}
                      </div>
                    </div>
                  </li>
                  {
                    tailormade.countInStock > 0 && (
                      <>
                        <li>
                          <div className="row">
                            <div>Ilość:</div>
                            <div>
                              <select value={qty} onChange={e => setQty(e.target.value)}>
                                {
                                  [...Array(tailormade.countInStock).keys()].map((x) => (
                                    <option key={x + 1} value={x + 1}>{x + 1}</option>
                                  ))
                                }
                              </select>
                            </div>
                          </div>
                        </li>
                        <li>
                          <button onClick={addToTailormadeCartHandler} className="primary block">Dodaj do koszyka</button>
                        </li>
                      </>
                    )
                  }
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}