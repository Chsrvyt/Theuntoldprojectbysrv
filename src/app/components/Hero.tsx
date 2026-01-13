import React from 'react';
import { motion } from 'motion/react';

export function Hero() {
  return (
    <section className="pt-16 md:pt-24 pb-12 md:pb-16 px-4 md:px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-[32px] sm:text-[40px] md:text-[64px] font-serif leading-[1.2] md:leading-tight mb-6 md:mb-8 text-balance">
          Messages we never sent.
        </h1>
        <p className="text-[16px] sm:text-[18px] md:text-[20px] text-muted-foreground max-w-2xl mx-auto leading-relaxed text-balance">
          A quiet place for the words that were left unspoken. Anonymous, honest, and human. 
          Read the echoes of others, or leave your own behind.
        </p>
        
        <div className="mt-10 md:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 text-[11px] md:text-[12px] font-medium tracking-widest uppercase opacity-40">
          <div className="flex -space-x-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-7 h-7 md:w-8 md:h-8 rounded-full border-2 border-white bg-zinc-100" />
            ))}
          </div>
          <span className="text-center sm:text-left">Joined by thousands of anonymous voices</span>
        </div>
      </motion.div>
    </section>
  );
}