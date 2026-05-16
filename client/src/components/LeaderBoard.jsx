import { useEffect, useState } from 'react'
import { getTopScores } from '../api/scores'

export default function Leaderboard({ onBack }) {
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

  return (
    <div style={{ maxWidth: '600px', margin: '50px auto', textAlign: 'center' }}>
      <h1>Top 10 Escapes</h1>

      {loading && <p>Loading network data...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

            {!loading && !error && (
        <table style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #333' }}>
              <th style={{ padding: '10px' }}>Rank</th>
              <th>Name</th>
              <th>Score</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {scores.map((s, index) => (
              <tr key={s._id} style={{ borderBottom: '1px solid #ccc' }}>
                <td style={{ padding: '10px' }}>#{index + 1}</td>
                <td>{s.playerName}</td>
                <td>{s.score}</td>
                <td>{s.timeTaken}s</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <button onClick={onBack} style={{ marginTop: '30px', padding: '10px 20px' }}>Back to Start</button>
    </div>
  )
}