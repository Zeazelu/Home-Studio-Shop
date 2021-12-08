import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listTailormadeOrderMine } from '../actions/tailormadeOrderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function TailormadeOrderHistoryScreen(props) {
    const tailormadeOrderMineList = useSelector(state => state.tailormadeOrderMineList);
    const { loading, error, tailormadeorders } = tailormadeOrderMineList;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(listTailormadeOrderMine());
    }, [dispatch]);

    return (
        <div>
            <div>
                <h1>Historia zamówień gotowych produktów</h1>
                {loading ? <LoadingBox></LoadingBox> : error ? (<MessageBox variant="danger">{error}</MessageBox>) : (<table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>DATA</th>
                            <th>CENA</th>
                            <th>OPŁACONO</th>
                            <th>DOSTARCZONO</th>
                            <th>AKCJE</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tailormadeorders.map((tailormadeorder) => (
                            <tr key={tailormadeorder._id}>
                                <td>{tailormadeorder._id}</td>
                                <td>{tailormadeorder.createdAt.substring(0, 10)}</td>
                                <td>{tailormadeorder.totalPrice.toFixed(2)}zł</td>
                                <td>{tailormadeorder.isPaid ? tailormadeorder.paidAt.substring(0, 10) : 'Nie'}</td>
                                <td>{tailormadeorder.isDelivered ? tailormadeorder.deliveredAt.substring(0, 10) : 'Nie'}</td>
                                <td><button type="button" className="small" onClick={() => { props.history.push(`/tailormadeorder/${tailormadeorder._id}`) }}>Szczegóły</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                )}
            </div>
        </div>

    );
}