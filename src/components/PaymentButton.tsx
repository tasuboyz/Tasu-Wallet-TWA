import React from 'react';
import { Address, toNano, beginCell } from '@ton/core';
import { useTonConnect } from '../hooks/useTonConnect';
import { TonClient } from '@ton/ton';

interface PaymentButtonProps {
  sender: ReturnType<typeof useTonConnect>['sender'];
  client: TonClient | null;
}

const RECIPIENT_ADDRESS = 'UQCjYxuYXFXOff36CKoW29ViccJWutLB_LLi3whrDrv-Ml1v'; // Inserisci qui l'indirizzo del tuo wallet

const PaymentButton: React.FC<PaymentButtonProps> = ({ sender, client }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const handlePayment = async () => {
    if (!client) {
      console.error('TonClient non inizializzato');
      return;
    }
    setIsLoading(true);
    try {
      const body = beginCell().storeUint(0, 32).storeStringTail('Grazie per il pagamento!').endCell();
      await sender.send({
        to: Address.parse(RECIPIENT_ADDRESS),
        value: toNano('0.01'), // Modifica questo valore secondo le tue necessità
        body: body,
      });
      alert('Pagamento inviato con successo!');
    } catch (error) {
      console.error('Errore durante l\'invio del pagamento:', error);
      alert('Si è verificato un errore durante l\'invio del pagamento.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button onClick={handlePayment} disabled={isLoading}>
      {isLoading ? 'Invio in corso...' : 'Invia pagamento (0.01 TON)'}
    </button>
  );
};

export default PaymentButton;