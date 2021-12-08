import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTailormadeOrder, listTailormadeOrders } from '../actions/tailormadeOrderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { TAILOR_ORDER_DELETE_RESET } from '../constants/tailormadeOrderConstants';

export default function TailormadeOrderListScreen(props) {
  const tailormadeOrderList = useSelector((state) => state.tailormadeOrderList);
  const { loading, error, tailormadeorders } = tailormadeOrderList;
  const tailormadeOrderDelete = useSelector((state) => state.tailormadeOrderDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = tailormadeOrderDelete;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: TAILOR_ORDER_DELETE_RESET });
    dispatch(listTailormadeOrders());
  }, [dispatch, successDelete]);
  const deleteTailormadeHandler = (tailormadeorder) => {
    if (window.confirm('Are you sure to delete?')) {
        dispatch(deleteTailormadeOrder(tailormadeorder._id));
      }
  };
  return (
    <div>
      <h1>Zamówienia</h1>
      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>UŻYTKOWNIK</th>
              <th>DATA</th>
              <th>KWOTA</th>
              <th>ZAPŁACONO</th>
              <th>DOSTARCZONO</th>
              <th>AKCJE</th>
            </tr>
          </thead>
          <tbody>
            {tailormadeorders.map((tailormadeorder) => (
              <tr key={tailormadeorder._id}>
                <td>{tailormadeorder._id}</td>
                <td>{tailormadeorder.user.name}</td>
                <td>{tailormadeorder.createdAt.substring(0, 10)}</td>
                <td>{tailormadeorder.totalPrice.toFixed(2)}zł</td>
                <td>{tailormadeorder.isPaid ? tailormadeorder.paidAt.substring(0, 10) : 'Nie'}</td>
                <td>
                  {tailormadeorder.isDelivered
                    ? tailormadeorder.deliveredAt.substring(0, 10)
                    : 'Nie'}
                </td>
                <td>
                  <button
                    type="button"
                    className="small"
                    onClick={() => {
                      props.history.push(`/tailormadeorder/${tailormadeorder._id}`);
                    }}
                  >
                    Szczegóły
                  </button>
                  <button
                    type="button"
                    className="small"
                    onClick={() => deleteTailormadeHandler(tailormadeorder)}
                  >
                    Usuń
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}