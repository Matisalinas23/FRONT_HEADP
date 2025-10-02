import axios from 'axios';
import { useEffect, useState } from 'react';
import { IProduct } from '../type/product';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';

interface Props {
  product: IProduct;
}

export const MercadoPagoWallet = ({ product }: Props) => {
  const [preferenceId, setPreferenceId] = useState<string>('');

  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
  const MP_PUBLIC_KEY = "APP_USR-1018779b-8ed3-44cb-8f0a-1a33c0bca908"
  const createPreferenceIdEndpoint = `${BASE_URL}/mpCheckouts/createPreferenceId`;

  useEffect(() => {
    initMercadoPago(MP_PUBLIC_KEY, { locale: 'es-AR' })
  }, []);

  const createPreferenceId = async () => {
      try {
        const response = await axios.post(
          createPreferenceIdEndpoint,
          {
            title: product.name,
            unit_price: product.price/10000,
            quantity: product.quantity,
            productId: product.id,
          },
          { headers: { 'Content-Type': 'application/json' } }
        );

        if (response?.data?.preferenceId) {
          console.log('PreferenceId generado:', response.data.preferenceId);
          setPreferenceId(response.data.preferenceId);
        } else {
          console.error('No se recibió preferenceId:', response.data);
        }
      } catch (error) {
        console.error('Error creando preferenceId:', error);
      }
  };

  return (
    <div>
      <button
        onClick={createPreferenceId}
        className="w-full h-8 font-light bg-[var(--darkgreen)] cursor-pointer duration-200 hover:scale-103"
      >
        Pagar Con Mercado Pago
      </button>

      {preferenceId && (
        <Wallet initialization={{ preferenceId: preferenceId }} />
      )}
    </div>
  );
};