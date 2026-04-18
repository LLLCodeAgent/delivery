import { useState } from 'react';
import api from '../services/api';

function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hi! I can track orders, answer FAQs, and help create shipments.' },
  ]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const current = message;
    setMessages((prev) => [...prev, { from: 'user', text: current }]);
    setMessage('');
    setLoading(true);

    try {
      const { data } = await api.post('/chatbot', { message: current });
      setMessages((prev) => [...prev, { from: 'bot', text: data.reply }]);
    } catch (_error) {
      setMessages((prev) => [...prev, { from: 'bot', text: 'I am unavailable right now.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-widget">
      <button className="chat-toggle" onClick={() => setOpen((v) => !v)}>
        {open ? 'Close Chat' : 'Chat'}
      </button>
      {open && (
        <div className="chat-panel">
          <div className="chat-messages">
            {messages.map((msg, idx) => (
              <p key={idx} className={msg.from === 'user' ? 'user-msg' : 'bot-msg'}>
                {msg.text}
              </p>
            ))}
          </div>
          <div className="chat-input">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type: Track TRK-..."
            />
            <button onClick={sendMessage} disabled={loading}>
              {loading ? '...' : 'Send'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatWidget;
