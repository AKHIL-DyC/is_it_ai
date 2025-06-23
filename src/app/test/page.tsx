'use client';

import React, { useEffect, useState } from 'react';

interface Picture {
  id: number;
  src: string;
  ai: boolean;
  isVideo: boolean;
}

const AllImagesPage = () => {
  const [pictures, setPictures] = useState<Picture[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch('/api/pictures');
        const data = await res.json();
        setPictures(data);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);

  return (
    <div className="min-h-screen bg-amber-50 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">📸 All Images with ID</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pictures.map((pic) => (
          <div
            key={pic.id}
            className="bg-white rounded-xl shadow p-4 flex flex-col items-center"
          >
            <p className="mb-2 font-medium text-gray-700">ID: {pic.id}</p>
            {pic.isVideo ? (
              <video
                src={pic.src}
                controls
                className="w-full h-auto max-h-72 rounded"
              />
            ) : (
              <img
                src={pic.src}
                alt={`Image ${pic.id}`}
                className="w-full h-auto max-h-72 object-contain rounded"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllImagesPage;
