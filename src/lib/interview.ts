export type Message = {
  role: "bot" | "user";
  text: string;
};

export type ChatSession = {
  id: number;
  title: string;
  messages: Message[];
  step: number;
  done: boolean;
};

export const QUESTIONS = [
  {
    stage: "Герой",
    text: "Кто в кадре? Опиши героя — возраст, внешность, одежда.",
  },
  {
    stage: "Локация",
    text: "Где происходит сцена? Опиши место и время суток.",
  },
  {
    stage: "Поза и свет",
    text: "В какой позе или с каким выражением герой? Какой свет — мягкий, контрастный, естественный?",
  },
  {
    stage: "Камера",
    text: "Как снят кадр — ракурс, объектив, есть ли движение камеры?",
  },
  {
    stage: "Действие",
    text: "Что происходит в кадре? Опиши действие по шагам, если это видео.",
  },
  {
    stage: "Финал",
    text: "Есть что-то, чего в кадре точно быть не должно?",
  },
];

export const STAGES = Array.from(new Set(QUESTIONS.map((q) => q.stage)));

export function createChat(id: number, title: string): ChatSession {
  return {
    id,
    title,
    messages: [{ role: "bot", text: QUESTIONS[0].text }],
    step: 0,
    done: false,
  };
}
