'use client';

import React, { useState } from 'react';
import { initializePayment, verifyPayment } from '@/lib/api';

interface PaystackCheckoutProps {
  email: string;
  amount: number; // in your currency (e.g., KES)
  metadata?: any;
  onSuccess?: (reference: string) => void;
  onClose?: () => void;
  buttonText?: string;
  className?: string;
}

export default function PaystackCheckout({
  email,
  amount,
  metadata = {},
  onSuccess,
  onClose,
  buttonText = 'Pay Now',
  className = ''
}: PaystackCheckoutProps) {
  const [loading, setLoading] = useState(false);

  async function handlePayment() {
    setLoading(true);
    try {
      const response = await initializePayment(email, amount, metadata);

      if (response.authorization_url) {
        const popup = window.open(
          response.authorization_url,
          'PaystackCheckout',
          'width=600,height=700,scrollbars=yes'
        );

        const checkInterval = setInterval(async () => {
          if (popup?.closed) {
            clearInterval(checkInterval);
            try {
              const verifyRes = await verifyPayment(response.reference);
              if (verifyRes.status === 'success') {
                onSuccess?.(response.reference);
              } else {
                onClose?.();
              }
            } catch {
              onClose?.();
            }
            setLoading(false);
          }
        }, 1000);
      }
    } catch (err: any) {
      alert('Payment initialization failed: ' + (err.message || 'Unknown error'));
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handlePayment}
      disabled={loading}
      className={`bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50 ${className}`}
    >
      {loading ? 'Processing...' : buttonText}
    </button>
  );
}
