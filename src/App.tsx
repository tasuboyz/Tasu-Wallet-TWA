import { useEffect, useRef } from 'react';
import { TonConnectButton } from '@tonconnect/ui-react';
import { useTonConnect } from './hooks/useTonConnect';
import { useTonClient } from './hooks/useTonClient';
import PaymentButton from './components/PaymentButton';

function App() {
  const { sender, connected } = useTonConnect();
  const client = useTonClient() || null;
  const hasReloaded = useRef(false);

  useEffect(() => {
    if (connected && !hasReloaded.current) {
      hasReloaded.current = true;
      window.location.reload();
    }
  }, [connected]);

  return (
    <div className="App">
      <header>
        <h1>Sistema di Pagamento TON</h1>
        <TonConnectButton />
      </header>
      <main>
        {connected ? (
          <>
            <p>Wallet connesso. Pronto per il pagamento.</p>
            <PaymentButton sender={sender} client={client} />
          </>
        ) : (
          <p>Connetti il tuo wallet TON per effettuare un pagamento</p>
        )}
      </main>
    </div>
  );
}

export default App;
