import React, { useEffect } from 'react';
import TailorMade from '../components/TailorMade';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { listTailorMade } from '../actions/tailorMadeActions';

export default function TailorMadeScreen() {

  const dispatch = useDispatch();
  const tailormadeList = useSelector(state => state.tailormadeList);
  const {loading, error, tailormades} = tailormadeList;

  useEffect(() => {
    dispatch(listTailorMade());
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
            <TailorMade key={tailormade._id} tailormade={tailormade}></TailorMade>
          ))}
        </div>
      )}
    </div>
  );
}