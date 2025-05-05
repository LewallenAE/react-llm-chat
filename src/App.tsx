import {useState} from 'react';

function App() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');

  const handleSend = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/chat`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ prompt: input }),
    });

    const data = await res.json();
    setResponse(data.reply);
  };
  
  return (
    <div style={{ padding: 20 }}>
      <h1>Chat with AI</h1>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your question here..."
        style={{ marginRight: 10 }}
      />
      <button onClick={handleSend}>Send</button>
      {response && (
        <p style = {{ marginTop: 20 }}>
          <strong>AI Response:</strong> {response}
        </p>
      )}
    </div>
  );
}

export default App;
