import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { detailsOrder } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function OrderScreen(props) {
    const orderId = props.match.params.id;
    const orderDetails = useSelector(state => state.orderDetails);
    const { order, loading, error } = orderDetails;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(detailsOrder(orderId));
    }, [dispatch, orderId]);
    return loading ? (<LoadingBox></LoadingBox>) :
        error ? (<MessageBox variant="danger">{error}</MessageBox>) :
            (
                <div>
                    <h1>Zamówienie {order._id}</h1>
                    <div className="row top">
                        <div className="col-2">
                            <ul>
                                <li>
                                    <div className="card card-body">
                                        <h2>Adres dostawy:</h2>
                                        <p>
                                            <strong>Imię i nazwisko:</strong> {order.shippingAddress.fullName} <br />
                                            <strong>Adres:</strong> {order.shippingAddress.address}, {order.shippingAddress.postalCode}, {order.shippingAddress.city}, {order.shippingAddress.country}
                                        </p>
                                        {order.isDelivered? (<MessageBox variant="success">Dostrarczono w dniu {order.deliveredAt}</MessageBox>) : 
                                        (<MessageBox variant="danger">Nie dostarczono</MessageBox>)}
                                    </div>
                                </li>
                                <li>
                                    <div className="card card-body">
                                        <h2>Płatność</h2>
                                        <p>
                                            <strong>Metoda płatności:</strong> {order.paymentMethod}
                                        </p>
                                        {order.isPaid? (<MessageBox variant="success">Zapłacono{order.PaiddAt}</MessageBox>) : 
                                        (<MessageBox variant="danger">Nie zapłacono</MessageBox>)}
                                    </div>
                                </li>
                                <li>
                                    <div className="card card-body">
                                        <h2>Koszyk:</h2>
                                        <ul>
                                            {order.orderItems.map((item) => (
                                                <li key={item.product}>
                                                    <div className="row">
                                                        <div>
                                                            <img
                                                                src={item.image}
                                                                alt={item.name}
                                                                className="small"
                                                            ></img>
                                                        </div>
                                                        <div className="min-30">
                                                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                        </div>
                                                        <div>{item.qty} x {item.price}zł = {item.qty * item.price}zł</div>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </li>
                            </ul>

                        </div>
                        <div className="col-1">
                            <div className="card card-body">
                                <ul>
                                    <li>
                                        <h2>Podsumowanie</h2>
                                    </li>
                                    <li>
                                        <div className="row">
                                            <div>Przedmioty</div>
                                            <div>{order.itemsPrice.toFixed(2)}zł</div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="row">
                                            <div>Dostawa</div>
                                            <div>{order.shippingPrice.toFixed(2)}zł</div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="row">
                                            <div><strong>Podsumowanie zamówienia</strong></div>
                                            <div><strong>{order.totalPrice.toFixed(2)}zł</strong></div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )
}