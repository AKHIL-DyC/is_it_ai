'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MorphingText } from "@/components/magicui/morphing-text";
import { useRouter } from 'next/navigation';

const Page = () => {
  const [showText, setShowText] = useState(true);
  const [startReveal, setStartReveal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const textTimeout = setTimeout(() => setShowText(false), 9000);
    const revealTimeout = setTimeout(() => setStartReveal(true), 9500);
    const redirectTimeout = setTimeout(() => router.push('/rule'), 3800);

    return () => {
      clearTimeout(textTimeout);
      clearTimeout(revealTimeout);
      clearTimeout(redirectTimeout);
    };
  }, []);

  return (
    <div className="relative h-screen w-screen bg-[#121212] overflow-hidden">
      <AnimatePresence>
        {showText && (
          <motion.div
            className="flex h-screen w-screen items-center justify-center bg-[#121212]  absolute top-0 left-0 z-10"
            initial={{ height: '100%' }}
            animate={{ height: '100%' }}
            exit={{ height: 0 }}
            transition={{ duration: 1 }}
          >
            <MorphingText texts={[" ","REAL", "OR", "AI", " "]} />
          </motion.div>
        )}
      </AnimatePresence>

      
    </div>
  );
};

export default Page;
