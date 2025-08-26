import { AnimatePresence, motion } from "motion/react";
import { Textarea } from "../ui/textarea";
import { X } from "lucide-react";
import { Message as MessageType } from "./ChatWidget";
import useAnimatedText from "@/app/streaming-text/hooks/useAnimatedText";

export default function ChatContainer({
  isOpen,
  handleToggleOpen,
  handleSendMessage,
  messages,
}: {
  isOpen: boolean;
  handleToggleOpen: () => void;
  handleSendMessage: (message: string) => void;
  messages: MessageType[];
}) {
  return (
    <motion.div
      variants={variants}
      animate={isOpen ? "open" : "closed"}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 35,
        duration: 0.5,
      }}
      className="text-white h-12 w-12 fixed bottom-6 right-6 z-5 p-2"
    >
      <motion.div
        className="flex flex-col h-full bg-white rounded-sm w-full text-black relative"
        variants={chatVariants}
        animate={isOpen ? "open" : "closed"}
        transition={
          isOpen
            ? {
                duration: 0.5,
                ease: "easeInOut",
              }
            : {
                duration: 0,
                ease: "easeOut",
              }
        }
      >
        <motion.button
          onClick={handleToggleOpen}
          className="absolute top-2 right-2 z-10 cursor-pointer p-2 hover:bg-gray-100 rounded-full"
        >
          <X className="text-black" />
        </motion.button>

        {/* chat messages */}
        <ul className="flex flex-col flex-1 justify-end gap-2 p-2 pt-10 overflow-y-scroll">
          <AnimatePresence initial={false} mode="popLayout">
            {messages.map((message, index) => (
              <Message key={index} {...message} index={index} />
            ))}
          </AnimatePresence>
        </ul>

        {/* chat input */}
        <motion.div className="bg-white rounded-sm w-full text-black">
          <Textarea
            placeholder="Ask me anything"
            className="w-full resize-none p-1 text-sm"
            style={{
              borderRadius: 0,
              border: "none",
              borderTop: "1px solid #e0e0e0",
            }}
            rows={1}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                if (e.currentTarget.value.trim() === "") return;
                handleSendMessage(e.currentTarget.value);
                e.currentTarget.value = ""; // Clear the textarea after sending
              }
            }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

const variants = {
  open: {
    y: -60,
    width: 300,
    height: 500,
    borderRadius: 12,
    zIndex: 50,
    backgroundColor: "black",
  },
  closed: {
    borderRadius: 50,
    backgroundColor: "rgb(19, 147, 108)",
  },
};

const chatVariants = {
  open: {
    opacity: 1,
  },
  closed: {
    opacity: 0,
  },
};

function Message({
  role,
  content,
  index,
}: {
  role: MessageType["role"];
  content: string;
  index: number;
}) {
  const animatedText = useAnimatedText(content);

  return (
    <motion.li
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{
        opacity: { duration: 0.15 },
        layout: { duration: index * 0.2 },
        type: "spring",
        stiffness: 150,
        damping: 10,
      }}
      style={{ originX: role === "user" ? "right" : "left", originY: "bottom" }}
      className={`list-none rounded-sm px-1.5 py-1 text-sm ${
        role === "user"
          ? "text-right bg-black text-white ml-8 w-fit ml-auto min-w-20"
          : "text-left mr-8"
      }`}
    >
      {role === "assistant" ? animatedText : role === "user" ? content : ""}
    </motion.li>
  );
}
