// frontend/src/components/PaymentSheet.jsx
import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_API_KEY_DEV);

// PaymentSheetForm handles the UI and submission
const PaymentSheetForm = ({ onCancel, onPaymentSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setLoading(true);

    // Using redirect: 'if_required' will let Stripe confirm the payment inline if no redirection is needed
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.origin + '/user/dashboard',
      },
      redirect: 'if_required',
    });

    if (error) {
      console.error('Payment confirmation error:', error.message);
      alert(error.message);
      setLoading(false);
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      // Call the provided callback to update Sanity with your confirmPayment method
      onPaymentSuccess();
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="my-4">
        <PaymentElement />
      </div>
      <div className="flex justify-center gap-4">
        <button
          type="submit"
          disabled={!stripe || loading}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          {loading ? 'Processing...' : 'Pay Now'}
        </button>
        <button type="button" className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

// PaymentSheet gets clientSecret from backend and wraps PaymentSheetForm inside Elements
const PaymentSheet = ({ amount, onCancel, onPaymentSuccess }) => {
  const [clientSecret, setClientSecret] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_STRIPE_SERVER_URL_DEV}/api/payments/payment-sheet`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount }),
    })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.paymentIntent);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error creating payment intent:', error);
        setIsLoading(false);
      });
  }, [amount]);

  if (isLoading) return <div>Loading payment details...</div>;

  const options = {
    clientSecret,
    // Optionally set appearance options here.
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <PaymentSheetForm onCancel={onCancel} onPaymentSuccess={onPaymentSuccess} />
    </Elements>
  );
};

export default PaymentSheet;
