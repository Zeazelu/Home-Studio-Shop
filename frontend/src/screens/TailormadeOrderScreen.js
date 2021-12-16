import Axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deliverTailormadeOrder, detailsTailormadeOrder, payTailormadeOrder } from '../actions/tailormadeOrderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { TAILOR_ORDER_DELIVER_RESET, TAILOR_ORDER_PAY_RESET } from '../constants/tailormadeOrderConstants';

export default function TailormadeOrderScreen(props) {
    const tailormadeOrderId = props.match.params.id;
    const [sdkReady, setSdkReady] = useState(false);
    const tailormadeOrderDetails = useSelector((state) => state.tailormadeOrderDetails);
    const { tailormadeorder, loading, error } = tailormadeOrderDetails;
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const tailormadeOrderPay = useSelector((state) => state.tailormadeOrderPay);
    const {
        loading: loadingPay,
        error: errorPay,
        success: successPay,
    } = tailormadeOrderPay;
    const tailormadeOrderDeliver = useSelector((state) => state.tailormadeOrderDeliver);
    const {
        loading: loadingDeliver,
        error: errorDeliver,
        success: successDeliver,
    } = tailormadeOrderDeliver;
    const dispatch = useDispatch();
    useEffect(() => {
        const addPayPalScript = async () => {
            const { data } = await Axios.get('/api/config/paypal');
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
            script.async = true;
            script.onload = () => {
                setSdkReady(true);
            };
            document.body.appendChild(script);
        };
        if (
            !tailormadeorder ||
            successPay ||
            successDeliver ||
            (tailormadeorder && tailormadeorder._id !== tailormadeOrderId)
        ) {
            dispatch({ type: TAILOR_ORDER_PAY_RESET });
            dispatch({ type: TAILOR_ORDER_DELIVER_RESET });
            dispatch(detailsTailormadeOrder(tailormadeOrderId));
        } else {
            if (!tailormadeorder.isPaid) {
                if (!window.paypal) {
                    addPayPalScript();
                } else {
                    setSdkReady(true);
                }
            }
        }
    }, [dispatch, tailormadeOrderId, sdkReady, successPay, successDeliver, tailormadeorder]);

    const successPaymentHandler = (paymentResult) => {
        dispatch(payTailormadeOrder(tailormadeorder, paymentResult));
    };

    const deliverHandler = () => {
        dispatch(deliverTailormadeOrder(tailormadeorder._id));
    };
    return loading ? (
        <LoadingBox></LoadingBox>
    ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
    ) : (
        <div>
            <h1>Zamówienie: {tailormadeorder._id}</h1>
            <div className="row top">
                <div className="col-2">
                        <ul>
                        <li>
                            <div className="card card-body">
                                <h2>Adres dostawy:</h2>
                                <p>
                                    <strong>Imię i nazwisko:</strong> {tailormadeorder.tailormadeShippingAddress.fullName} <br />
                                    <strong>Adres dostawy: </strong> {tailormadeorder.tailormadeShippingAddress.address},
                                    {tailormadeorder.tailormadeShippingAddress.postalCode},
                                    {tailormadeorder.tailormadeShippingAddress.city},{' '}
                                    {tailormadeorder.tailormadeShippingAddress.country}
                                </p>
                                {tailormadeorder.isDelivered ? (
                                    <MessageBox variant="success">
                                        Dostarczono: {tailormadeorder.deliveredAt.substring(0, 10)}
                                    </MessageBox>
                                ) : (
                                    <MessageBox variant="danger">Nie dostarczono</MessageBox>
                                )}
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h2>Płatność</h2>
                                <p>
                                    <strong>Metoda płatności:</strong> {tailormadeorder.paymentMethod}
                                </p>
                                {tailormadeorder.isPaid ? (
                                    <MessageBox variant="success">
                                        Zapłacono: {tailormadeorder.paidAt.substring(0, 20)}
                                    </MessageBox>
                                ) : (
                                    <MessageBox variant="danger">Nie zapłacono</MessageBox>
                                )}
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h2>Zamówione przedmioty</h2>
                                <ul>
                                    {tailormadeorder.tailormadeOrderItems.map((tailormadeItem) => (
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
                                                    <Link to={`/tailormadeproduct/${tailormadeItem.tailormade}`}>
                                                        {tailormadeItem.name}
                                                    </Link>
                                                </div>
                                                <div>
                                                    {tailormadeItem.qty} x {tailormadeItem.price}zł = {tailormadeItem.qty * tailormadeItem.price}zł
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </li>
                    </ul>
                    <ul>
                    <li>
                            <div className="card card-body">
                                <h2>Wymiary</h2>
                                <p>
                                    <strong>Długość [cm]:</strong> {tailormadeorder.dimensions.height}<br />
                                    <strong>Obwód klatki piersiowej [cm]:</strong> {tailormadeorder.dimensions.chestcircumference}<br />
                                    <strong>Szerokość w ramionach [cm]:</strong> {tailormadeorder.dimensions.shoulderwidth}<br />
                                    <strong>Obwód kołnierza [cm]:</strong> {tailormadeorder.dimensions.collarcircumference}<br />
                                    <strong>Obwód w talii [cm]:</strong> {tailormadeorder.dimensions.waistcircumference}<br />
                                    <strong>Obwód rękawa [cm]:</strong> {tailormadeorder.dimensions.sleevecircumference}<br />
                                </p>
                            </div>
                        </li>
                        </ul>
                </div>
                <div className="col-1">
                    <div className="card card-body">
                        <ul>
                            <li>
                                <h2>Podsumowanie zamówienia</h2>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Rzeczy:</div>
                                    <div>{tailormadeorder.tailormadeItemsPrice.toFixed(2)}zł</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Dostawa:</div>
                                    <div>{tailormadeorder.shippingPrice.toFixed(2)}zł</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>
                                        <strong> Podsumowanie</strong>
                                    </div>
                                    <div>
                                        <strong>{tailormadeorder.totalPrice.toFixed(2)}zł</strong>
                                    </div>
                                </div>
                            </li>
                            {!tailormadeorder.isPaid && (
                                <li>
                                    {!sdkReady ? (
                                        <LoadingBox></LoadingBox>
                                    ) : (
                                        <>
                                            {errorPay && (
                                                <MessageBox variant="danger">{errorPay}</MessageBox>
                                            )}
                                            {loadingPay && <LoadingBox></LoadingBox>}

                                            <PayPalButton
                                                amount={tailormadeorder.totalPrice}
                                                onSuccess={successPaymentHandler}
                                            ></PayPalButton>
                                        </>
                                    )}
                                </li>
                            )}
                            {userInfo.isAdmin && tailormadeorder.isPaid && !tailormadeorder.isDelivered && (
                                <li>
                                    {loadingDeliver && <LoadingBox></LoadingBox>}
                                    {errorDeliver && (
                                        <MessageBox variant="danger">{errorDeliver}</MessageBox>
                                    )}
                                    <button
                                        type="button"
                                        className="primary block"
                                        onClick={deliverHandler}
                                    >
                                        Dostarczono
                                    </button>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}