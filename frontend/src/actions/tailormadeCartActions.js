import Axios from 'axios';
import { TAILORMADE_ADD_ITEM, TAILORMADE_REMOVE_ITEM, TAILORMADE_SAVE_DIMENSIONS, TAILORMADE_SAVE_PAYMENT_METHOD, TAILORMADE_SAVE_SHIPPING_ADDRESS } from '../constants/tailormadeCartConstants';

export const tailormadeAddToCart = (tailormadeId, qty) => async (dispatch, getState) => {
  const { data } = await Axios.get(`/api/tailormades/${tailormadeId}`);
  dispatch({
    type: TAILORMADE_ADD_ITEM,
    payload: {
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        tailormade: data._id,
        qty,
    },
  });
  localStorage.setItem('tailormadeCartItems', JSON.stringify(getState().tailormadeCart.tailormadeCartItems));
};


export const tailormadeRemoveFromCart = (tailormadeId) => (dispatch, getState) => {
  dispatch({ type: TAILORMADE_REMOVE_ITEM, payload: tailormadeId });
  localStorage.setItem('tailormadeCartItems', JSON.stringify(getState().tailormadeCart.tailormadeCartItems));
};

export const saveTailormadeShippingAddress = (data) => (dispatch) => {
  dispatch({ type: TAILORMADE_SAVE_SHIPPING_ADDRESS, payload: data });
  localStorage.setItem('tailormadeShippingAddress', JSON.stringify(data));
};

export const saveDimensions = (data) => (dispatch) => {
  dispatch({ type: TAILORMADE_SAVE_DIMENSIONS, payload: data });
  localStorage.setItem('dimensions', JSON.stringify(data));
};
export const saveTailormadePaymentMethod = (data) => (dispatch) => {
  dispatch({ type: TAILORMADE_SAVE_PAYMENT_METHOD, payload: data });
};