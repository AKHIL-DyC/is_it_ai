'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

const RulesPage = () => {
  const router = useRouter();

  const handleProceed = () => {
    router.push('/pic');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-amber-50 px-6 py-10">
      <div className="max-w-3xl bg-white shadow-lg rounded-xl p-8 space-y-6">
        <h1 className="text-3xl font-bold text-center text-amber-800">
          📝 Rules & Instructions
        </h1>

        <ul className="list-disc list-inside space-y-3 text-gray-800 text-lg">
          <li>
            <strong>Only one entry</strong> is allowed per participant. Duplicate entries will be <span className="text-red-600 font-semibold">disqualified</span>.
          </li>
          <li>
            Please enter your <strong>name and email carefully</strong>. These will be used to contact the winner.
          </li>
          <li>
            <strong>Scoring is time-based:</strong> 
            <br />
            You get <span className="text-green-700 font-semibold">50 points</span> if you answer correct in 0 seconds.
            <br />
            For every additional second, <span className="text-red-700 font-semibold">1 point is deducted</span>.
            <br />
            Example: Answering correct in 3 seconds = <span className="font-semibold">47 points</span>
          </li>
          <li>
            Ensure a <strong>strong internet connection</strong> to avoid delays in loading content — because <span className="text-amber-700 font-semibold">every second matters</span>!
          </li>
        </ul>

        <div className="flex justify-center pt-4">
          <button
            onClick={handleProceed}
            className="bg-amber-800 text-white px-6 py-3 rounded-lg text-lg hover:bg-amber-900 transition"
          >
            Proceed →
          </button>
        </div>
      </div>
    </div>
  );
};

export default RulesPage;
