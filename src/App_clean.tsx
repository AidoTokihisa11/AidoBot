import { useState } from 'react';
import './App.css';
import Login from './Login';
import { RevolutionaryAidoBotPanel } from './RevolutionaryAidoBotPanel';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <div className="App">
      {!isLoggedIn ? (
        <Login onLogin={handleLogin} />
      ) : (
        <RevolutionaryAidoBotPanel />
      )}
    </div>
  );
}

export default App;
