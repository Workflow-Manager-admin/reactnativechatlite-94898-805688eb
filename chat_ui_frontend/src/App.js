import React, { useRef, useState, useEffect } from 'react';

// PUBLIC_INTERFACE
/**
 * The main App component renders a modern, minimalistic chat UI.
 * - Header at the top
 * - Scrollable chat message list
 * - Input box with send button at the bottom
 * - Themed using a light, clean palette and specified accent colors
 */
function App() {
  // Dummy JSON messages
  const initialMessages = [
    {
      id: 1,
      sender: 'Alice',
      text: 'Hey, how are you?',
      timestamp: '09:25',
      sentByMe: false,
    },
    {
      id: 2,
      sender: 'Me',
      text: "I'm good, thanks! You?",
      timestamp: '09:26',
      sentByMe: true,
    },
    {
      id: 3,
      sender: 'Alice',
      text: 'Doing well. Ready for our meeting?',
      timestamp: '09:27',
      sentByMe: false,
    },
    {
      id: 4,
      sender: 'Me',
      text: 'Absolutely. See you there!',
      timestamp: '09:27',
      sentByMe: true,
    },
  ];

  const [messages, setMessages] = useState(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const endOfMessagesRef = useRef(null);

  // Auto-scrolls to the latest message when messages change
  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // PUBLIC_INTERFACE
  /**
   * Adds a new message to the chat.
   * Trims input and ignores empty sends.
   */
  function handleSend() {
    const trimmed = inputValue.trim();
    if (trimmed.length === 0) return;
    const newMessage = {
      id: messages.length + 1,
      sender: 'Me',
      text: trimmed,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sentByMe: true,
    };
    setMessages([...messages, newMessage]);
    setInputValue('');
  }

  // Handle "Enter" key to send
  function handleInputKeyDown(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSend();
    }
  }

  // Color palette and style config
  const COLORS = {
    primary: '#1976D2',   // Blue (header, my message bubble)
    secondary: '#424242', // Dark grey (incoming message bubble)
    accent: '#FF9800',    // Accent for buttons (send)
    bg: '#FAFAFA',        // Overall page background
    divider: '#E0E0E0',   // Divider lines
    inputBg: '#FFFFFF',   // Input area background
    inputBorder: '#E0E0E0', // For border of input area
    text: '#24292F',
    textLight: '#fff',
    textSecondary: '#8492A6'
  };

  // Styles (inline, minimalistic, overriding any external CSS)
  const styles = {
    appContainer: {
      minHeight: '100vh',
      background: COLORS.bg,
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'Inter, system-ui, Avenir, Arial, Helvetica, sans-serif',
      color: COLORS.text,
    },
    header: {
      padding: '20px 0 13px 0',
      backgroundColor: COLORS.primary,
      color: '#fff',
      textAlign: 'center',
      fontSize: '1.4rem',
      fontWeight: 600,
      letterSpacing: 1.2,
      boxShadow: '0 2px 4px rgba(21,31,41,0.05)',
      borderBottom: `1px solid ${COLORS.divider}`,
      zIndex: 9,
    },
    chatBody: {
      flex: 1,
      overflowY: 'auto',
      padding: '14px 0',
      background: COLORS.bg,
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      marginBottom: 0,
    },
    messagesContainer: {
      width: '100%',
      padding: '0 0.5rem',
      maxWidth: 600,
      margin: '0 auto', // center on screen
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
    },
    messageRow: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'flex-end',
      padding: 0,
    },
    messageBubbleMe: {
      alignSelf: 'flex-end',
      background: COLORS.primary,
      color: '#fff',
      borderRadius: '18px 18px 4px 18px',
      padding: '10px 15px',
      margin: '3px 0',
      maxWidth: '76%',
      boxShadow: '0 1.5px 6px rgba(25, 118, 210, .04)',
      fontSize: '1rem',
      lineHeight: '1.38',
      wordBreak: 'break-word'
    },
    messageBubbleOther: {
      alignSelf: 'flex-start',
      background: COLORS.secondary,
      color: '#fff',
      borderRadius: '18px 18px 18px 4px',
      padding: '10px 15px',
      margin: '3px 0',
      maxWidth: '76%',
      boxShadow: '0 1.5px 6px rgba(42, 42, 42, .035)',
      fontSize: '1rem',
      lineHeight: '1.38',
      wordBreak: 'break-word'
    },
    metaRow: {
      fontSize: '0.82rem',
      color: COLORS.textSecondary,
      marginTop: 2,
      marginBottom: 0,
      paddingLeft: 3,
      paddingRight: 3,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    inputBarWrapper: {
      padding: '14px 0 8px 0',
      background: COLORS.inputBg,
      borderTop: `1px solid ${COLORS.inputBorder}`,
      position: 'sticky',
      bottom: 0,
      zIndex: 10,
      width: '100%',
    },
    inputBar: {
      maxWidth: 600,
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'row',
      gap: '10px',
      alignItems: 'center',
      padding: '0 0.5rem',
    },
    input: {
      flex: 1,
      padding: '10px 16px',
      borderRadius: 20,
      border: `1px solid ${COLORS.inputBorder}`,
      fontSize: '1rem',
      outline: 'none',
      transition: 'border 0.2s',
      background: '#F6F8FA',
      color: COLORS.text,
    },
    sendButton: {
      background: COLORS.accent,
      color: '#fff',
      border: 'none',
      borderRadius: 20,
      padding: '9px 20px',
      fontWeight: 600,
      fontSize: '1rem',
      cursor: 'pointer',
      outline: 'none',
      minWidth: 50,
      transition: 'background 0.15s, box-shadow 0.15s',
      boxShadow: '0 2px 5px rgba(255,152,0,0.08)',
    },
    sendButtonDisabled: {
      background: '#FFD199',
      color: '#fff',
      cursor: 'not-allowed'
    },
  };

  // PUBLIC_INTERFACE
  /**
   * Renders a single chat message bubble.
   * @param {Object} props
   * @param {Object} props.msg
   */
  function MessageBubble({ msg }) {
    return (
      <div
        style={{
          ...styles.messageRow,
          justifyContent: msg.sentByMe ? 'flex-end' : 'flex-start',
        }}
      >
        <div
          style={msg.sentByMe ? styles.messageBubbleMe : styles.messageBubbleOther}
          title={msg.sender}
        >
          {msg.text}
          <div style={styles.metaRow}>
            <span>
              {!msg.sentByMe && (
                <b style={{ color: COLORS.accent, fontWeight: 'bold', fontSize: '0.88em', marginRight: 6 }}>
                  {msg.sender}
                </b>
              )}
            </span>
            <span style={{ marginLeft: 'auto', fontSize: '0.88em', color: COLORS.textSecondary }}>
              {msg.timestamp}
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.appContainer}>
      <header style={styles.header}>
        🗨️ React Native ChatLite
      </header>
      <main style={styles.chatBody}>
        <div style={styles.messagesContainer}>
          {messages.map(msg =>
            <MessageBubble key={msg.id} msg={msg} />
          )}
          {/* Invisible dummy for auto-scroll */}
          <div ref={endOfMessagesRef}></div>
        </div>
      </main>
      <footer style={styles.inputBarWrapper}>
        <form
          style={styles.inputBar}
          onSubmit={e => {
            e.preventDefault();
            handleSend();
          }}
        >
          <input
            type="text"
            placeholder="Type your message…"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onKeyDown={handleInputKeyDown}
            style={styles.input}
            aria-label="Type your message"
            autoComplete="off"
            maxLength={500}
          />
          <button
            type="submit"
            style={inputValue.trim() ? styles.sendButton : { ...styles.sendButton, ...styles.sendButtonDisabled }}
            disabled={!inputValue.trim()}
            aria-label="Send message"
          >
            Send
          </button>
        </form>
      </footer>
    </div>
  );
}

export default App;
