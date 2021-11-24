import React from 'react'

export default function CheckoutSteps(props) {
    return (
        <div className="row checkout-steps">
            <div className={props.step1 ? 'active': ''}>Logowanie</div>
            <div className={props.step2 ? 'active': ''}>Adres dostawy</div>
            <div className={props.step3 ? 'active': ''}>Płatność</div>
            <div className={props.step4 ? 'active': ''}>Potwierdzenie zamówienia</div>
        </div>
    )
}