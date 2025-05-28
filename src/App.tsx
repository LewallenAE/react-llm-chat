import { useState, useEffect, FC } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import './index.css';

const CodeBlock: FC<{
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
}> = ({ inline, className, children, ...props }) => {
  const match = /language-(\w+)/.exec(className || '');
  return !inline && match ? (
    <SyntaxHighlighter
      style={oneDark}
      language={match[1]}
      PreTag="div"
      {...props}
    >
      {String(children).replace(/\n$/, '')}
    </SyntaxHighlighter>
  ) : (
    <code className={className} {...props}>
      {children}
    </code>
  );
};

function App() {
  const getInitialTheme = () => localStorage.getItem('darkMode') === 'true';
  const [darkMode, setDarkMode] = useState(getInitialTheme);
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
    document.documentElement.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(prev => {
      localStorage.setItem('darkMode', String(!prev));
      return !prev;
    });
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    setIsLoading(true);

    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: input }),
    });

    const data = await res.json();
    setResponse(data.reply);
    setIsLoading(false);
    setInput('');
  };

  return (
    <div className="container" style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
        <label className="switch">
          <input type="checkbox" checked={darkMode} onChange={toggleDarkMode} />
          <span className="slider"></span>
        </label>
        <span style={{ marginLeft: '0.5rem' }}>
          {darkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
        </span>
      </div>

      <h1>Chat with AI</h1>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your questions here..."
        rows={6}
        style={{
          width: '100%',
          maxWidth: '600px',
          padding: '10px',
          fontSize: '1rem',
          lineHeight: '1.5',
          borderRadius: '8px',
          border: '1px solid #ccc',
          resize: 'vertical',
          marginBottom: '10px',
        }}
      />
      <button onClick={handleSend}>Send</button>

      {isLoading && (
        <div style={{ marginTop: '1rem' }}>🤔 Thinking...</div>
      )}

      {response && (
        <div className="response-box" style={{ marginTop: '2rem', padding: '1rem' }}>
          <strong>AI Response:</strong>
          <ReactMarkdown components={{ code: CodeBlock }}>
            {response}
          </ReactMarkdown>
        </div>
      )}
    </div>
  );
}

export default App;
