"use client";

import { useEffect, useRef, useState } from "react";
import { ProgressBar } from "./ProgressBar";
import { QUESTIONS, STAGES, type Message } from "@/lib/interview";

type ChatPanelProps = {
  initialMessages: Message[];
  initialStep: number;
  initialDone: boolean;
  onChange: (state: {
    messages: Message[];
    step: number;
    done: boolean;
  }) => void;
};

export function ChatPanel({
  initialMessages,
  initialStep,
  initialDone,
  onChange,
}: ChatPanelProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [step, setStep] = useState(initialStep);
  const [input, setInput] = useState("");
  const [done, setDone] = useState(initialDone);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isTyping]);

  useEffect(() => {
    onChange({ messages, step, done });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages, step, done]);

  function handleSubmit() {
    const value = input.trim();
    if (!value || done || isTyping) return;

    const nextStep = step + 1;
    const userMessage: Message = { role: "user", text: value };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      if (nextStep < QUESTIONS.length) {
        setMessages((prev) => [
          ...prev,
          { role: "bot", text: QUESTIONS[nextStep].text },
        ]);
        setStep(nextStep);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "bot",
            text: "Спасибо! Собрал черновой бриф — дальше здесь появится сборка промта.",
          },
        ]);
        setDone(true);
      }
      setIsTyping(false);
    }, 950);
  }

  function handleEditStage(index: number) {
    if (index > step || isTyping) return;

    const questionMessageIndex = index * 2;
    const answerMessageIndex = questionMessageIndex + 1;
    const previousAnswer = messages[answerMessageIndex]?.text ?? "";

    setMessages((prev) => prev.slice(0, questionMessageIndex + 1));
    setStep(index);
    setDone(false);
    setInput(previousAnswer);
    requestAnimationFrame(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });
  }

  const currentStageIndex = STAGES.indexOf(
    QUESTIONS[Math.min(step, QUESTIONS.length - 1)].stage,
  );

  return (
    <div className="flex w-full flex-col gap-4">
      <ProgressBar
        stages={STAGES}
        currentIndex={done ? STAGES.length - 1 : currentStageIndex}
        onSelect={handleEditStage}
      />

      <div className="flex h-[min(65vh,440px)] w-full flex-col rounded-2xl border border-border bg-surface">
        <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto p-5">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex animate-message-in ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  message.role === "user"
                    ? "rounded-br-sm bg-accent text-accent-foreground"
                    : "rounded-bl-sm bg-surface-hover text-foreground"
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex animate-message-in justify-start">
              <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-sm bg-surface-hover px-4 py-3.5">
                <span className="h-1.5 w-1.5 animate-typing-dot rounded-full bg-muted [animation-delay:0ms]" />
                <span className="h-1.5 w-1.5 animate-typing-dot rounded-full bg-muted [animation-delay:150ms]" />
                <span className="h-1.5 w-1.5 animate-typing-dot rounded-full bg-muted [animation-delay:300ms]" />
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 border-t border-border p-3">
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            disabled={done || isTyping}
            placeholder={done ? "Интервью завершено" : "Введите ответ…"}
            className="flex-1 rounded-full border border-border bg-background-elevated px-4 py-2 text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-accent disabled:opacity-50"
          />
          <button
            onClick={handleSubmit}
            disabled={done || isTyping || !input.trim()}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground transition hover:brightness-110 active:scale-95 disabled:opacity-40"
            aria-label="Отправить"
          >
            ↑
          </button>
        </div>
      </div>
    </div>
  );
}
