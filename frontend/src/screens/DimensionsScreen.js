import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { saveDimensions } from '../actions/tailormadeCartActions';
import TailormadeCheckoutSteps from '../components/TailormadeCheckoutSteps'

export default function DimensionsScreen(props) {
    const userSignin = useSelector(state => state.userSignin);
    const { userInfo} = userSignin;
    const tailormadeCart = useSelector(state => state.tailormadeCart);
    const {dimensions} = tailormadeCart;
    if(!userInfo){
        props.history.push('/signin');
    }
    const [height, setHeight] = useState(dimensions.height);
    const [shoulderwidth, setShoulderwidth] = useState(dimensions.shoulderwidth);
    const [collarcircumference, setCollarcircumference] = useState(dimensions.collarcircumference);
    const [chestcircumference, setChestcircumference] = useState(dimensions.chestcircumference);
    const [waistcircumference, setWaistcircumference] = useState(dimensions.waistcircumference);
    const [sleevecircumference, setSleevecircumference] = useState(dimensions.sleevecircumference);
    const dispatch = useDispatch();
    const submitHandler = (e) =>{
        e.preventDefault();
        dispatch(saveDimensions({height, shoulderwidth, collarcircumference, chestcircumference, waistcircumference, sleevecircumference}));
    props.history.push('/tailormadeshipping');
    };
    return (
        <div>
            <TailormadeCheckoutSteps step1 step2></TailormadeCheckoutSteps>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Wymiary</h1>
                </div>
                <div>
                    <label htmlFor="height">Długość [cm]:</label>
                    <input type="number" min="1" step="0.1" id="height" placeholder="Wpisz długość [cm]..." value={height} onChange={(e) => setHeight(e.target.value)} required></input>
                </div>
                <div>
                    <label htmlFor="chestCircumference">Obwód klatki piersiowej [cm]:</label>
                    <input type="number" min="1" step="0.1" id="chestcircumference" placeholder="Wpisz Obwód klatki piersiowej [cm]..." value={chestcircumference} onChange={(e) => setChestcircumference(e.target.value)} required></input>
                </div>
                <div>
                    <label htmlFor="shoulderwidth">Szerokość w ramionach [cm]:</label>
                    <input type="number" min="1" step="0.1" id="shoulderwidth" placeholder="Wpisz szerokość w ramionach [cm]..." value={shoulderwidth} onChange={(e) => setShoulderwidth(e.target.value)} required></input>
                </div>
                <div>
                    <label htmlFor="collarcircumference">Obwód kołnierza [cm]:</label>
                    <input type="number" min="1" step="0.1" id="collarcircumference" placeholder="Wpisz Obwód kołnierza [cm]..." value={collarcircumference} onChange={(e) => setCollarcircumference(e.target.value)} required></input>
                </div>
                <div>
                    <label htmlFor="waistcircumference">Obwód w talii [cm]:</label>
                    <input type="number" min="1" step="0.1" id="waistcircumference" placeholder="Wpisz Obwód w talii [cm]..." value={waistcircumference} onChange={(e) => setWaistcircumference(e.target.value)} required></input>
                </div>
                <div>
                    <label htmlFor="sleevecircumference">Obwód rękawa [cm]:</label>
                    <input type="number" min="1" step="0.1" id="sleevecircumference" placeholder="Wpisz Obwód rękawa [cm]..." value={sleevecircumference} onChange={(e) => setSleevecircumference(e.target.value)} required></input>
                </div>
                <div>
                    <label/>
                    <button className="primary" type="submit">Kontynuuj</button>
                </div>
            </form>
        </div>
        
    )
}