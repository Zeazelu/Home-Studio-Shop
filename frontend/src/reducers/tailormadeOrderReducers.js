import {
    TAILOR_ORDER_CREATE_FAIL, 
    TAILOR_ORDER_CREATE_REQUEST, 
    TAILOR_ORDER_CREATE_RESET, 
    TAILOR_ORDER_CREATE_SUCCESS, 
    TAILOR_ORDER_DETAILS_FAIL, 
    TAILOR_ORDER_DETAILS_REQUEST, 
    TAILOR_ORDER_DETAILS_SUCCESS, 
    TAILOR_ORDER_MINE_LIST_FAIL, 
    TAILOR_ORDER_MINE_LIST_REQUEST, 
    TAILOR_ORDER_MINE_LIST_SUCCESS, 
    TAILOR_ORDER_PAY_FAIL, 
    TAILOR_ORDER_PAY_REQUEST, 
    TAILOR_ORDER_PAY_RESET, 
    TAILOR_ORDER_PAY_SUCCESS, 
    TAILOR_ORDER_LIST_REQUEST, 
    TAILOR_ORDER_LIST_SUCCESS, 
    TAILOR_ORDER_LIST_FAIL, 
    TAILOR_ORDER_DELETE_REQUEST,
    TAILOR_ORDER_DELETE_SUCCESS,
    TAILOR_ORDER_DELETE_FAIL,
    TAILOR_ORDER_DELETE_RESET,
    TAILOR_ORDER_DELIVER_REQUEST,
    TAILOR_ORDER_DELIVER_SUCCESS,
    TAILOR_ORDER_DELIVER_FAIL,
    TAILOR_ORDER_DELIVER_RESET,
  } from "../constants/tailormadeOrderConstants";
  
  export const tailormadeOrderCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case TAILOR_ORDER_CREATE_REQUEST:
        return { loading: true };
      case TAILOR_ORDER_CREATE_SUCCESS:
        return { loading: false, success: true, tailormadeorder: action.payload };
      case TAILOR_ORDER_CREATE_FAIL:
        return { loading: false, error: action.payload };
      case TAILOR_ORDER_CREATE_RESET:
        return {};
      default:
        return state;
    }
  };
  
  export const tailormadeOrderDetailsReducer = (state = { loading: true }, action) => {
    switch (action.type) {
      case TAILOR_ORDER_DETAILS_REQUEST:
        return { loading: true };
      case TAILOR_ORDER_DETAILS_SUCCESS:
        return { loading: false, tailormadeorder: action.payload };
      case TAILOR_ORDER_DETAILS_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const tailormadeOrderPayReducer = (state = {}, action) => {
    switch (action.type) {
      case TAILOR_ORDER_PAY_REQUEST:
        return { loading: true };
      case TAILOR_ORDER_PAY_SUCCESS:
        return { loading: false, success: true };
      case TAILOR_ORDER_PAY_FAIL:
        return { loading: false, error: action.payload };
      case TAILOR_ORDER_PAY_RESET:
        return {};
      default:
        return state;
    }
  };
  
  export const tailormadeOrderMineListReducer = (state = { tailormadeorders: [] }, action) => {
    switch (action.type) {
      case TAILOR_ORDER_MINE_LIST_REQUEST:
        return { loading: true };
      case TAILOR_ORDER_MINE_LIST_SUCCESS:
        return { loading: false, tailormadeorders: action.payload };
      case TAILOR_ORDER_MINE_LIST_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const tailormadeOrderListReducer = (state = { tailormadeorders: [] }, action) => {
    switch (action.type) {
      case TAILOR_ORDER_LIST_REQUEST:
        return { loading: true };
      case TAILOR_ORDER_LIST_SUCCESS:
        return { loading: false, tailormadeorders: action.payload };
      case TAILOR_ORDER_LIST_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const tailormadeOrderDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case TAILOR_ORDER_DELETE_REQUEST:
        return { loading: true };
      case TAILOR_ORDER_DELETE_SUCCESS:
        return { loading: false, success: true };
      case TAILOR_ORDER_DELETE_FAIL:
        return { loading: false, error: action.payload };
      case TAILOR_ORDER_DELETE_RESET:
        return {};
      default:
        return state;
    }
  };
  
  export const tailormadeOrderDeliverReducer = (state = {}, action) => {
    switch (action.type) {
      case TAILOR_ORDER_DELIVER_REQUEST:
        return { loading: true };
      case TAILOR_ORDER_DELIVER_SUCCESS:
        return { loading: false, success: true };
      case TAILOR_ORDER_DELIVER_FAIL:
        return { loading: false, error: action.payload };
      case TAILOR_ORDER_DELIVER_RESET:
        return {};
      default:
        return state;
    }
  };