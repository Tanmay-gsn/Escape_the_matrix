import { useEffect, useRef } from 'react'
import { submitScore } from '../api/scores'

function EndScreen({ gameState, playerName, onRetry, onViewLeaderboard }) {
  const submitted = useRef(false)

  const score = gameState?.score ?? 0
  const level = gameState?.level ?? 1
  const status = gameState?.status ?? 'lost'
  const timeTaken = gameState?.startTime
    ? Math.floor((Date.now() - gameState.startTime) / 1000)
    : 0

  useEffect(() => {
    if (submitted.current) return
    submitted.current = true
    submitScore(playerName, score, level, timeTaken)
      .then(() => console.log('Score submitted'))
      .catch((err) => console.error('Submit failed:', err))
  }, [])

  const containerStyle = {
    border: '2px solid #00ff41',
    padding: '40px',
    textAlign: 'center',
    maxWidth: '400px',
    width: '100%',
    backgroundColor: '#0a0a0a',
  }

  const titleStyle = {
    fontSize: '2rem',
    color: status === 'won' ? '#00ff41' : '#ff4141',
    marginBottom: '24px',
    letterSpacing: '4px',
  }

  const statStyle = {
    fontSize: '1rem',
    color: '#FFFF00',
    margin: '8px 0',
    letterSpacing: '2px',
  }

  const labelStyle = {
    color: '#00ff41',
  }

  const buttonStyle = {
    backgroundColor: 'transparent',
    border: '1px solid #00ff41',
    color: '#00ff41',
    padding: '10px 28px',
    margin: '10px 8px 0 8px',
    fontSize: '1rem',
    fontFamily: '"Courier New", monospace',
    cursor: 'pointer',
    letterSpacing: '2px',
  }

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>
        {status === 'won' ? '[ YOU ESCAPED ]' : '[ GAME OVER ]'}
      </h2>

      <p style={statStyle}><span style={labelStyle}>PLAYER :</span> {playerName}</p>
      <p style={statStyle}><span style={labelStyle}>SCORE  :</span> {score}</p>
      <p style={statStyle}><span style={labelStyle}>LEVEL  :</span> {level}</p>
      <p style={statStyle}><span style={labelStyle}>TIME   :</span> {timeTaken}s</p>

      <div style={{ marginTop: '32px' }}>
        <button style={buttonStyle} onClick={onRetry}>RETRY</button>
        <button style={buttonStyle} onClick={onViewLeaderboard}>LEADERBOARD</button>
      </div>
    </div>
  )
}

export default EndScreen