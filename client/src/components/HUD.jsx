export default function HUD({ gameState }) {
  if (!gameState) return null;

  // The engine will eventually send these exact fields [cite: 53]
  const { score, lives, moves, level, player } = gameState;

  return (
    <div className="hud-container" style={{ display: 'flex', gap: '20px', padding: '15px', backgroundColor: '#333', color: 'white', fontWeight: 'bold' }}>
      <div>Level: {level}</div>
      <div>Score: {score}</div>
      <div>Lives: {lives}</div>
      <div>Moves: {moves}</div>
      
      {/* Optionally show a 'Frozen' indicator when player.frozen is true  */}
      {player?.frozen && <div style={{ color: '#00d2ff' }}>❄️ FROZEN</div>}
    </div>
  );
}