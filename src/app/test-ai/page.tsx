// app/test-ai/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

interface Picture {
  id: number;
  src: string;
  ai: boolean;
  isVideo: boolean;
}

const TestAiPage = () => {
  const [pictures, setPictures] = useState<Picture[]>([]);

  useEffect(() => {
    const fetchPics = async () => {
      const res = await fetch('/api/pictures');
      const data = await res.json();
      setPictures(data.filter((pic: Picture) => pic.ai)); // only AI images
    };

    fetchPics();
  }, []);

  return (
    <div className="p-8 bg-amber-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">🧪 AI Images Test</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {pictures.map((pic) => (
          <div key={pic.id} className="border rounded-xl p-2 bg-white shadow">
            <Image
              src={pic.src}
              alt={`Image ${pic.id}`}
              width={300}
              height={300}
              className="object-contain rounded-lg"
              onError={(e) => {
                console.error(`Failed to load image: ${pic.src}`);
                (e.target as HTMLImageElement).src = '/fallback.png'; // optional fallback
              }}
            />
            <p className="text-sm mt-2 break-all">{pic.src}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestAiPage;
