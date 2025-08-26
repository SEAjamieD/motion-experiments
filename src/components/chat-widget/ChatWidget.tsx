"use client";

import { motion } from "motion/react";
import { Brain, MessageCircleIcon, X } from "lucide-react";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { Textarea } from "../ui/textarea";
import ChatContainer from "./ChatContainer";

export interface Message {
  role: "user" | "assistant";
  content: string;
}

const transition = {
  duration: 0.5,
  type: "spring" as const,
  stiffness: 400,
  damping: 20,
};

const buttonResponse = {
  scale: 1.05,
  backgroundColor: "rgb(19, 147, 108)",
  transition,
};

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handleToggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = (message: string) => {
    // Add user message immediately
    const newMessage: Message = { role: "user", content: message };
    setMessages((prev) => [...prev, newMessage]);

    // Simulate assistant response after a delay
    setTimeout(() => {
      const assistantResponses = [
        "That's an interesting question! Let me help you with that.",
        "I understand what you're asking. Here's my thoughts...",
        "Thanks for your message! I'd be happy to assist.",
        "That's a great point. Let me provide some insights.",
        "I see what you mean. Here's what I think...",
      ];

      const randomResponse =
        assistantResponses[
          Math.floor(Math.random() * assistantResponses.length)
        ];

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: randomResponse },
      ]);
    }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
  };

  return (
    <>
      <div className="fixed bottom-6 right-6">
        <motion.button
          layoutRoot
          whileHover={buttonResponse}
          whileFocus={buttonResponse}
          whileTap={{ scale: 0.95 }}
          onClick={handleToggleOpen}
          className="rounded-full bg-black text-white h-12 w-12 flex items-center justify-center fixed bottom-6 right-6 z-10"
        >
          <Brain />
        </motion.button>
        {/* chat container */}
        <ChatContainer
          isOpen={isOpen}
          handleToggleOpen={handleToggleOpen}
          handleSendMessage={handleSendMessage}
          messages={messages}
        />
      </div>
    </>
  );
}
