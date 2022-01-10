import React from 'react';
import { useSelector } from 'react-redux';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function CartChoiceScreen(props) {

    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;

    const tailormadeCart = useSelector((state) => state.tailormadeCart);
    const { tailormadeCartItems } = tailormadeCart;
    const cartHandler = () => {
        props.history.push('/cart');
    };
    const tailormadeCartHandler = () => {
        props.history.push('/tailormadecart');
    };
    const userSignin = useSelector((state) => state.userSignin);
    const { loading, error } = userSignin;
    return (
        <div>
            <form className="form" >
                <div>
                    <h1>KOSZYK</h1>
                </div>
                {loading && <LoadingBox></LoadingBox>}
                {error && <MessageBox variant="danger">{error}</MessageBox>}
                <button
                    type="button"
                    className="primary block"
                    onClick={cartHandler}
                >
                    KOSZYK GOTOWYCH PRODUKTÓW
                {cartItems.length > 0 && (
                    <span className="badge">{cartItems.length}</span>
                )}
                </button>
                <button
                    type="button"
                    className="primary block"
                    onClick={tailormadeCartHandler}
                >
                    KOSZYK PRODUKTÓW SZYTYCH NA MIARĘ
                    {tailormadeCartItems.length > 0 && (
                        <span className="badge">{tailormadeCartItems.length}</span>
                    )}
                </button>
            </form>
        </div>
    );
}