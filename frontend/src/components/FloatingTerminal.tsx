import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, X, Minus, ChevronRight } from "lucide-react";

const commands = [
  { cmd: "whoami", output: "hakizimana-leogad" },
  { cmd: "cat /etc/skills", output: "embedded-systems, iot, arduino, esp32, python, c++" },
  { cmd: "uptime", output: "Building the future, one circuit at a time" },
  { cmd: "uname -a", output: "Linux creator 6.8.0-innovate #1 SMP PREEMPT" },
];

export function FloatingTerminal() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentCmd, setCurrentCmd] = useState("");
  const [output, setOutput] = useState("");
  const [cmdIndex, setCmdIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    setIsTyping(true);
    const cmd = commands[cmdIndex % commands.length];

    const typeInterval = setInterval(() => {
      if (charIndex < cmd.cmd.length) {
        setCurrentCmd(cmd.cmd.slice(0, charIndex + 1));
        setCharIndex((i) => i + 1);
      } else {
        clearInterval(typeInterval);
        setTimeout(() => {
          setOutput(cmd.output);
          setIsTyping(false);
          setTimeout(() => {
            setCurrentCmd("");
            setOutput("");
            setCharIndex(0);
            setCmdIndex((i) => i + 1);
          }, 3000);
        }, 500);
      }
    }, 50);

    return () => clearInterval(typeInterval);
  }, [isOpen, cmdIndex, charIndex]);

  return (
    <>
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 transition-shadow"
        aria-label="Open terminal"
      >
        <Terminal className="h-5 w-5" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-24 right-6 z-40 w-80 sm:w-96 overflow-hidden rounded-2xl border border-emerald-500/20 bg-[#0d1117]/95 shadow-2xl shadow-emerald-500/10 backdrop-blur-xl"
          >
            <div className="flex items-center justify-between border-b border-emerald-500/10 bg-[#161b22] px-4 py-2.5">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-red-500" />
                <div className="h-3 w-3 rounded-full bg-yellow-500" />
                <div className="h-3 w-3 rounded-full bg-green-500" />
                <span className="ml-2 font-mono text-[11px] text-gray-400">terminal — zsh</span>
              </div>
              <div className="flex items-center gap-1">
                <button className="rounded p-1 text-gray-500 hover:text-gray-300 transition-colors">
                  <Minus className="h-3 w-3" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded p-1 text-gray-500 hover:text-red-400 transition-colors"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            </div>
            <div className="p-4 font-mono text-[13px] leading-relaxed">
              <div className="mb-2 flex items-center gap-2 text-emerald-400">
                <span className="text-gray-500">╭─</span>
                <ChevronRight className="h-3 w-3" />
                <span className="text-gray-400">~/portfolio</span>
                <span className="text-gray-600">main</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-400">╰─</span>
                <span className="text-pink-400">$</span>
                <span>{currentCmd}</span>
                {isTyping && (
                  <span className="inline-block h-4 w-2 animate-cursor-blink bg-emerald-400" />
                )}
              </div>
              {output && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 text-gray-300"
                >
                  {output}
                </motion.div>
              )}
              {!isTyping && !output && (
                <span className="inline-block h-4 w-2 animate-cursor-blink bg-emerald-400" />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
