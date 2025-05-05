import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
>>>>>>> 3b27433 (Finalize merge and fix rebase block)
import { FC } from 'react';

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
<<<<<<< HEAD
=======
>>>>>>> 1c923c3 (Fix TypeScript build errors and finalize App.tsx)
>>>>>>> 3b27433 (Finalize merge and fix rebase block)

function App() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');

  const handleSend = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: input }),
    });

    const data = await res.json();
    setResponse(data.reply);
  };

<<<<<<< HEAD
=======
<<<<<<< HEAD
  const markdownComponents = {
    code({
      node,
      inline,
      className,
      children,
      ...props
    }: {
      node: any;
      inline?: boolean;
      className?: string;
      children: React.ReactNode;
    }) {
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
    },
  };

=======
>>>>>>> 1c923c3 (Fix TypeScript build errors and finalize App.tsx)
>>>>>>> 3b27433 (Finalize merge and fix rebase block)
  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
      <div style={{ width: '100%', maxWidth: '700px' }}>
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
        {response && (
          <div style={{ marginTop: 20 }}>
            <strong>AI Response:</strong>
<<<<<<< HEAD
            <ReactMarkdown components={{ code: CodeBlock }}>
=======
<<<<<<< HEAD
            <ReactMarkdown components={markdownComponents}>
=======
            <ReactMarkdown components={{ code: CodeBlock }}>
>>>>>>> 1c923c3 (Fix TypeScript build errors and finalize App.tsx)
>>>>>>> 3b27433 (Finalize merge and fix rebase block)
              {response}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
