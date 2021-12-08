import Axios from 'axios';
import { TAILORMADE_EMPTY } from '../constants/tailormadeCartConstants';
import {
  TAILOR_ORDER_CREATE_FAIL,
  TAILOR_ORDER_CREATE_REQUEST,
  TAILOR_ORDER_CREATE_SUCCESS,
  TAILOR_ORDER_DETAILS_FAIL,
  TAILOR_ORDER_DETAILS_REQUEST,
  TAILOR_ORDER_DETAILS_SUCCESS,
  TAILOR_ORDER_MINE_LIST_FAIL,
  TAILOR_ORDER_MINE_LIST_REQUEST,
  TAILOR_ORDER_MINE_LIST_SUCCESS,
  TAILOR_ORDER_PAY_FAIL,
  TAILOR_ORDER_PAY_REQUEST,
  TAILOR_ORDER_PAY_SUCCESS,
  TAILOR_ORDER_LIST_REQUEST,
  TAILOR_ORDER_LIST_SUCCESS,
  TAILOR_ORDER_LIST_FAIL,
  TAILOR_ORDER_DELETE_REQUEST,
  TAILOR_ORDER_DELETE_SUCCESS,
  TAILOR_ORDER_DELETE_FAIL,
  TAILOR_ORDER_DELIVER_REQUEST,
  TAILOR_ORDER_DELIVER_SUCCESS,
  TAILOR_ORDER_DELIVER_FAIL,
} from '../constants/tailormadeOrderConstants';

export const createTailormadeOrder = (tailormadeorder) => async (dispatch, getState) => {
  dispatch({ type: TAILOR_ORDER_CREATE_REQUEST, payload: tailormadeorder });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.post('/api/tailormadeorders', tailormadeorder, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: TAILOR_ORDER_CREATE_SUCCESS, payload: data.tailormadeorder });
    dispatch({ type: TAILORMADE_EMPTY });
    localStorage.removeItem('tailormadeCartItems');
  } catch (error) {
    dispatch({
      type: TAILOR_ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const detailsTailormadeOrder = (tailormadeOrderId) => async (dispatch, getState) => {
  dispatch({ type: TAILOR_ORDER_DETAILS_REQUEST, payload: tailormadeOrderId });
  const { userSignin: { userInfo }, } = getState();
  try {
    const { data } = await Axios.get(`/api/tailormadeorders/${tailormadeOrderId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: TAILOR_ORDER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message = error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
    dispatch({ type: TAILOR_ORDER_DETAILS_FAIL, payload: message });
  }
};

export const payTailormadeOrder = (tailormadeorder, paymentResult) => async (
  dispatch,
  getState
) => {
  dispatch({ type: TAILOR_ORDER_PAY_REQUEST, payload: { tailormadeorder, paymentResult } });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = Axios.put(`/api/tailormadeorders/${tailormadeorder._id}/pay`, paymentResult, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: TAILOR_ORDER_PAY_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: TAILOR_ORDER_PAY_FAIL, payload: message });
  }
};

export const listTailormadeOrderMine = () => async (dispatch, getState) => {
  dispatch({type: TAILOR_ORDER_MINE_LIST_REQUEST});
const { userSignin: { userInfo } } = getState();
try {
  const {data} = await Axios.get('/api/tailormadeorders/mine', {
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
    },
  });
  dispatch({type: TAILOR_ORDER_MINE_LIST_SUCCESS, payload: data});
} catch (error) {
  const message = error.response && error.response.data.message
    ? error.response.data.message
    : error.message;
  dispatch({ type: TAILOR_ORDER_MINE_LIST_FAIL, payload: message });
}
};

export const listTailormadeOrders = () => async (dispatch, getState) => {
  dispatch({ type: TAILOR_ORDER_LIST_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.get('/api/tailormadeorders', {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    console.log(data);
    dispatch({ type: TAILOR_ORDER_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: TAILOR_ORDER_LIST_FAIL, payload: message });
  }
};

export const deleteTailormadeOrder = (tailormadeOrderId) => async (dispatch, getState) => {
  dispatch({ type: TAILOR_ORDER_DELETE_REQUEST, payload: tailormadeOrderId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = Axios.delete(`/api/tailormadeorders/${tailormadeOrderId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: TAILOR_ORDER_DELETE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: TAILOR_ORDER_DELETE_FAIL, payload: message });
  }
};
export const deliverTailormadeOrder = (tailormadeOrderId) => async (dispatch, getState) => {
  dispatch({ type: TAILOR_ORDER_DELIVER_REQUEST, payload: tailormadeOrderId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = Axios.put(
      `/api/tailormadeorders/${tailormadeOrderId}/deliver`,
      {},
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({ type: TAILOR_ORDER_DELIVER_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: TAILOR_ORDER_DELIVER_FAIL, payload: message });
  }
};