const BASE_URL = 'http://localhost:5000'

export async function getTopScores() {
  const res = await fetch(`${BASE_URL}/api/scores`)
  const data = await res.json()
  if (!data.success) throw new Error(data.error)
  return data.scores
}

export async function submitScore(playerName, score, level, timeTaken) {
  const res = await fetch(`${BASE_URL}/api/scores`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ playerName, score, level, timeTaken })
  })
  const data = await res.json()
  if (!data.success) throw new Error(data.error)
  return data
}