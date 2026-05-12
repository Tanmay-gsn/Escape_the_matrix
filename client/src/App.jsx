import React, { useState } from 'react';
import StartScreen from './components/StartScreen';
import GameCanvas from './components/GameCanvas';
import EndScreen from './components/EndScreen';
import Leaderboard from './components/Leaderboard';

const appStyle = {
  backgroundColor: '#000000',
  color: '#FFFF00',
  fontFamily: '"Courier New", Courier, monospace',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '20px'
};

function App() {
  const [currentScreen, setCurrentScreen] = useState('start'); // 'start', 'playing', 'gameover', 'leaderboard'
  const [playerName, setPlayerName] = useState('');
  const [finalGameState, setFinalGameState] = useState(null);

  const startGame = (name) => {
    setPlayerName(name);
    setCurrentScreen('playing');
  };

  const endGame = (gameState) => {
    setFinalGameState(gameState);
    setCurrentScreen('gameover');
  };

  return (
    <div style={appStyle}>
      {currentScreen === 'start' && (
        <StartScreen onStart={startGame} />
      )}
      
      {currentScreen === 'playing' && (
        <GameCanvas onEnd={endGame} />
      )}

      {currentScreen === 'gameover' && (
        <EndScreen 
          gameState={finalGameState} 
          playerName={playerName}
          onRetry={() => setCurrentScreen('start')}
          onViewLeaderboard={() => setCurrentScreen('leaderboard')}
        />
      )}

      {currentScreen === 'leaderboard' && (
        <Leaderboard onBack={() => setCurrentScreen('start')} />
      )}
    </div>
  );
}

export default App;