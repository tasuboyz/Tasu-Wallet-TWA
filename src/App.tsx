import { useEffect, useState } from 'react';
import { TonConnectButton } from '@tonconnect/ui-react';
import { useTonConnect } from './hooks/useTonConnect';
import { useTonClient } from './hooks/useTonClient';
import PaymentButton from './components/PaymentButton';

function App() {
  const { sender, connected } = useTonConnect();
  const client = useTonClient() || null;
  const [isWalletConnected, setIsWalletConnected] = useState(connected);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (connected) {
      setIsWalletConnected(true);
      setShowPopup(true);
    } else {
      setIsWalletConnected(false);
    }
  }, [connected]);

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="App">
      <header>
        <h1>Sistema di Pagamento TON</h1>
        <TonConnectButton />
      </header>
      <main>
        {showPopup && (
          <div className="popup">
            <div className="popup-content">
              <p>Wallet connesso con successo!</p>
              <button onClick={closePopup}>Chiudi</button>
            </div>
          </div>
        )}
        {isWalletConnected ? (
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
