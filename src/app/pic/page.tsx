'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
interface Picture {
  id: number;
  src: string;
  ai: boolean;
}
const PicturePage = () => {
    
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [pictures, setPictures] = useState<{ id: number; src: string; ai: boolean }[]>([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
    console.log(current)
   useEffect(() => {
    const fetchPictures = async () => {
      const res = await fetch("/api/pictures");
      const data = await res.json();
      setPictures(data.sort(() => Math.random() - 0.5)); 
    };

    fetchPictures();
  }, []);

  const handleGuess = (guess: boolean) => {
  const isCorrect = pictures[current].ai === guess;

  if (current + 1 < pictures.length) {
    // Normal case
    if (isCorrect) setScore((prev) => prev + 1);
    setCurrent((prev) => prev + 1);
  } else {
    // Final image
    const finalScore = isCorrect ? score + 1 : score;
    setScore(finalScore); 
    submitScore(finalScore); 
    setCurrent((prev) => prev + 1);
  }
};



  const submitScore = async (finalScore: number) => {
  await axios.post('/api/score', { name, score: finalScore });
};


  if (!submitted) {
    return (
      <div className="flex h-screen items-center justify-center bg-amber-50">
        <div className="bg-white p-6 rounded-xl shadow-xl text-center">
          <h2 className="text-2xl font-bold mb-4">Enter your name</h2>
          <input
            className="border p-2 rounded-lg w-64"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
          />
          <button
            className="mt-4 bg-amber-800 text-white px-6 py-2 rounded-lg hover:bg-amber-900"
            onClick={() => name && setSubmitted(true)}
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
        <p className="text-xl">Your Score: {score} / {pictures.length}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen w-screen">
      <div className="flex h-[80vh] bg-amber-800 p-6 items-center justify-center">
        <div className="h-[70vh] w-[70vw] bg-white rounded-xl shadow overflow-hidden flex items-center justify-center">
          <Image
            src={pictures[current].src}
            alt="quiz pic"
            width={700}
            height={500}
            className="object-contain"
          />
        </div>
      </div>
      
      <div className="flex h-[20vh] items-center justify-center gap-6">
        <button
          className="px-8 py-4 bg-amber-800 text-white rounded-xl text-lg hover:bg-amber-900"
          onClick={() => handleGuess(true)}
        >AI</button>
        <button
          className="px-8 py-4 bg-amber-800 text-white rounded-xl text-lg hover:bg-amber-900"
          onClick={() => handleGuess(false)}
        >NOT AI</button>
      </div>
    </div>
  );
};

export default PicturePage;
