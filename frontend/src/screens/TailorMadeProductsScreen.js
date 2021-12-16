import React, { useEffect } from 'react';
import Tailormade from '../components/Tailormade';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { listTailormade } from '../actions/tailormadeActions';

export default function TailormadeProductsScreen() {

  const dispatch = useDispatch();
  const tailormadeList = useSelector(state => state.tailormadeList);
  const {loading, error, tailormades} = tailormadeList;

  useEffect(() => {
    dispatch(listTailormade());
  }, [dispatch]);
  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className="row center">
          {tailormades.map((tailormade) => (
            <Tailormade key={tailormade._id} tailormade={tailormade}></Tailormade>
          ))}
        </div>
      )}
    </div>
  );
}