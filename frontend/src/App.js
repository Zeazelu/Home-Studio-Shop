import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import { signout } from './actions/userActions';
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
import SearchBox from './components/SearchBox';
import SearchScreen from './screens/SearchScreen';
import { listProductCategories } from './actions/productActions';
import LoadingBox from './components/LoadingBox';
import MessageBox from './components/MessageBox';

function App() {
  const cart = useSelector((state) => state.cart);
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const { cartItems } = cart;

  const tailormadeCart = useSelector((state) => state.tailormadeCart);
  const { tailormadeCartItems } = tailormadeCart;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };
  const productCategoryList = useSelector((state) => state.productCategoryList);
  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = productCategoryList;
  useEffect(() => {
    dispatch(listProductCategories());
  }, [dispatch]);

  const [isNavVisible, setNavVisibility] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 700px)");
    mediaQuery.addListener(handleMediaQueryChange);
    handleMediaQueryChange(mediaQuery);
    return () => {
      mediaQuery.removeListener(handleMediaQueryChange);
    };
  }, []);

  const handleMediaQueryChange = mediaQuery => {
    if (mediaQuery.matches) {
      setIsSmallScreen(true);
    } else {
      setIsSmallScreen(false);
    }
  };

  const toggleNav = () => {
    setNavVisibility(!isNavVisible);
  };
  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className='row'>
          
          <div>
            <button
              type="button"
              className="open-sidebar"
              onClick={() => setSidebarIsOpen(true)}
            >
              <i className="fa fa-bars"></i>
            </button>
            <Link className="brand" to="/">
              HomeStudio
            </Link>
          </div>
          <div>
            <Route
              render={({ history }) => (
                <SearchBox history={history}></SearchBox>
              )}
            ></Route>
          </div>
          <div>
            <div className="dropdown">
              <Link to="#">
                Koszyk
              </Link>
              <ul className="dropdown-content">
                <li>
                  <Link to="/cart">
                    Gotowe produkty
                    {cartItems.length > 0 && (
                      <span className="badge">{cartItems.length}</span>
                    )}
                  </Link>
                </li>
                <li>
                  <Link to="/tailormadecart">
                    Produkty szyte na miarę
                    {tailormadeCartItems.length > 0 && (
                      <span className="badge">{tailormadeCartItems.length}</span>
                    )}
                  </Link>
                </li>
              </ul>
            </div>
            {userInfo ? (
              <div className="dropdown">
                <Link to="#">
                  {userInfo.name} <i className="fa fa-caret-down"></i>{' '}
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/profile">Profil</Link>
                  </li>
                  <li>
                    <Link to="/orderhistory">Zamówione gotowe produkty</Link>
                  </li>
                  <li>
                    <Link to="/tailormadeorderhistory">Zamówione produkty szyte na miarę</Link>
                  </li>
                  <li>
                    <Link to="#signout" onClick={signoutHandler}>
                      Wyloguj się
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/signin">Logowanie</Link>
            )}
            {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <Link to="#admin">
                  Admin <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/dashboard">Panel</Link>
                  </li>
                  <li>
                    <Link to="/productlist">Gotowe produkty</Link>
                  </li>
                  <li>
                    <Link to="/tailormadelist">Produkty szyte na miarę</Link>
                  </li>
                  <li>
                    <Link to="/orderlist">Zamówione gotowe produkty</Link>
                  </li>
                  <li>
                    <Link to="/tailormadeorderlist">Zamówione produkty szyte na miarę</Link>
                  </li>
                  <li>
                    <Link to="/userlist">Użytkownicy</Link>
                  </li>
                </ul>
              </div>
            )}

          </div>
          
        </header>
        <aside className={sidebarIsOpen ? 'open' : ''}>
          <ul className="categories">
            <li>
              <h3>Kategorie</h3>
              <button onClick={() => setSidebarIsOpen(false)} className="close-sidebar" type="button">
                <i className="fa fa-close"></i>
              </button>
            </li>
            {loadingCategories ? (
              <LoadingBox></LoadingBox>
            ) : errorCategories ? (
              <MessageBox variant="danger">{errorCategories}</MessageBox>
            ) : (
              categories.map((c) => (
                <button key={c} type="button" className="primary block">
                  <Link className="category" to={`/search/category/${c}`}
                    onClick={() => setSidebarIsOpen(false)}
                  >
                    {c}
                  </Link>

                </button>
              ))
            )}
          </ul>
        </aside>
        <main>
          <Route path="/signin" component={SigninScreen}></Route>
          <Route path="/register" component={RegisterScreen}></Route>
          <Route path="/readyproducts" component={ReadyProductsScreen}></Route>
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