import React from 'react';
import { EMOTIONS, Emotion } from '../data';
import { X, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SubmitMessageProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { text: string; recipient: string; emotion: Emotion }) => void;
}

export function SubmitMessage({ isOpen, onClose, onSubmit }: SubmitMessageProps) {
  const [text, setText] = React.useState('');
  const [recipient, setRecipient] = React.useState('');
  const [emotion, setEmotion] = React.useState<Emotion>('Love');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSubmit({ text, recipient, emotion });
    setText('');
    setRecipient('');
    setEmotion('Love');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed inset-0 bg-white dark:bg-zinc-900 z-[60] overflow-y-auto"
          >
            <div className="max-w-2xl mx-auto p-6 md:p-12 min-h-screen flex flex-col">
              <div className="flex justify-between items-center mb-8 md:mb-12">
                <h2 className="text-[22px] md:text-[24px] font-serif dark:text-white">Write your message</h2>
                <button 
                  onClick={onClose}
                  className="p-2.5 bg-black/5 dark:bg-white/5 md:bg-transparent hover:bg-black/10 dark:hover:bg-white/10 rounded-full transition-colors dark:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8 flex-1">
                <div>
                  <label className="block text-[11px] md:text-[12px] font-medium tracking-widest uppercase opacity-40 dark:opacity-60 mb-3 dark:text-white">
                    To (Optional)
                  </label>
                  <input
                    type="text"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    placeholder="An initial, a name, or 'You'"
                    className="w-full bg-transparent border-b border-black/10 dark:border-white/10 py-3 md:py-2 focus:border-black dark:focus:border-white transition-colors outline-none font-sans dark:text-white text-[15px] md:text-[16px]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] md:text-[12px] font-medium tracking-widest uppercase opacity-40 dark:opacity-60 mb-3 dark:text-white">
                    The Message
                  </label>
                  <textarea
                    required
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="What didn't you say?"
                    rows={6}
                    className="w-full bg-transparent border-b border-black/10 dark:border-white/10 py-3 md:py-2 focus:border-black dark:focus:border-white transition-colors outline-none font-serif text-[18px] md:text-[20px] resize-none dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] md:text-[12px] font-medium tracking-widest uppercase opacity-40 dark:opacity-60 mb-3 dark:text-white">
                    Emotion
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {EMOTIONS.map((e) => (
                      <button
                        key={e}
                        type="button"
                        onClick={() => setEmotion(e)}
                        className={`px-4 py-2.5 md:py-2 rounded-full text-[13px] md:text-[13px] transition-all active:scale-95 ${
                          emotion === e 
                            ? 'bg-black text-white dark:bg-white dark:text-black' 
                            : 'bg-black/5 hover:bg-black/10 dark:bg-white/5 dark:hover:bg-white/10 dark:text-white'
                        }`}
                      >
                        {e}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-6 md:pt-4 mt-auto">
                  <button
                    type="submit"
                    className="w-full bg-black text-white dark:bg-white dark:text-black py-4 md:py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-zinc-800 dark:hover:bg-zinc-200 active:scale-95 transition-all group"
                  >
                    <span className="font-medium text-[15px] md:text-[16px]">Send to the archive</span>
                    <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>
                  <p className="text-[11px] text-center opacity-40 mt-6 leading-relaxed px-4">
                    Messages are anonymous. By submitting, you agree to our community guidelines. 
                  </p>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}