import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { cartReducer } from './reducers/cartReducers';
import { orderCreateReducer, orderDetailsReducer, orderMineListReducer, orderPayReducer, orderListReducer, orderDeleteReducer, orderDeliverReducer } from './reducers/orderReducers';
import {
  productCreateReducer,
  productDetailsReducer,
  productListReducer,
  productUpdateReducer,
  productDeleteReducer,
} from './reducers/productReducers';
import { tailormadeCartReducer } from './reducers/tailormadeCartReducers';
import { tailormadeOrderCreateReducer, tailormadeOrderDeleteReducer, tailormadeOrderDeliverReducer, tailormadeOrderDetailsReducer, tailormadeOrderListReducer, tailormadeOrderMineListReducer, tailormadeOrderPayReducer } from './reducers/tailormadeOrderReducers';
import { tailormadeCreateReducer, tailormadeDeleteReducer, tailormadeDetailsReducer, tailormadeListReducer, tailormadeUpdateReducer } from './reducers/tailormadeReducers';
import { userDetailsReducer, userRegisterReducer, userSigninReducer, userUpdateProfileReducer, userListReducer, userDeleteReducer, userUpdateReducer,} from './reducers/userReducers';

const initialState = {
  userSignin: {
    userInfo: localStorage.getItem('userInfo')
      ? JSON.parse(localStorage.getItem('userInfo'))
      : null,
  },
  cart: {
    cartItems: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [],
    shippingAddress: localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {}, paymentMethod: 'PayPal',
  },
  tailormadeCart: {
    tailormadeCartItems: localStorage.getItem('tailormadeCartItems')
      ? JSON.parse(localStorage.getItem('tailormadeCartItems'))
      : [],
    dimensions: localStorage.getItem('dimensions') ? JSON.parse(localStorage.getItem('dimensions')) : {},
    tailormadeShippingAddress: localStorage.getItem('tailormadeShippingAddress') ? JSON.parse(localStorage.getItem('tailormadeShippingAddress')) : {}, paymentMethod: 'PayPal',
  },
};
const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userSignin: userSigninReducer,
  userRegister: userRegisterReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderMineList: orderMineListReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productDelete: productDeleteReducer,
  orderList: orderListReducer,
  orderDelete: orderDeleteReducer,
  orderDeliver: orderDeliverReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  tailormadeList: tailormadeListReducer,
  tailormadeDetails: tailormadeDetailsReducer,
  tailormadeCart: tailormadeCartReducer,
  tailormadeOrderCreate: tailormadeOrderCreateReducer,
  tailormadeOrderDetails: tailormadeOrderDetailsReducer,
  tailormadeOrderPay: tailormadeOrderPayReducer,
  tailormadeOrderMineList: tailormadeOrderMineListReducer,
  tailormadeCreate: tailormadeCreateReducer,
  tailormadeUpdate: tailormadeUpdateReducer,
  tailormadeDelete: tailormadeDeleteReducer,
  tailormadeOrderList: tailormadeOrderListReducer,
  tailormadeOrderDelete: tailormadeOrderDeleteReducer,
  tailormadeOrderDeliver: tailormadeOrderDeliverReducer,
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);
export default store;