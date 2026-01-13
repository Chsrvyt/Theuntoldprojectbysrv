export type Emotion = 'Love' | 'Regret' | 'Grief' | 'Hope' | 'Closure' | 'Nostalgia' | 'Anger' | 'Sadness';

export interface Message {
  id: string;
  text: string;
  recipient?: string;
  emotion: Emotion;
  createdAt: string;
}

export const MOCK_MESSAGES: Message[] = [
  {
    id: '1',
    text: "I still look for your car in every parking lot, even though I know you moved halfway across the country three years ago.",
    recipient: "C",
    emotion: "Nostalgia",
    createdAt: "2024-12-20T10:00:00Z"
  },
  {
    id: '2',
    text: "I'm sorry I wasn't brave enough to tell you how I felt before you left. Now the words just sit in my throat like a stone.",
    recipient: "S",
    emotion: "Regret",
    createdAt: "2024-12-21T14:30:00Z"
  },
  {
    id: '3',
    text: "I finally deleted our old messages today. It didn't make me feel better, just emptier. I hope you're happy, truly.",
    recipient: "Alex",
    emotion: "Closure",
    createdAt: "2024-12-22T09:15:00Z"
  },
  {
    id: '4',
    text: "Sometimes I wonder if you ever think of that rainy Tuesday in October. Probably not. But I still remember the color of your umbrella.",
    recipient: "M",
    emotion: "Love",
    createdAt: "2024-12-23T18:45:00Z"
  },
  {
    id: '5',
    text: "The house is so quiet without you. I still make two cups of coffee sometimes. Habit is a cruel thing.",
    recipient: "Mom",
    emotion: "Grief",
    createdAt: "2024-12-24T07:00:00Z"
  },
  {
    id: '6',
    text: "I'm starting to forget the sound of your laugh, and it terrifies me more than anything else.",
    recipient: "L",
    emotion: "Sadness",
    createdAt: "2024-12-24T12:00:00Z"
  },
  {
    id: '7',
    text: "I'm finally learning to breathe without waiting for you to exhale. It's a slow process, but I'm getting there.",
    recipient: "Self",
    emotion: "Hope",
    createdAt: "2024-12-24T15:30:00Z"
  },
  {
    id: '8',
    text: "You didn't deserve my kindness, but I'm glad I gave it anyway. It says more about me than it does about you.",
    recipient: "D",
    emotion: "Anger",
    createdAt: "2024-12-24T16:00:00Z"
  }
];

export const EMOTIONS: Emotion[] = ['Love', 'Regret', 'Grief', 'Hope', 'Closure', 'Nostalgia', 'Anger', 'Sadness'];

export const EMOTION_COLORS: Record<Emotion, string> = {
  Love: 'bg-rose-50 border-rose-100 text-rose-900 dark:bg-rose-950/20 dark:border-rose-900/30 dark:text-rose-200',
  Regret: 'bg-slate-50 border-slate-200 text-slate-900 dark:bg-slate-900/40 dark:border-slate-800/50 dark:text-slate-200',
  Grief: 'bg-indigo-50 border-indigo-100 text-indigo-900 dark:bg-indigo-950/20 dark:border-indigo-900/30 dark:text-indigo-200',
  Hope: 'bg-emerald-50 border-emerald-100 text-emerald-900 dark:bg-emerald-950/20 dark:border-emerald-900/30 dark:text-emerald-200',
  Closure: 'bg-stone-50 border-stone-200 text-stone-900 dark:bg-stone-900/40 dark:border-stone-800/50 dark:text-stone-200',
  Nostalgia: 'bg-amber-50 border-amber-100 text-amber-900 dark:bg-amber-950/20 dark:border-amber-900/30 dark:text-amber-200',
  Anger: 'bg-orange-50 border-orange-100 text-orange-900 dark:bg-orange-950/20 dark:border-orange-900/30 dark:text-orange-200',
  Sadness: 'bg-blue-50 border-blue-100 text-blue-900 dark:bg-blue-950/20 dark:border-blue-900/30 dark:text-blue-200',
};