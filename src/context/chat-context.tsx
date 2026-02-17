"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";

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

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const params = useParams();
  const locale = (params?.locale as string) || "es";
  const t = useTranslations("Chatbot");

  const [messages, setMessages] = useState<Message[]>([]);
  const [isBottomBarVisible, setIsBottomBarVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Storage keys include locale to prevent mixing languages
  const localeStorageKey = `${CHAT_STORAGE_KEY}-${locale}`;
  const localeTimestampKey = `${CHAT_TIMESTAMP_KEY}-${locale}`;

  // Initialize messages on client side
  useEffect(() => {
    const savedMessages = localStorage.getItem(localeStorageKey);
    const lastActive = localStorage.getItem(localeTimestampKey);
    const now = Date.now();

    if (savedMessages && lastActive) {
      const parsedLastActive = parseInt(lastActive, 10);
      if (now - parsedLastActive < INACTIVITY_LIMIT) {
        try {
          const parsed = JSON.parse(savedMessages);
          setMessages(parsed);
          return;
        } catch (e) {
          console.error("Failed to parse saved chat messages", e);
        }
      }
    }

    // Default welcome message if no saved session or expired
    setMessages([
      {
        id: 1,
        type: "bot",
        text: t("welcome"),
      },
    ]);
  }, [t, localeStorageKey, localeTimestampKey]);

  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(localeStorageKey, JSON.stringify(messages));
      localStorage.setItem(localeTimestampKey, Date.now().toString());
    }
  }, [messages, localeStorageKey, localeTimestampKey]);

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
      localStorage.setItem(localeTimestampKey, Date.now().toString());

      try {
        const response = await fetch(
          "https://doctorrecetas.com/api/chat-ana.php",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              message: text.trim(),
              lang: locale, // Enviamos el idioma a la IA
            }),
          },
        );

        const data = await response.json();
        const botResponse =
          data.response || data.message || data.text || t("error_api");

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
          text: t("error_network"),
        };
        setMessages((prev) => [...prev, errorMessage]);
      } finally {
        setIsLoading(false);
        localStorage.setItem(localeTimestampKey, Date.now().toString());
      }
    },
    [isLoading, locale, t, localeTimestampKey],
  );

  const clearChat = useCallback(() => {
    setMessages([
      {
        id: 1,
        type: "bot",
        text: t("welcome"),
      },
    ]);
    localStorage.removeItem(localeStorageKey);
    localStorage.removeItem(localeTimestampKey);
  }, [t, localeStorageKey, localeTimestampKey]);

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
