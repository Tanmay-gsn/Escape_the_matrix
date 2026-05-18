import { useState } from 'react';
import StartScreen from './components/StartScreen';
import GameCanvas from './components/GameCanvas';
import EndScreen from './components/EndScreen';
import Leaderboard from './components/Leaderboard';

function App() {
  const [screen, setScreen] = useState('start'); 
  const [playerName, setPlayerName] = useState("");
  const [finalState, setFinalState] = useState(null);

  const handleStart = (name) => {
    setPlayerName(name);
    setScreen('playing');
  };

  return (
    <div className="app-container">
      {screen === 'start' && <StartScreen onStart={handleStart} />}
      
      {screen === 'playing' && (
        <GameCanvas 
          playerName={playerName} 
          onEnd={(state) => {
            setFinalState(state);
            setScreen('gameover');
          }} 
        />
      )}
      
      {screen === 'gameover' && (
        <EndScreen 
          playerName={playerName}
          gameState={{ ...finalState, playerName }} 
          onRetry={() => setScreen('playing')}
          onLeaderboard={() => setScreen('leaderboard')}
        />
      )}
      
      {screen === 'leaderboard' && (
        <Leaderboard onBack={() => setScreen('start')} />
      )}
    </div>
  );
}

export default App;