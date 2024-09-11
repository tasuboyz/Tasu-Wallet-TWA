import { useTonConnectUI } from '@tonconnect/ui-react';
import { Sender, SenderArguments } from '@ton/core';
import { useState, useEffect } from 'react';

export function useTonConnect(): { sender: Sender; connected: boolean } {
  const [tonConnectUI] = useTonConnectUI();
  const [isConnected, setIsConnected] = useState(tonConnectUI.connected);

  useEffect(() => {
    const interval = setInterval(() => {
      if (tonConnectUI.connected !== isConnected) {
        setIsConnected(tonConnectUI.connected);
        if (tonConnectUI.connected) {
          console.log('Wallet connesso');
        } else {
          console.log('Wallet disconnesso');
        }
      }
    }, 1000); // Controlla lo stato di connessione ogni secondo

    return () => clearInterval(interval);
  }, [tonConnectUI, isConnected]);

  return {
    sender: {
      send: async (args: SenderArguments) => {
        tonConnectUI.sendTransaction({
          messages: [
            {
              address: args.to.toString(),
              amount: args.value.toString(),
              payload: args.body?.toBoc().toString('base64'),
            },
          ],
          validUntil: Date.now() + 5 * 60 * 1000, // 5 minuti per l'approvazione
        });
      },
    },
    connected: isConnected,
  };
}
