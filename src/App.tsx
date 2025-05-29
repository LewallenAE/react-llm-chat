import { useState, useEffect, useRef, FC } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import './index.css';
import Lottie from 'lottie-react';
import loadingSpinner from './assets/lottie/RainbowCat.json';

type Message = {
  sender: 'user' | 'ai';
  text: string;
};

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
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
    document.documentElement.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const toggleDarkMode = () => {
    setDarkMode(prev => {
      localStorage.setItem('darkMode', String(!prev));
      return !prev;
    });
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: userMessage.text }),
    });

    const data = await res.json();
    const aiMessage: Message = { sender: 'ai', text: data.reply };
    setMessages(prev => [...prev, aiMessage]);
    setIsLoading(false);
  };

  return (
    <div className="outer-wrapper">
      <div className="chat-container" ref={chatRef}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
          <label className="switch">
            <input type="checkbox" checked={darkMode} onChange={toggleDarkMode} />
            <span className="slider"></span>
          </label>
          <span style={{ marginLeft: '0.5rem' }}>
            {darkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
          </span>
        </div>

        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat-bubble ${msg.sender === 'user' ? 'user-bubble' : 'ai-bubble'}`}
          >
            <ReactMarkdown components={{ code: CodeBlock }}>{msg.text}</ReactMarkdown>
          </div>
        ))}

        {isLoading && (
          <div className="loader-wrapper">
            Thinking...
            <Lottie animationData={loadingSpinner} loop style={{ width: 120, height: 120 }} />
          </div>
        )}
      </div>

      <div className="chat-input">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Go ahead, ask me anything!"
          rows={1}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}

export default App;
