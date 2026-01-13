import React, { useState, useMemo } from 'react';
import { MOCK_MESSAGES, Message, Emotion } from './data';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { FilterBar } from './components/FilterBar';
import { MessageCard } from './components/MessageCard';
import { SubmitMessage } from './components/SubmitMessage';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { Toaster, toast } from 'sonner';
import { Shuffle, ArrowUp, LoaderCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { projectId, publicAnonKey } from '../../utils/supabase/info';

const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-76a5aef3`;

export default function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEmotion, setSelectedEmotion] = useState<Emotion | 'All'>('All');
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Fetch messages from Supabase
  const fetchMessages = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`${API_BASE}/messages`, {
        headers: { 'Authorization': `Bearer ${publicAnonKey}` }
      });
      const data = await res.json();
      if (Array.isArray(data)) {
        setMessages(data);
      } else {
        setMessages(MOCK_MESSAGES); // Fallback to mocks if server empty
      }
    } catch (err) {
      console.error('Error fetching:', err);
      setMessages(MOCK_MESSAGES);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    fetchMessages();
  }, []);

  // Handle scroll for "back to top" button
  React.useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredMessages = useMemo(() => {
    return messages.filter((m) => {
      const matchesSearch = 
        m.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.recipient?.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesEmotion = selectedEmotion === 'All' || m.emotion === selectedEmotion;
      
      return matchesSearch && matchesEmotion;
    }).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [messages, searchQuery, selectedEmotion]);

  const handleAddMessage = async (data: { text: string; recipient: string; emotion: Emotion }) => {
    try {
      const res = await fetch(`${API_BASE}/messages`, {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      const newMessage = await res.json();
      setMessages([newMessage, ...messages]);
      toast.success('Your message has been released into the archive.');
    } catch (err) {
      toast.error('Failed to send message. Please try again.');
    }
  };

  const showRandomMessage = () => {
    const random = messages[Math.floor(Math.random() * messages.length)];
    setSearchQuery(random.text.substring(0, 20)); // Just a way to highlight it or filter it
    toast('Searching for a random echo...', {
      description: `Found a message from the "${random.emotion}" category.`
    });
    // Actually, let's just scroll to a random message or filter by ID if we had that.
    // For now, let's just filter to show only that one for a second
    const originalQuery = searchQuery;
    const originalEmotion = selectedEmotion;
    
    setSelectedEmotion(random.emotion);
    setSearchQuery(random.recipient || '');
    
    setTimeout(() => {
      setSearchQuery(originalQuery);
      setSelectedEmotion(originalEmotion);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white font-sans selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black">
      <Toaster position="bottom-center" />
      
      <Header 
        onAddClick={() => setIsSubmitOpen(true)} 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <main className="max-w-7xl mx-auto px-4 md:px-6 pb-20 md:pb-32">
        <Hero />
        
        <div className="sticky top-16 md:top-20 z-30 pt-4 bg-white/80 dark:bg-black/80 backdrop-blur-md pb-4">
          <FilterBar 
            selectedEmotion={selectedEmotion}
            onSelect={setSelectedEmotion}
          />
        </div>

        {isLoading ? (
          <div className="py-20 md:py-32 flex flex-col items-center justify-center gap-4 opacity-40">
            <LoaderCircle className="w-8 h-8 animate-spin" />
            <p className="font-serif italic text-[14px] md:text-[16px]">Listening to the echoes...</p>
          </div>
        ) : filteredMessages.length > 0 ? (
          <ResponsiveMasonry columnsCountBreakPoints={{ 300: 1, 700: 2, 1050: 3 }}>
            <Masonry gutter="16px md:24px">
              {filteredMessages.map((message) => (
                <MessageCard key={message.id} message={message} />
              ))}
            </Masonry>
          </ResponsiveMasonry>
        ) : (
          <div className="py-20 md:py-32 text-center">
            <p className="text-[16px] md:text-[18px] opacity-40 italic font-serif">
              No messages found matching your search.
            </p>
            <button 
              onClick={() => {setSearchQuery(''); setSelectedEmotion('All');}}
              className="mt-4 text-[13px] md:text-[14px] underline underline-offset-4 hover:opacity-60 transition-opacity"
            >
              Clear all filters
            </button>
          </div>
        )}
      </main>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8 flex flex-col gap-3 md:gap-4 z-40">
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="p-4 bg-white dark:bg-zinc-900 border border-black/10 dark:border-white/10 rounded-full shadow-lg hover:shadow-xl transition-all group"
            >
              <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
            </motion.button>
          )}
        </AnimatePresence>
        
        <button
          onClick={showRandomMessage}
          className="p-3.5 md:p-4 bg-black text-white dark:bg-white dark:text-black rounded-full shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all group"
          title="Surprise me with a random message"
        >
          <Shuffle className="w-5 h-5 group-hover:rotate-12 transition-transform" />
        </button>
      </div>

      <footer className="py-12 md:py-20 border-t border-black/5 dark:border-white/5 bg-zinc-50/50 dark:bg-zinc-900/50">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-start">
            <div>
              <h3 className="text-[20px] md:text-[24px] font-serif mb-3 md:mb-4 dark:text-white">The Unsent Project</h3>
              <p className="text-[14px] md:text-[16px] text-muted-foreground leading-relaxed max-w-sm">
                A digital sanctuary for everything we meant to say but couldn't. 
                Built for the humans who carry the weight of unspoken words.
              </p>
            </div>
            <div className="flex flex-col md:items-end gap-6 md:gap-8">
              <div className="flex flex-wrap gap-6 md:gap-8 text-[11px] md:text-[13px] font-medium uppercase tracking-widest opacity-60">
                <a
                  href="https://www.instagram.com/sarvesh_chonde?igsh=MWxvdGt6YmNzNXkwcg=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-100 transition-opacity"
                >
                  CONTACT
                </a>
                <a
                  href="https://www.instagram.com/sarvesh_chonde?igsh=MWxvdGt6YmNzNXkwcg=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-100 transition-opacity"
                >
                  INSTAGRAM
                </a>
                <a
                  href="https://www.linkedin.com/in/sarvesh-chonde"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-100 transition-opacity"
                >
                  LINKEDIN
                </a>
              </div>
              <p className="text-[11px] md:text-[12px] opacity-30 leading-loose text-right md:text-right">
                © 2025 The Unsent Archive. All messages are anonymous.
                <br />
                This project operates in compliance with all applicable laws under
                The Untold Project, by SRV.
                <br />
                CHSRVINDIA@GMAIL.COM FOR ANY QUERIES!
              </p>
            </div>
          </div>
        </div>
      </footer>

      <SubmitMessage 
        isOpen={isSubmitOpen}
        onClose={() => setIsSubmitOpen(false)}
        onSubmit={handleAddMessage}
      />
    </div>
  );
}