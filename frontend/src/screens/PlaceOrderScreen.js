import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';

export default function PlaceOrderScreen(props) {
    const cart = useSelector((state) => state.cart);
    if (!cart.paymentMethod) {
        props.history.push('/payment');
    }
    const toPrice = (num) => Number(num.toFixed(2));
    cart.itemsPrice = toPrice(cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0));
    cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);
    cart.totalPrice = cart.itemsPrice + cart.shippingPrice;
    const placeOrderHandler = () =>{
        //TODO: DISPATCH PLACE ORDER ACTION
    }
    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
            <div className="row top">
                <div className="col-2">
                    <ul>
                        <li>
                            <div className="card card-body">
                                <h2>Adres dostawy:</h2>
                                <p>
                                    <strong>Imię i nazwisko:</strong> {cart.shippingAddress.fullName} <br />
                                    <strong>Adres:</strong> {cart.shippingAddress.address}, {cart.shippingAddress.postalCode}, {cart.shippingAddress.city}, {cart.shippingAddress.country}
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h2>Płatność</h2>
                                <p>
                                    <strong>Metoda płatności:</strong> {cart.paymentMethod}
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h2>Koszyk:</h2>
                                <ul>
                                    {cart.cartItems.map((item) => (
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
                                    <div>{cart.itemsPrice.toFixed(2)}zł</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Dostawa</div>
                                    <div>{cart.shippingPrice.toFixed(2)}zł</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div><strong>Podsumowanie zamówienia</strong></div>
                                    <div><strong>{cart.totalPrice.toFixed(2)}zł</strong></div>
                                </div>
                            </li>
                            <li>
                                <button type="button" onClick={placeOrderHandler} className="primary block" disabled={cart.cartItems.length === 0}>Złóż zamówienie</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}