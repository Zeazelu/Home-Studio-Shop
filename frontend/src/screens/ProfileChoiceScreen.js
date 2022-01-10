import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signout } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function ProfileChoiceScreen(props) {
    const dispatch = useDispatch();
    const signoutHandler = () => {
        dispatch(signout());
    };
    const profileHandler = () => {
        props.history.push('/profile');
    };
    const orderHistoryHandler = () => {
        props.history.push('/orderhistory');
    };
    const tailormadeHistoryHandler = () => {
        props.history.push('/tailormadeorderhistory');
    };
    const userSignin = useSelector((state) => state.userSignin);
    const { loading, error } = userSignin;
    
    return (
        <div>
            <form className="form" >
                <div>
                    <h1>ZARZĄDZANIE PROFILEM</h1>
                </div>
                {loading && <LoadingBox></LoadingBox>}
                {error && <MessageBox variant="danger">{error}</MessageBox>}
                <button
                    type="button"
                    className="primary block"
                    onClick={profileHandler}
                >
                    PROFIL
                </button>
                <button
                    type="button"
                    className="primary block"
                    onClick={orderHistoryHandler}
                >
                    ZAMÓWIONE GOTOWE PRODUKTY
                </button>
                <button
                    type="button"
                    className="primary block"
                    onClick={tailormadeHistoryHandler}
                >
                    ZAMÓWIONE PRODYKTY SZYTE NA MIARĘ
                </button>
                <button
                    type="button"
                    className="primary block"
                    onClick={signoutHandler}
                >
                    WYLOGUJ SIĘ
                </button>
            </form>
        </div>
    );
}