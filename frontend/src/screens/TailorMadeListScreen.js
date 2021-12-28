import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTailormade, listTailormade, deleteTailormade } from '../actions/tailormadeActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { TAILORMADE_CREATE_RESET, TAILORMADE_DELETE_RESET } from '../constants/tailormadeConstants';


export default function TailormadeListScreen(props) {
  const tailormadeList = useSelector((state) => state.tailormadeList);
  const { loading, error, tailormades } = tailormadeList;

  const tailormadeCreate = useSelector((state) => state.tailormadeCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    tailormade: createdTailormade,
  } = tailormadeCreate;

  const tailormadeDelete = useSelector((state) => state.tailormadeDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = tailormadeDelete;

  const dispatch = useDispatch();
  useEffect(() => {
    if (successCreate) {
      dispatch({ type: TAILORMADE_CREATE_RESET });
      props.history.push(`/tailormadelist`);
    }
    if (successDelete) {
      dispatch({ type: TAILORMADE_DELETE_RESET });
    }
    dispatch(listTailormade());
  }, [createdTailormade, dispatch, props.history, successCreate, successDelete]);
  const deleteHandler = (tailormade) => {
    if (window.confirm('Czy na pewno usunąć produkt?')) {
      dispatch(deleteTailormade(tailormade._id));
    }
  };
  const createHandler = () => {
    dispatch(createTailormade());
  };
  return (
    <div>
      <div className="row">
        <h1>Produkty</h1>
        <button type="button" className="primary" onClick={createHandler}>
          Dodaj produkt
        </button>
      </div>
      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
      {loadingCreate && <LoadingBox></LoadingBox>}
      {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAZWA</th>
              <th>CENA</th>
              <th>KATEGORIA</th>
              <th>AKCJA</th>
            </tr>
          </thead>
          <tbody>
            {tailormades.map((tailormade) => (
              <tr key={tailormade._id}>
                <td>{tailormade._id}</td>
                <td>{tailormade.name}</td>
                <td>{tailormade.price}zł</td>
                <td>{tailormade.category}</td>
                <td>
                  <button
                    type="button"
                    className="small"
                    onClick={() =>
                      props.history.push(`/tailormade/${tailormade._id}/edit`)
                    }
                  >
                    Edytuj
                  </button>
                  <button
                    type="button"
                    className="small"
                    onClick={() => deleteHandler(tailormade)}
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