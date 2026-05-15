import { useEffect, useRef, useState } from 'react';
import HUD from './HUD';
import { init, onStateChange } from '../game/engine';

export default function GameCanvas({ playerName, onEnd }) {
  const canvasRef = useRef(null);
  const [gameState, setGameState] = useState(null);

  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.focus();
      
      init(canvasRef.current);
      
      onStateChange((newState) => {
        setGameState(newState);
        
        // When the game ends, package the exact stats securely
        if (newState.status !== 'playing') {
          onEnd({ 
            score: newState.score, 
            level: newState.level, 
            timeTaken: Math.floor((Date.now() - newState.startTime) / 1000),
            status: newState.status 
          });
        }
      });
    }
  }, [onEnd]);

  return (
    <div className="game-wrapper" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2>Good luck, {playerName}!</h2>
      
      <HUD gameState={gameState} />
      
      <canvas 
        ref={canvasRef} 
        width={800} 
        height={600} 
        tabIndex={0}
        style={{ marginTop: '20px', outline: 'none' }}
      />
      
    </div>
  );
}