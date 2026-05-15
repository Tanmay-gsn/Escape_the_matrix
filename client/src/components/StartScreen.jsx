import { useState } from 'react';

export default function StartScreen({ onStart }) {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedName = name.trim();
    
    if (!trimmedName) {
      setError('Name is required.');
      return;
    }
    if (trimmedName.length > 20) {
      setError('Name must be 20 characters or less.');
      return;
    }
    
    onStart(trimmedName);
  };

  return (
    <div className="start-screen">
      <h1>Escape the Matrix</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Enter your name" 
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setError('');
          }}
        />
        <button type="submit">Start Game</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}