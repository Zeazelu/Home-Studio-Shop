import React from 'react'
import {Link} from 'react-router-dom';

export default function Tailormade(props) {
    const { tailormade } = props;
    return (
        <div key={tailormade._id} className="card">
            <Link to={`/tailormade/${tailormade._id}`}>
                <img className="medium" src={tailormade.image} alt={tailormade.name} />
            </Link>
            <div className="card-body">
                <Link to={`/tailormade/${tailormade._id}`}>
                    <h2>{tailormade.name}</h2>
                </Link>
                <div className="row">
                    <div className="price">{tailormade.price}zł</div>
                </div>
            </div>
        </div>
    );
}