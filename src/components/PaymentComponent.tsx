import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';

const striveProps = loadStripe ('pk_test_51QEfYiQriIenC0pjJZqssK1yik2Kql2BXTLyGjf2lfc1ejHsbuIZwe8zmLM0oi1hGPff5tOtsUBYZiGsT23EHudw00jjN37dhS')


const PaymentComponent = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState<string | undefined>();
    const [loading, setLoading] = useState(false);

    const backendUrl = 'https://proyectochecasa.onrender.com'; // URL del backend desplegado

    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        //setLoading(true);
        //setError(null);

        if (!elements || !stripe) {
            return;
        }
        const cardElement = elements.getElement(CardElement);

        if (!cardElement) return;

        try {
            // Llamar al backend para crear el Payment Intent
            const { data: { clientSecret } } = await axios.post(`${backendUrl}/stripe/createPayment`, {
                amount: 1000, // Monto en centavos (ajusta según tu lógica)
            });

            // Confirmar el pago
            const { error: stripeError } = await stripe!.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: cardElement,
                },
            });

            if (stripeError) {
                setError(stripeError.message);
            } else {
                alert('Pago exitoso!');
                // Aquí podrías redirigir o hacer otra acción
            }
        } catch (err) {
            setError('Error en el proceso de pago');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement />
            <button type="submit" disabled={!stripe || loading}>
                {loading ? 'Cargando...' : 'Pagar'}
            </button>
            {error && <div>{error}</div>}
        </form>
    );
};

export default PaymentComponent;