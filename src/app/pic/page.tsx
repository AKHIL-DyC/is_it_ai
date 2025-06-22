'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import axios from 'axios';

interface Picture {
  id: number;
  src: string;
  ai: boolean;
  isVideo: boolean;
}

const PicturePage = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [pictures, setPictures] = useState<Picture[]>([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [questionStartTime, setQuestionStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [email, setEmail] = useState('');

    const addTransform = (src: string) => {
  return src.replace('/upload/', '/upload/c_limit,w_800,f_auto,q_auto/');
};
  // Fetch images from backend
useEffect(() => {
  const fetchPictures = async () => {
    const res = await fetch('/api/pictures');
    const data = await res.json();
    const transformed = data.map((pic: any) => ({
      ...pic,
      src: addTransform(pic.src),
    }));
    setPictures(transformed.sort(() => Math.random() - 0.5)); // 👈 use transformed!
  };
  fetchPictures();
}, []);

// Start timer when new question is shown
useEffect(() => {
  if (submitted && pictures.length > 0 && current < pictures.length) {
    const now = Date.now();
    setQuestionStartTime(now);
    setElapsedTime(0);

    const interval = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - now) / 1000));
    }, 1000);

    return () => clearInterval(interval);
  }
}, [submitted, current, pictures]);

// ✅ Preload next image in background
useEffect(() => {
  if (pictures.length > 0 && current + 1 < pictures.length) {
    const next = pictures[current + 1];
    if (!next.isVideo) {
      const img = new window.Image();
      img.src = next.src;
    }
  }
}, [current, pictures]);




  
  // Handle user's guess
  const handleGuess = (guess: boolean) => {
    if (!questionStartTime) return;

    const timeTaken = Math.floor((Date.now() - questionStartTime) / 1000); 
    const isCorrect = pictures[current].ai === guess;

    let thisScore = 0;
    if (isCorrect) {
      thisScore = Math.max(50 - timeTaken, 1); 
      setScore((prev) => prev + thisScore);
    }

    if (current + 1 < pictures.length) {
      setCurrent((prev) => prev + 1);
    } else {
      const finalScore = isCorrect ? score + thisScore : score;
      setScore(finalScore);
      submitScore(finalScore);
      setCurrent((prev) => prev + 1); // Trigger score screen
    }
  };

  // Send final score to backend
  const submitScore = async (finalScore: number) => {
    await axios.post('/api/score', { name, score: finalScore,email:email });
  };

  
  useEffect(() => {
    if (current >= pictures.length && submitted) {
      const timeout = setTimeout(() => {
        router.push('/scoreboard');
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [current, pictures.length, submitted, router]);

  
  if (!submitted) {
    return (
     <div className="flex h-screen items-center justify-center bg-[#121212]">
  <div className="bg-[#232525] p-6 rounded-xl shadow-xl text-center">
    <h2 className="text-2xl font-bold mb-4 text-white">Enter your full name and email</h2>

    <input
      className="border border-white p-2 text-white  rounded-lg w-64 mb-4"
      value={name}
      onChange={(e) => setName(e.target.value)}
      placeholder="Full Name"
    />
    <br />

    <input
      className="border border-white text-white p-2 rounded-lg w-64"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      placeholder="Email"
      type="email"
    />
    <br/>
    <button
      className="ml-4 mt-4 bg-amber-400 text-black px-6 py-2 rounded-lg hover:bg-amber-300"
      onClick={() => name && email && setSubmitted(true)}
    >
      Start
    </button>
  </div>
</div>

    );
  }

  
  if (current >= pictures.length) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-green-100">
        <h1 className="text-3xl font-bold mb-6">Done, {name}!</h1>
        <p className="text-xl">Your Score: {score} / {pictures.length * 50}</p>
        <p className="text-md text-gray-600 mt-2">Redirecting to scoreboard...</p>
      </div>
    );
  }

  // Step 2: Quiz display
  return (
    <div className="flex flex-col h-screen w-screen relative">
      {/* Timer */}
      <div className="absolute top-4 left-4 bg-[#121212] text-amber-800 px-4 py-2 rounded-lg shadow font-semibold z-10">
        Time: {elapsedTime}s
      </div>

      {/* Image or Video */}
   <div className="flex h-[80vh] bg-amber-50 p-6 items-center justify-center">
  <div className="h-[70vh] w-[70vw] bg-white rounded-xl shadow overflow-hidden flex items-center justify-center">
    {pictures[current].isVideo ? (
      <video
        src={`${pictures[current].src}#t=0.1`}
        controls
        preload="metadata"
        className="w-full h-full object-contain rounded-xl"
      />
    ) : (
      <img
        src={pictures[current].src}
        alt="quiz pic"
       className="max-w-[90%] max-h-[90%] object-contain rounded-xl"
      />
    )}
  </div>
</div>



      {/* Buttons */}
      <div className="flex h-[20vh] items-center justify-center gap-6">
        <button
          className="px-8 py-4 bg-amber-400 text-white rounded-xl text-lg hover:bg-amber-300"
          onClick={() => handleGuess(true)}
        >AI</button>
        <button
          className="px-8 py-4 bg-amber-400 text-white rounded-xl text-lg hover:bg-amber-300"
          onClick={() => handleGuess(false)}
        >REAL</button>
      </div>
    </div>
  );
};

export default PicturePage;
