import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createTailormadeOrder } from '../actions/tailormadeOrderActions';
import TailormadeCheckoutSteps from '../components/TailormadeCheckoutSteps';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { TAILOR_ORDER_CREATE_RESET } from '../constants/tailormadeOrderConstants';

export default function TailormadePlaceOrderScreen(props) {
    const tailormadeCart = useSelector((state) => state.tailormadeCart);
    if (!tailormadeCart.paymentMethod) {
        props.history.push('/payment');
    }
    const tailormadeOrderCreate = useSelector((state) => state.tailormadeOrderCreate);
    const {loading, success, error, tailormadeorder} = tailormadeOrderCreate;
    const toPrice = (num) => Number(num.toFixed(2));
    tailormadeCart.tailormadeItemsPrice = toPrice(tailormadeCart.tailormadeCartItems.reduce((a, c) => a + c.qty * c.price, 0));
    tailormadeCart.shippingPrice = tailormadeCart.tailormadeItemsPrice > 100 ? toPrice(0) : toPrice(10);
    tailormadeCart.totalPrice = tailormadeCart.tailormadeItemsPrice + tailormadeCart.shippingPrice;
    const dispatch = useDispatch();
    const placeTailormadeOrderHandler = () =>{
        dispatch(createTailormadeOrder({...tailormadeCart, tailormadeOrderItems: tailormadeCart.tailormadeCartItems}));
    };
    useEffect(()=>{
        if(success) {
            props.history.push(`/tailormadeorder/${tailormadeorder._id}`);
            dispatch({type: TAILOR_ORDER_CREATE_RESET});
        }
    }, [dispatch, tailormadeorder, props.history, success]);
    return (
        <div>
            <TailormadeCheckoutSteps step1 step2 step3 step4 step5></TailormadeCheckoutSteps>
            <div className="row top">
                <div className="col-2">
                    <ul>
                        <li>
                            <div className="card card-body">
                                <h2>Adres dostawy:</h2>
                                <p>
                                    <strong>Imię i nazwisko:</strong> {tailormadeCart.tailormadeShippingAddress.fullName} <br />
                                    <strong>Adres:</strong> {tailormadeCart.tailormadeShippingAddress.address}, {tailormadeCart.tailormadeShippingAddress.postalCode}, {tailormadeCart.tailormadeShippingAddress.city}, {tailormadeCart.tailormadeShippingAddress.country}
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h2>Płatność</h2>
                                <p>
                                    <strong>Metoda płatności:</strong> {tailormadeCart.paymentMethod}
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h2>Wymiary</h2>
                                <p>
                                    <strong>Długość [cm]:</strong> {tailormadeCart.dimensions.height}<br/>
                                    <strong>Obwód klatki piersiowej [cm]:</strong> {tailormadeCart.dimensions.chestcircumference}<br/>
                                    <strong>Szerokość w ramionach [cm]:</strong> {tailormadeCart.dimensions.shoulderwidth}<br/>
                                    <strong>Obwód kołnierza [cm]:</strong> {tailormadeCart.dimensions.collarcircumference}<br/>
                                    <strong>Obwód w talii [cm]:</strong> {tailormadeCart.dimensions.waistcircumference}<br/>
                                    <strong>Obwód rękawa [cm]:</strong> {tailormadeCart.dimensions.sleevecircumference}<br/>
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h2>Koszyk:</h2>
                                <ul>
                                    {tailormadeCart.tailormadeCartItems.map((tailormadeItem) => (
                                        <li key={tailormadeItem.product}>
                                            <div className="row">
                                                <div>
                                                    <img
                                                        src={tailormadeItem.image}
                                                        alt={tailormadeItem.name}
                                                        className="small"
                                                    ></img>
                                                </div>
                                                <div className="min-30">
                                                    <Link to={`/tailormadeItemproduct/${tailormadeItem.product}`}>{tailormadeItem.name}</Link>
                                                </div>
                                                <div>{tailormadeItem.qty} x {tailormadeItem.price}zł = {tailormadeItem.qty * tailormadeItem.price}zł</div>
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
                                    <div>{tailormadeCart.tailormadeItemsPrice.toFixed(2)}zł</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Dostawa</div>
                                    <div>{tailormadeCart.shippingPrice.toFixed(2)}zł</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div><strong>Podsumowanie zamówienia</strong></div>
                                    <div><strong>{tailormadeCart.totalPrice.toFixed(2)}zł</strong></div>
                                </div>
                            </li>
                            <li>
                                <button type="button" onClick={placeTailormadeOrderHandler} className="primary block" disabled={tailormadeCart.tailormadeCartItems.length === 0}>Złóż zamówienie</button>
                            </li>
                                {loading && <LoadingBox></LoadingBox>}
                                {error && <MessageBox variant="danger">{error}</MessageBox>}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}