import { useState, useCallback, useRef, useEffect } from "react";

export function useChat() {
  const [messages, setMessages] = useState<{ role: "user" | "qwen"; text: string }[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const addUserMessage = useCallback((text: string) => {
    setMessages((prev) => [...prev, { role: "user", text }]);
  }, []);

  const addQwenResponse = useCallback((fullText: string, onComplete?: () => void) => {
    setIsTyping(true);
    setDisplayText("");
    let i = 0;
    timerRef.current = setInterval(() => {
      i++;
      setDisplayText(fullText.slice(0, i));
      if (i >= fullText.length) {
        clearInterval(timerRef.current!);
        setIsTyping(false);
        setMessages((prev) => [...prev, { role: "qwen", text: fullText }]);
        onComplete?.();
      }
    }, 30);
  }, []);

  const clearChat = useCallback(() => {
    clearInterval(timerRef.current!);
    setMessages([]);
    setIsTyping(false);
    setDisplayText("");
  }, []);

  // Inline messages: combine saved messages with current typing
  const allMessages = [...messages];
  if (isTyping && displayText) {
    allMessages.push({ role: "qwen", text: displayText });
  }

  useEffect(() => {
    return () => clearInterval(timerRef.current!);
  }, []);

  return { messages: allMessages, isTyping, displayText, addUserMessage, addQwenResponse, clearChat };
}
