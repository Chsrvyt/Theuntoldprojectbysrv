import React from 'react';
import { Message, EMOTION_COLORS } from '../data';
import { Flag, Heart } from 'lucide-react';
import { motion } from 'motion/react';
import { projectId, publicAnonKey } from '../../../utils/supabase/info';
import { toast } from 'sonner';

interface MessageCardProps {
  message: Message;
}

const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-76a5aef3`;

export function MessageCard({ message }: MessageCardProps) {
  const [liked, setLiked] = React.useState(false);
  const [isReporting, setIsReporting] = React.useState(false);

  const handleReport = async () => {
    if (isReporting) return;
    try {
      setIsReporting(true);
      await fetch(`${API_BASE}/messages/${message.id}/report`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${publicAnonKey}` }
      });
      toast.info('Message reported. Our moderators will review it shortly.');
    } catch (err) {
      toast.error('Failed to report.');
    } finally {
      setIsReporting(false);
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      className={`relative p-6 md:p-8 rounded-2xl border transition-all duration-300 hover:shadow-sm group ${EMOTION_COLORS[message.emotion] || 'bg-white border-border'}`}
    >
      <div className="flex justify-between items-start mb-4 md:mb-6">
        <span className="text-[11px] md:text-[12px] font-medium tracking-[0.1em] uppercase opacity-60">
          To: {message.recipient || 'Someone'}
        </span>
        <span className="text-[9px] md:text-[10px] font-medium tracking-[0.1em] uppercase opacity-40">
          {new Date(message.createdAt).toLocaleDateString()}
        </span>
      </div>

      <p className="text-[18px] md:text-[24px] leading-relaxed font-serif mb-6 md:mb-8 text-balance">
        {message.text}
      </p>

      <div className="flex items-center justify-between mt-auto pt-4 md:pt-6 border-t border-black/5">
        <span className="text-[11px] md:text-[12px] font-medium tracking-[0.05em]">
          {message.emotion}
        </span>
        
        <div className="flex items-center gap-2 md:gap-4 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
          <button 
            onClick={() => setLiked(!liked)}
            className={`p-2 rounded-full transition-colors ${liked ? 'text-rose-500 bg-black/5 md:bg-transparent' : 'hover:bg-black/5'}`}
            title="Relate"
          >
            <Heart className={`w-4 h-4 md:w-5 md:h-5 ${liked ? 'fill-current' : ''}`} />
          </button>
          <button 
            onClick={handleReport}
            disabled={isReporting}
            className={`p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors ${isReporting ? 'opacity-50' : ''}`}
            title="Report"
          >
            <Flag className="w-4 h-4 md:w-5 md:h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}