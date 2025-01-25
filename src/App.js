import React, { useEffect, useState } from 'react';
import { API_URL } from './config';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch(`${API_URL}`)
      .then((response) => response.json())
      .then((data) => setMessage(data.message))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>{message || 'Loading...'}</h1>
    </div>
  );
}

export default App;
