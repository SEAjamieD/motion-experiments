"use client";

import { motion } from "framer-motion";
import { Brain, MessageCircleIcon, X } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import { Textarea } from "../ui/textarea";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

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

  return (
    <>
      <div className="fixed bottom-6 right-6">
        <motion.button
          whileHover={{
            scale: 1.05,
            backgroundColor: "rgb(19, 147, 108)",
            transition: {
              duration: 0.5,
              type: "spring",
              stiffness: 400,
              damping: 20,
            },
          }}
          whileFocus={{
            scale: 1.05,
            backgroundColor: "rgb(19, 147, 108)",
            transition: {
              duration: 0.5,
              type: "spring",
              stiffness: 400,
            },
          }}
          whileTap={{ scale: 0.95 }}
          onClick={handleOpen}
          className="rounded-full bg-black text-white h-12 w-12 flex items-center justify-center fixed bottom-6 right-6 z-10"
        >
          <Brain />
        </motion.button>
        {/* chat container */}
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
            className="bg-white rounded-sm h-full w-full text-black relative"
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
              onClick={handleOpen}
              className="absolute top-2 right-2 z-10"
            >
              <X className="text-black" />
            </motion.button>
            <motion.div className="bg-white rounded-sm h-full w-full text-black relative">
              <h1>Hello</h1>
              <Textarea
                placeholder="Ask me anything"
                className="fixed bottom-2 left-2 right-2 resize-none h-36px"
                style={{
                  width: "calc(100% - 16px)",
                  borderRadius: 0,
                  border: "none",
                  borderTop: "1px solid #e0e0e0",
                }}
                rows={1}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}
