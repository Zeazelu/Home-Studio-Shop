import Axios from 'axios';
import { TAILORMADE_CREATE_FAIL, TAILORMADE_CREATE_REQUEST, TAILORMADE_CREATE_SUCCESS, TAILORMADE_DELETE_FAIL, TAILORMADE_DELETE_REQUEST, TAILORMADE_DELETE_SUCCESS, TAILORMADE_DETAILS_FAIL, TAILORMADE_DETAILS_REQUEST, TAILORMADE_DETAILS_SUCCESS, TAILORMADE_LIST_FAIL, TAILORMADE_LIST_REQUEST, TAILORMADE_LIST_SUCCESS } from '../constants/tailorMadeConstants';

export const listTailorMade = () => async (dispatch) => {
    dispatch({
        type: TAILORMADE_LIST_REQUEST,
    });
    try {
        const { data } = await Axios.get('/api/tailormade');
        dispatch({ type: TAILORMADE_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: TAILORMADE_LIST_FAIL, payload: error.message });
    }
};

export const detailsTailorMade = (tailormadeId) => async (dispatch) => {
    dispatch({ type: TAILORMADE_DETAILS_REQUEST, payload: tailormadeId });
    try {
        const { data } = await Axios.get(`/api/tailormade/${tailormadeId}`);
        dispatch({ type: TAILORMADE_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: TAILORMADE_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                 ? error.response.data.message
                 : error.message,
        });
    }
};

export const createTailorMade = () => async (dispatch, getState) => {
    dispatch({ type: TAILORMADE_CREATE_REQUEST });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = await Axios.post(
        '/api/tailormade',
        {},
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({
        type: TAILORMADE_CREATE_SUCCESS,
        payload: data.tailormade,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: TAILORMADE_CREATE_FAIL, payload: message });
    }
  };

  export const deleteTailorMade = (tailormadeId) => async (dispatch, getState) => {
    dispatch({ type: TAILORMADE_DELETE_REQUEST, payload: tailormadeId });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      await Axios.delete(`/api/tailormade/${tailormadeId}`, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      dispatch({ type: TAILORMADE_DELETE_SUCCESS });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: TAILORMADE_DELETE_FAIL, payload: message });
    }
  };
