"use client";

import { useEffect, useRef, useState } from "react";
import { ChatPanel } from "@/components/ChatPanel";
import { NewChatModal } from "@/components/NewChatModal";
import { Sidebar } from "@/components/Sidebar";
import { createChat, type ChatSession } from "@/lib/interview";

const INITIAL_CHATS: ChatSession[] = [
  createChat(0, "Неоновый переулок, погоня"),
  createChat(-1, "Портрет у окна, дождь"),
  createChat(-2, "Кухня, готовка вечером"),
  createChat(-3, "Пустыня, закат"),
];

export default function Home() {
  const [started, setStarted] = useState(false);
  const [chatVisible, setChatVisible] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [chats, setChats] = useState<ChatSession[]>(INITIAL_CHATS);
  const [currentId, setCurrentId] = useState(0);
  const nextIdRef = useRef(1);

  useEffect(() => {
    if (window.innerWidth < 768) setSidebarOpen(false);
  }, []);

  const currentChat = chats.find((c) => c.id === currentId) ?? chats[0];
  const history = chats.filter((c) => c.id !== currentChat.id);

  function switchTo(id: number) {
    if (!started) {
      setCurrentId(id);
      setStarted(true);
      return;
    }

    setChatVisible(false);
    setTimeout(() => {
      setCurrentId(id);
      setChatVisible(true);
    }, 320);
  }

  function handleSelectChat(id: number) {
    if (id === currentId) return;
    setSidebarOpen(false);
    switchTo(id);
  }

  function handleConfirmNewChat(title: string) {
    const name = title || "Новый чат";
    setModalOpen(false);
    setSidebarOpen(false);

    const id = nextIdRef.current++;
    setChats((prev) => [createChat(id, name), ...prev]);
    switchTo(id);
  }

  function handleChatStateChange(
    id: number,
    state: Pick<ChatSession, "messages" | "step" | "done">,
  ) {
    setChats((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...state } : c)),
    );
  }

  return (
    <div className="min-h-screen w-full">
      <Sidebar
        open={sidebarOpen}
        onToggle={() => setSidebarOpen((v) => !v)}
        currentChat={currentChat}
        history={history}
        onNewChat={() => setModalOpen(true)}
        onSelectChat={handleSelectChat}
      />

      <div
        className={`flex min-h-screen flex-col transition-[margin] duration-300 ease-out ${
          sidebarOpen ? "md:ml-72" : "md:ml-0"
        }`}
      >
        <main className="flex flex-1 flex-col items-center justify-center overflow-hidden px-4 py-10 sm:px-6">
          <div className="grid w-full max-w-2xl">
            {/* Hero */}
            <div
              className={`col-start-1 row-start-1 flex flex-col items-center text-center transition-all duration-700 ease-in ${
                started
                  ? "pointer-events-none -translate-y-20 scale-95 opacity-0 blur-sm"
                  : "translate-y-0 scale-100 opacity-100 blur-none"
              }`}
            >
              <p className="mb-4 text-sm tracking-[0.3em] text-muted uppercase">
                Prompt Interviewer
              </p>
              <h1 className="font-display text-4xl italic text-foreground sm:text-5xl md:text-6xl">
                Опиши кадр —<br />получи промт
              </h1>
              <p className="mt-6 max-w-md text-muted">
                AI задаст несколько вопросов о будущем кадре и соберёт из
                ответов готовый промт.
              </p>
              <button
                onClick={() => setModalOpen(true)}
                className="mt-10 rounded-full bg-accent px-8 py-3 text-sm font-medium text-accent-foreground transition hover:brightness-110"
              >
                Начать интервью
              </button>
            </div>

            {/* Chat */}
            <div
              className={`col-start-1 row-start-1 w-full transition-all duration-700 ease-out ${
                started
                  ? "delay-200 translate-y-0 opacity-100"
                  : "pointer-events-none translate-y-24 opacity-0"
              }`}
            >
              <div
                className={`transition-all duration-300 ease-out ${
                  chatVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-2 opacity-0"
                }`}
              >
                <ChatPanel
                  key={currentChat.id}
                  initialMessages={currentChat.messages}
                  initialStep={currentChat.step}
                  initialDone={currentChat.done}
                  onChange={(state) =>
                    handleChatStateChange(currentChat.id, state)
                  }
                />
              </div>
            </div>
          </div>
        </main>
      </div>

      <NewChatModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleConfirmNewChat}
      />
    </div>
  );
}
