import React from 'react';
import { useSelector } from 'react-redux';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function AdminChoiceScreen(props) {
    const productHandler = () => {
        props.history.push('/productlist');
      };
      const tailormadeHandler = () => {
        props.history.push('/tailormadelist');
      };
      const orderHandler = () => {
        props.history.push('/orderlist');
      };
      const tailormadeOrderHandler = () => {
        props.history.push('/tailormadeorderlist');
      };
      const userHandler = () => {
        props.history.push('/userlist');
      };
      const userSignin = useSelector((state) => state.userSignin);
    const { loading, error } = userSignin;
    return (
        <div>
        <form className="form" >
            <div>
                <h1>PANEL ADMINISTRATORA</h1>
            </div>
            {loading && <LoadingBox></LoadingBox>}
            {error && <MessageBox variant="danger">{error}</MessageBox>}
            <button
                type="button"
                className="primary block"
                onClick={productHandler}
            >
                GOTOWE PRODUKTY
            </button>
            <button
                type="button"
                className="primary block"
                onClick={tailormadeHandler}
            >
                PRODUKTY SZYTE NA MIARĘ
            </button>
            <button
                type="button"
                className="primary block"
                onClick={orderHandler}
            >
                ZAMÓWIENIA GOTOWYCH PRODUKTÓW
            </button>
            <button
                type="button"
                className="primary block"
                onClick={tailormadeOrderHandler}
            >
                ZAMÓWIENIA PRODUKTÓW SZYTYCH NA MIARĘ
            </button>
            <button
                type="button"
                className="primary block"
                onClick={userHandler}
            >
                UŻYTKOWNICY
            </button>
        </form>
    </div>
    );
}