import React from 'react';
import { Link } from 'react-router-dom';

export default function HomeScreen() {
  return (
    <div>
    <Link className="col-3" to="/readyproducts">
      GOTOWE PRODUKTY
    </Link>
    <Link className="col-3" to="/tailormadeproducts">
      PRODUKTY SZYTE NA MIARĘ
    </Link>
  </div>
  )
};