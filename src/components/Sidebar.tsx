import type { ChatSession } from "@/lib/interview";

type SidebarProps = {
  open: boolean;
  onToggle: () => void;
  currentChat: ChatSession;
  history: ChatSession[];
  onNewChat: () => void;
  onSelectChat: (id: number) => void;
};

function SidebarIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <line x1="9" y1="4" x2="9" y2="20" />
    </svg>
  );
}

export function Sidebar({
  open,
  onToggle,
  currentChat,
  history,
  onNewChat,
  onSelectChat,
}: SidebarProps) {
  return (
    <>
      {open && (
        <div
          onClick={onToggle}
          className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm md:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex h-screen w-72 flex-col border-r border-border bg-background-elevated transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-4 pb-2 pt-5">
          <span className="font-display text-lg italic text-foreground">
            Prompt Interviewer
          </span>
          <button
            onClick={onToggle}
            aria-label="Скрыть меню"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-muted transition hover:bg-surface-hover hover:text-foreground"
          >
            <SidebarIcon />
          </button>
        </div>

        <div className="px-3 pt-3">
          <button
            onClick={onNewChat}
            className="flex w-full items-center gap-2 rounded-lg border border-border px-3 py-2.5 text-sm text-foreground transition hover:bg-surface-hover"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 5v14M5 12h14" />
            </svg>
            Новый чат
          </button>
        </div>

        <nav className="mt-6 flex-1 overflow-y-auto px-3 pb-4">
          <button className="w-full truncate rounded-lg bg-surface-hover px-2.5 py-2 text-left text-sm text-foreground">
            {currentChat.title}
          </button>

          {history.length > 0 && (
            <div className="mt-5 border-t border-border pt-4">
              <p className="px-2 pb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted/70">
                История
              </p>
              <div className="flex flex-col gap-0.5">
                {history.map((chat) => (
                  <button
                    key={chat.id}
                    onClick={() => onSelectChat(chat.id)}
                    className="truncate rounded-lg px-2.5 py-2 text-left text-sm text-muted transition hover:bg-surface-hover hover:text-foreground"
                  >
                    {chat.title}
                  </button>
                ))}
              </div>
            </div>
          )}
        </nav>
      </aside>

      {!open && (
        <button
          onClick={onToggle}
          aria-label="Показать меню"
          className="fixed left-4 top-4 z-40 flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface text-muted shadow-lg transition hover:bg-surface-hover hover:text-foreground"
        >
          <SidebarIcon />
        </button>
      )}
    </>
  );
}
