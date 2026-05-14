import { useEffect, useState } from 'react'
import { getTopScores } from '../api/scores'

function Leaderboard({ onBack }) {
  const [scores, setScores] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    getTopScores()
      .then((data) => { setScores(data); setLoading(false) })
      .catch((err) => { setError(err.message); setLoading(false) })
  }, [])

  const containerStyle = {
    border: '2px solid #00ff41',
    padding: '40px',
    maxWidth: '600px',
    width: '100%',
    backgroundColor: '#0a0a0a',
  }

  const titleStyle = {
    color: '#00ff41',
    fontSize: '1.5rem',
    letterSpacing: '4px',
    textAlign: 'center',
    marginBottom: '24px',
  }

  const rowStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px 0',
    borderBottom: '1px solid #1a3a1a',
    color: '#FFFF00',
    fontSize: '0.9rem',
    letterSpacing: '1px',
  }

  const headerRowStyle = {
    ...rowStyle,
    color: '#00ff41',
    borderBottom: '1px solid #00ff41',
    marginBottom: '8px',
  }

  const rankStyle = {
    width: '40px',
    color: '#00ff41',
  }

  const buttonStyle = {
    backgroundColor: 'transparent',
    border: '1px solid #00ff41',
    color: '#00ff41',
    padding: '10px 28px',
    marginTop: '24px',
    fontSize: '1rem',
    fontFamily: '"Courier New", monospace',
    cursor: 'pointer',
    letterSpacing: '2px',
    display: 'block',
    margin: '24px auto 0 auto',
  }

  if (loading) return (
    <div style={containerStyle}>
      <p style={{ color: '#00ff41', textAlign: 'center', letterSpacing: '2px' }}>
        LOADING...
      </p>
    </div>
  )

  if (error) return (
    <div style={containerStyle}>
      <p style={{ color: '#ff4141', textAlign: 'center', letterSpacing: '2px' }}>
        ERROR: {error}
      </p>
      <button style={buttonStyle} onClick={onBack}>BACK</button>
    </div>
  )

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>[ TOP 10 ]</h2>

      <div style={headerRowStyle}>
        <span style={rankStyle}>#</span>
        <span style={{ flex: 2 }}>PLAYER</span>
        <span>SCORE</span>
        <span>LEVEL</span>
        <span>TIME</span>
      </div>

      {scores.length === 0 && (
        <p style={{ color: '#FFFF00', textAlign: 'center', marginTop: '16px' }}>
          NO SCORES YET
        </p>
      )}

      {scores.map((s, i) => (
        <div key={s._id} style={rowStyle}>
          <span style={rankStyle}>#{i + 1}</span>
          <span style={{ flex: 2 }}>{s.playerName}</span>
          <span>{s.score}</span>
          <span>{s.level}</span>
          <span>{s.timeTaken}s</span>
        </div>
      ))}

      <button style={buttonStyle} onClick={onBack}>BACK TO START</button>
    </div>
  )
}

export default Leaderboard