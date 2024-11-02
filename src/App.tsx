import { useEffect, useState } from 'react';
import { TonConnectButton } from '@tonconnect/ui-react';
import { useTonConnect } from './hooks/useTonConnect';
import { useTonClient } from './hooks/useTonClient';
import PaymentButton from './components/PaymentButton';
import ThemeManager from './components/themeSelector';

function App() {
  const { sender, connected } = useTonConnect();
  const client = useTonClient() || null;
  const [isWalletConnected, setIsWalletConnected] = useState(connected);

  useEffect(() => {
    setIsWalletConnected(connected);
  }, [connected]);

  return (
    <div className="app-container">
      <div className="payment-card">
        <img src="https://www.cryptologos.cc/logos/toncoin-ton-logo.svg?v=035" alt="TON Logo" className="ton-logo" />

        <h1 className="title">TON Wallet Payment</h1>
        
        <div className={`wallet-status ${isWalletConnected ? 'connected' : 'disconnected'}`}>
          {isWalletConnected ? 'Wallet Connesso' : 'Wallet Disconnesso'}
        </div>

        <div className="connect-button">
          <TonConnectButton />
        </div>

        {isWalletConnected && (
          <div className="payment-section">
            <PaymentButton sender={sender} client={client} />
          </div>
        )}
        
        {/* Theme Wheel */}
        {/* <div className="theme-wheel">
          <svg viewBox="0 0 24 24">
            <path d="M12,3c-4.97,0-9,4.03-9,9s4.03,9,9,9c0.83,0,1.5-0.67,1.5-1.5c0-0.39-0.15-0.74-0.39-1.01c-0.23-0.26-0.38-0.61-0.38-0.99 c0-0.83,0.67-1.5,1.5-1.5H16c2.76,0,5-2.24,5-5C21,7.07,16.97,3,12,3z M6.5,12c-0.83,0-1.5-0.67-1.5-1.5S5.67,9,6.5,9 S8,9.67,8,10.5S7.33,12,6.5,12z M9.5,8C8.67,8,8,7.33,8,6.5S8.67,5,9.5,5S11,5.67,11,6.5S10.33,8,9.5,8z M14.5,8 C13.67,8,13,7.33,13,6.5S13.67,5,14.5,5S16,5.67,16,6.5S15.33,8,14.5,8z M17.5,12c-0.83,0-1.5-0.67-1.5-1.5S16.67,9,17.5,9 S19,9.67,19,10.5S18.33,12,17.5,12z"/>
          </svg>
        </div> */}
        
        <ThemeManager />
      </div>
    </div>
  );
}

export default App;
