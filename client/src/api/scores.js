const BASE_URL = 'https://escape-the-matrix-4h02.onrender.com';

export async function getTopScores() {
  const response = await fetch(`${BASE_URL}/scores`);
  const data = await response.json();
  
  if (!response.ok || !data.scores) {
    throw new Error(data.error || 'Failed to fetch scores');
  }
  
  return data.scores;
}

export async function submitScore(playerName, score, level, timeTaken) {
  const response = await fetch(`${BASE_URL}/scores`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ playerName, score, level, timeTaken }),
  });
  
  const data = await response.json();
  
  if (!response.ok || !data.success) {
    throw new Error(data.error || 'Failed to submit score');
  }
  
  return data;
}