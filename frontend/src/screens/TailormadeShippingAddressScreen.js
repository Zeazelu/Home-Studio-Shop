import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { saveTailormadeShippingAddress } from '../actions/tailormadeCartActions';
import TailormadeCheckoutSteps from '../components/TailormadeCheckoutSteps'

export default function TailormadeShippingAddressScreen(props) {
    const userSignin = useSelector(state => state.userSignin);
    const { userInfo} = userSignin;
    const tailormadeCart = useSelector(state => state.tailormadeCart);
    const {tailormadeShippingAddress} = tailormadeCart;
    if(!userInfo){
        props.history.push('/signin');
    }
    const [fullName, setFullName] = useState(tailormadeShippingAddress.fullName);
    const [address, setAddress] = useState(tailormadeShippingAddress.address);
    const [city, setCity] = useState(tailormadeShippingAddress.city);
    const [postalCode, setPostalCode] = useState(tailormadeShippingAddress.postalCode);
    const [country, setCountry] = useState(tailormadeShippingAddress.country);
    const dispatch = useDispatch();
    const submitHandler = (e) =>{
        e.preventDefault();
        dispatch(saveTailormadeShippingAddress({fullName, address, city, postalCode, country}));
    props.history.push('/tailormadepayment');
    };
    return (
        <div>
            <TailormadeCheckoutSteps step1 step2 step3></TailormadeCheckoutSteps>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Adres dostawy</h1>
                </div>
                <div>
                    <label htmlFor="fullName">Imię i nazwisko</label>
                    <input type="text" id="fullName" placeholder="Wpisz imię i nazwisko..." value={fullName} onChange={(e) => setFullName(e.target.value)} required></input>
                </div>
                <div>
                    <label htmlFor="address">Adres dostawy</label>
                    <input type="text" id="address" placeholder="Wpisz adres..." value={address} onChange={(e) => setAddress(e.target.value)} required></input>
                </div>
                <div>
                    <label htmlFor="city">Miasto</label>
                    <input type="text" id="city" placeholder="Wpisz miasto..." value={city} onChange={(e) => setCity(e.target.value)} required></input>
                </div>
                <div>
                    <label htmlFor="postalCode">Kod pocztowy</label>
                    <input type="text" id="postalCode" placeholder="Wpisz kod pocztowy..." value={postalCode} onChange={(e) => setPostalCode(e.target.value)} required></input>
                </div>
                <div>
                    <label htmlFor="country">Kraj</label>
                    <input type="text" id="country" placeholder="Wpisz kraj..." value={country} onChange={(e) => setCountry(e.target.value)} required></input>
                </div>
                <div>
                    <label/>
                    <button className="primary" type="submit">Kontynuuj</button>
                </div>
            </form>
        </div>
        
    )
}