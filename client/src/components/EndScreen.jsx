import { useEffect, useRef } from 'react'
import { submitScore } from '../api/scores'

function EndScreen({ gameState, playerName, onRetry, onLeaderboard }) {
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
    submitScore( playerName, score, level, timeTaken)
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
    color: status === 'won' ? '#2ECC71' : '#E74C3C',
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

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1 style={titleStyle}>
        {status === 'won' ? 'You Escaped the Matrix!' : 'You Died.'}
      </h1>

      <div className="stats" style={{ margin: '20px 0', fontSize: '1.2rem' }}>
        <p>Level Reached: <strong>{gameState.level}</strong></p>
        <p>Final Score: <strong>{gameState.score}</strong></p>
        <p>Time Taken: <strong>{gameState.timeTaken} seconds</strong></p>
      </div>

      

      <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'center' , gap: '15px'}}>
        <button onClick={onRetry}>PLAY AGAIN</button>
        <button onClick={onLeaderboard}>VIEW LEADERBOARD</button>
      </div>
    </div>
  )
}

export default EndScreen