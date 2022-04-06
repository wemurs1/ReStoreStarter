import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutPage from './CheckoutPage';

const stripePromise = loadStripe(
  'pk_test_51KkomJAQT6vtUd9xWAEwc1tjER0BCJltoBXy8nNrotLlYLn1AdVnnVp8AyiCBxGq8sEYP7S19i90JwEdLZ10Pa5g00c6eImiRC'
);

export default function CheckoutWrapper() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutPage />
    </Elements>
  );
}
