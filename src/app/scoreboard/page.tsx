'use client';


import React, { useEffect, useState } from 'react';
import ConfettiSideCannons from '@/components/mycomponents/Myconfetti';
import Image from 'next/image';
interface Score {
  id: number;
  name: string;
  score: number;
}

const ScoreboardPage = () => {
  const [scores, setScores] = useState<Score[]>([]);

  useEffect(() => {
    const fetchScores = async () => {
      const res = await fetch('/api/scoreboard');
      if (!res.ok) throw new Error('Failed to fetch scores'); 
      const data = await res.json();
      setScores(data);
    };
    fetchScores();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#121212] p-8">
      <ConfettiSideCannons/>
<div className="flex flex-row  items-center justify-center gap-2 mb-4  " >
          
          <Image src="/nsdc.png" className='bg-white w-18 h-18 rounded-md' alt="nsdc" width={100} height={100} />
          <Image src="/ieee.png" className='bg-white w-18 h-18 rounded-md' alt="ieee" width={100} height={100} />
        </div>
      <h1 className="text-4xl font-bold text-amber-300 mb-8">🏆 Scoreboard</h1>
      <div className="bg-white rounded-xl shadow-xl overflow-hidden w-full max-w-2xl">
        <table className="min-w-full text-center">
          <thead className="bg-amber-300 text-black">
            <tr>
              <th className="py-3 px-4">Rank</th>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Score</th>
            </tr>
          </thead>
          <tbody>
            {scores.map((player, index) => (
              <tr
                key={player.id}
                className={index % 2 === 0 ? 'bg-[#232323]' : 'bg-[#323232]'}
              >
                <td className="py-3 px-4 font-medium text-white">{index + 1}</td>
                <td className="py-3 px-4 text-white">{player.name}</td>
                <td className="py-3 px-4 text-white">{player.score}</td>
              </tr>
            ))}
            {scores.length === 0 && (
              <tr>
                <td colSpan={3} className="py-4 bg-[#232323] text-gray-400">
                  No scores yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ScoreboardPage;
