import React from 'react';

const Picture = () => {
  return (
    <div className="flex flex-col h-screen w-screen bg-amber-50">
      {/* Top Card Area */}
      <div className="flex h-[80vh] border-2 border-amber-900 bg-amber-900 p-7 items-center justify-center">
        <div className="flex h-[70vh] w-[70vw] bg-amber-200 rounded-xl shadow-md"></div>
      </div>

      {/* Bottom Button Area */}
      <div className="flex h-[20vh] items-center justify-center">
        <div className="flex w-[70vh] justify-between">
          <button className="px-12 py-6 bg-amber-800 text-white rounded-xl text-lg font-semibold hover:bg-amber-900 transition">
            AI
          </button>
          <button className="px-12 py-6 bg-amber-800 text-white rounded-xl text-lg font-semibold hover:bg-amber-900 transition">
            NOT AI
          </button>
        </div>
      </div>
    </div>
  );
};

export default Picture;
