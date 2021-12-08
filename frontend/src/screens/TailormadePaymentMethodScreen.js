import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { saveTailormadePaymentMethod } from '../actions/tailormadeCartActions';
import TailormadeCheckoutSteps from '../components/TailormadeCheckoutSteps';

export default function TailormadePaymentMethodScreen(props) {
    const tailormadeCart = useSelector((state) => state.tailormadeCart);
    const {tailormadeShippingAddress} = tailormadeCart;
    if(!tailormadeShippingAddress.address) {
        props.history.push('/tailormadeshipping');
    };
    const [tailormadePaymentMethod, setTailormadePaymentMethod] = useState('PayPal');
    const dispatch = useDispatch();
    const submitHandler = (e) =>{
        e.preventDefault();
        dispatch(saveTailormadePaymentMethod(tailormadePaymentMethod));
        props.history.push('/placetailormadeorder');
    };
    return (
        <div>
            <TailormadeCheckoutSteps step1 step2 step3 step4></TailormadeCheckoutSteps>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Metoda płatności:</h1>
                </div>
                <div>
                    <div>
                        <input type="radio" id="paypal" value="PayPal" name="paymentMethod" required checked onChange={(e) => setTailormadePaymentMethod(e.target.value)}></input>
                        <label htmlFor="paypal">PayPal</label>
                    </div>
                </div>
                <div>
                    <div>
                        <input type="radio" id="stripe" value="stripe" name="paymentMethod" required onChange={(e) => setTailormadePaymentMethod(e.target.value)}></input>
                        <label htmlFor="paypal">Przelew</label>
                    </div>
                </div>
                <div>
                    <button className="primary" type="submit">Kontynuuj</button>
                </div>
            </form>
        </div>
    )
}