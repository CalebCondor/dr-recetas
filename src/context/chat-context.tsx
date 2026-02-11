"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

export type MessageType = "user" | "bot";

export interface Message {
  id: number;
  type: MessageType;
  text: string;
}

interface ChatContextType {
  messages: Message[];
  isLoading: boolean;
  sendMessage: (text: string) => Promise<void>;
  clearChat: () => void;
  isBottomBarVisible: boolean;
  setIsBottomBarVisible: (visible: boolean) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

const CHAT_STORAGE_KEY = "dr-recetas-chat-messages";
const CHAT_TIMESTAMP_KEY = "dr-recetas-chat-last-active";
const INACTIVITY_LIMIT = 30 * 60 * 1000; // 30 minutes in milliseconds

const INITIAL_MESSAGE: Message = {
  id: 1,
  type: "bot",
  text: "¡Hola! 👋 ¿En qué puedo ayudarte hoy?",
};

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [isBottomBarVisible, setIsBottomBarVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const savedMessages = localStorage.getItem(CHAT_STORAGE_KEY);
    const lastActive = localStorage.getItem(CHAT_TIMESTAMP_KEY);

    if (savedMessages && lastActive) {
      const parsedLastActive = parseInt(lastActive, 10);
      const now = Date.now();

      if (now - parsedLastActive < INACTIVITY_LIMIT) {
        try {
          const parsed = JSON.parse(savedMessages);
          queueMicrotask(() => {
            setMessages(parsed);
          });
        } catch (e) {
          console.error("Failed to parse saved chat messages", e);
        }
      } else {
        // Inactivity limit reached, clear chat
        localStorage.removeItem(CHAT_STORAGE_KEY);
        localStorage.removeItem(CHAT_TIMESTAMP_KEY);
      }
    }
  }, []);

  useEffect(() => {
    if (
      messages.length > 1 ||
      (messages.length === 1 && messages[0].id !== 1)
    ) {
      localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(messages));
      localStorage.setItem(CHAT_TIMESTAMP_KEY, Date.now().toString());
    }
  }, [messages]);

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || isLoading) return;

      const userMessage: Message = {
        id: Date.now(),
        type: "user",
        text: text.trim(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setIsLoading(true);
      localStorage.setItem(CHAT_TIMESTAMP_KEY, Date.now().toString());

      try {
        const response = await fetch(
          "https://doctorrecetas.com/api/chat-ana.php",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ message: text.trim() }),
          },
        );

        const data = await response.json();
        const botResponse =
          data.response ||
          data.message ||
          data.text ||
          "Lo siento, tuve un problema al procesar tu mensaje.";

        const botMessage: Message = {
          id: Date.now() + 1,
          type: "bot",
          text: botResponse,
        };

        setMessages((prev) => [...prev, botMessage]);
      } catch (error) {
        console.error("Error calling chat API:", error);
        const errorMessage: Message = {
          id: Date.now() + 1,
          type: "bot",
          text: "Lo siento, no pude conectarme con el servidor. Inténtalo de nuevo más tarde.",
        };
        setMessages((prev) => [...prev, errorMessage]);
      } finally {
        setIsLoading(false);
        localStorage.setItem(CHAT_TIMESTAMP_KEY, Date.now().toString());
      }
    },
    [isLoading],
  );

  const clearChat = useCallback(() => {
    setMessages([INITIAL_MESSAGE]);
    localStorage.removeItem(CHAT_STORAGE_KEY);
    localStorage.removeItem(CHAT_TIMESTAMP_KEY);
  }, []);

  return (
    <ChatContext.Provider
      value={{
        messages,
        isLoading,
        sendMessage,
        clearChat,
        isBottomBarVisible,
        setIsBottomBarVisible,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
}
