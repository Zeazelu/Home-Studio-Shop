import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import AdminRoute from './components/AdminRoute';
import PrivateRoute from './components/PrivateRoute';
import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import OrderScreen from './screens/OrderScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductScreen from './screens/ProductScreen';
import ProfileScreen from './screens/ProfileScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import SigninScreen from './screens/SigninScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import OrderListScreen from './screens/OrderListScreen';
import ReadyProductsScreen from './screens/ReadyProductsScreen';
import UserListScreen from './screens/UserListScreen';
import TailormadeCartScreen from './screens/TailormadeCartScreen';
import TailormadeShippingAddressScreen from './screens/TailormadeShippingAddressScreen';
import DimensionsScreen from './screens/DimensionsScreen';
import tailormadePaymentMethodScreen from './screens/TailormadePaymentMethodScreen';
import TailormadePlaceOrderScreen from './screens/TailormadePlaceOrderScreen';
import TailormadeOrderScreen from './screens/TailormadeOrderScreen';
import TailormadeOrderListScreen from './screens/TailormadeOrderListScreen';
import TailormadeOrderHistoryScreen from './screens/TailormadeOrderHistoryScreen';
import TailormadeListScreen from './screens/TailormadeListScreen';
import TailormadeEditScreen from './screens/TailormadeEditScreen';
import TailormadeProductsScreen from './screens/TailormadeProductsScreen';
import TailormadeProducts from './screens/Tailormade';
import UserEditScreen from './screens/UserEditScreen';
import SearchScreen from './screens/SearchScreen';
import Header from './components/Header';
import CartChoiceScreen from './screens/CartChoiceScreen';
import ProfileChoiceScreen from './screens/ProfileChoiceScreen';
import AdminChoiceScreen from './screens/AdminChoiceScreen';

function App() {
  return (
    <BrowserRouter>
      <div className="grid-container">
        <Header />
        <main>
          <Route path="/signin" component={SigninScreen}></Route>
          <Route path="/register" component={RegisterScreen}></Route>
          <Route path="/readyproducts" component={ReadyProductsScreen}></Route>
          <Route path="/cartchoice" component={CartChoiceScreen}></Route>
          <Route path="/profilechoice" component={ProfileChoiceScreen}></Route>
          <Route path="/adminchoice" component={AdminChoiceScreen}></Route>
          <Route path="/cart/:id?" component={CartScreen}></Route>
          <Route path="/product/:id" component={ProductScreen} exact></Route>
          <Route path="/product/:id/edit" component={ProductEditScreen} exact></Route>
          <Route path="/shipping" component={ShippingAddressScreen}></Route>
          <Route path="/payment" component={PaymentMethodScreen}></Route>
          <Route path="/placeorder" component={PlaceOrderScreen}></Route>
          <Route path="/order/:id" component={OrderScreen}></Route>
          <Route path="/orderhistory" component={OrderHistoryScreen}></Route>
          <Route path="/search/name/:name?" component={SearchScreen} exact></Route>
          <Route path="/search/category/:category" component={SearchScreen} exact></Route>
          <Route path="/search/category/:category/name/:name" component={SearchScreen} exact></Route>
          <Route path="/tailormadeproducts" component={TailormadeProductsScreen}></Route>
          <Route path="/tailormadecart/:id?" component={TailormadeCartScreen}></Route>
          <Route path="/tailormade/:id" component={TailormadeProducts} exact></Route>
          <Route path="/tailormade/:id/edit" component={TailormadeEditScreen} exact></Route>
          <Route path="/dimensions" component={DimensionsScreen}></Route>
          <Route path="/tailormadeshipping" component={TailormadeShippingAddressScreen}></Route>
          <Route path="/tailormadepayment" component={tailormadePaymentMethodScreen}></Route>
          <Route path="/placetailormadeorder" component={TailormadePlaceOrderScreen}></Route>
          <Route path="/tailormadeorder/:id" component={TailormadeOrderScreen}></Route>
          <Route path="/tailormadeorderhistory" component={TailormadeOrderHistoryScreen}></Route>
          <Route path="/search/category/:category/name/:name/min/:min/max/:max/rating/:rating/order/:order" component={SearchScreen} exact></Route>
          <PrivateRoute path="/profile" component={ProfileScreen}></PrivateRoute>
          <AdminRoute path="/productlist" component={ProductListScreen}></AdminRoute>
          <AdminRoute path="/orderlist" component={OrderListScreen}></AdminRoute>
          <AdminRoute path="/tailormadelist" component={TailormadeListScreen}></AdminRoute>
          <AdminRoute path="/tailormadeorderlist" component={TailormadeOrderListScreen}></AdminRoute>
          <AdminRoute path="/userlist" component={UserListScreen}></AdminRoute>
          <AdminRoute path="/user/:id/edit" component={UserEditScreen}></AdminRoute>
          <Route path="/" component={HomeScreen} exact></Route>
        </main>
        <footer className="row center">Wszystkie prawa zastrzeżone</footer>
      </div>
    </BrowserRouter>
  );
}
export default App;