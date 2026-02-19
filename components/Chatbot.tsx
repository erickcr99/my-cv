"use client";
import { useState, useRef, useEffect, useCallback } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I am Alejandro's virtual assistant. Ask me anything you want to know about his experience, projects, or skills. 👋",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatWindowRef = useRef<HTMLDivElement>(null);

  // Scroll al último mensaje
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus al input cuando se abre el chat
  useEffect(() => {
    if (isOpen) {
      // Pequeño delay para que la animación del chat termine primero
      setTimeout(() => {
        inputRef.current?.focus();
      }, 350);
    }
  }, [isOpen]);

  // FIX MOBILE: Cuando el teclado sube (visualViewport shrinks), hacer scroll
  // al input para que sea visible sin que el usuario tenga que hacer nada
  useEffect(() => {
    if (!isOpen) return;

    const handleViewportResize = () => {
      if (!window.visualViewport) return;
      // Si el viewport se redujo (teclado abierto), scrollear el chat al input
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        inputRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }, 100);
    };

    window.visualViewport?.addEventListener("resize", handleViewportResize);
    return () => {
      window.visualViewport?.removeEventListener("resize", handleViewportResize);
    };
  }, [isOpen]);

  // useCallback garantiza que sendMessage siempre lea el valor más reciente de `input`
  const sendMessage = useCallback(async () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const userMessage: Message = { role: "user", content: trimmed };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Error sending message");
      }

      if (data.offTopic) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.reply },
        ]);
        setIsBlocked(true);
        setTimeout(() => setIsOpen(false), 4000);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.reply },
        ]);
      }
    } catch (error: any) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: error.message || "There was an error. Please try again",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading]);

  // FIX DESKTOP: Enter envía el mensaje — useCallback para evitar closure stale
  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      e.stopPropagation();
      sendMessage();
    }
  }, [sendMessage]);

  // FIX MOBILE: Al hacer focus en el input, esperar a que suba el teclado
  // y luego hacer scroll para que el input sea visible
  const handleInputFocus = useCallback(() => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      chatWindowRef.current?.scrollTo({
        top: chatWindowRef.current.scrollHeight,
        behavior: "smooth",
      });
    }, 350);
  }, []);

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="chat-toggle-btn"
        aria-label={isOpen ? "Cerrar chat" : "Abrir chat"}
      >
        {isOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
      </button>

      {/* Chat window */}
      {isOpen && (
        <div className="chat-window" ref={chatWindowRef}>
          {/* Header */}
          <div className="chat-header">
            <div className="chat-header-info">
              <div className="chat-avatar">AE</div>
              <div>
                <p className="chat-header-name">Alejandro's Assistant</p>
                <p className="chat-header-status">Online</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="chat-close-btn"
              aria-label="Cerrar chat"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="chat-messages">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`chat-bubble ${msg.role === "user" ? "chat-bubble-user" : "chat-bubble-assistant"}`}
              >
                {msg.content}
              </div>
            ))}
            {isLoading && (
              <div className="chat-bubble chat-bubble-assistant">
                <span className="chat-typing">
                  <span className="chat-typing-dot" />
                  <span className="chat-typing-dot" />
                  <span className="chat-typing-dot" />
                </span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          {isBlocked ? (
            <div className="chat-input-area" style={{ justifyContent: "center", padding: "0.75rem 1rem" }}>
              <p style={{ fontSize: "0.75rem", color: "var(--text-muted, #888)", textAlign: "center", margin: 0 }}>
                🔒 Cerrando conversación en unos segundos...
              </p>
            </div>
          ) : (
            <div className="chat-input-area">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={handleInputFocus}
                placeholder="Escribe tu pregunta..."
                maxLength={500}
                className="chat-input"
                disabled={isLoading}
                // FIX MOBILE ZOOM: enterkeyhint muestra "send" en teclado móvil
                enterKeyHint="send"
              />
              <button
                onClick={sendMessage}
                disabled={isLoading || !input.trim()}
                className="chat-send-btn"
                aria-label="Enviar mensaje"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
