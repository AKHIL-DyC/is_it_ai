'use client';

import React, { useEffect, useState } from 'react';
import ConfettiSideCannons from '@/components/mycomponents/Myconfetti';
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
      const data = await res.json();
      setScores(data);
    };
    fetchScores();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-100 p-8">
      <ConfettiSideCannons/>
      <h1 className="text-4xl font-bold text-amber-800 mb-8">🏆 Scoreboard</h1>
      <div className="bg-white rounded-xl shadow-xl overflow-hidden w-full max-w-2xl">
        <table className="min-w-full text-center">
          <thead className="bg-amber-800 text-white">
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
                className={index % 2 === 0 ? 'bg-green-50' : 'bg-green-200'}
              >
                <td className="py-3 px-4 font-medium">{index + 1}</td>
                <td className="py-3 px-4">{player.name}</td>
                <td className="py-3 px-4">{player.score}</td>
              </tr>
            ))}
            {scores.length === 0 && (
              <tr>
                <td colSpan={3} className="py-4 text-gray-600">
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
