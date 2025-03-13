'use client';

import React, { useState } from 'react';

export default function FileDownloadButton() {
  const [filename, setFilename] = useState('');
  const [content, setContent] = useState('');

  const handleDownload = () => {
    if (!filename.trim()) return;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    
    document.body.appendChild(link);
    link.click();
    
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 flex flex-col items-center overflow-hidden bg-green-100" style={{ paddingTop: '1rem' }}>
      <div className="space-y-4" style={{ width: '82vw' }}>
        <p className="text-center text-green-800">
          Enter filename and content, then click download
        </p>
        <div className="flex space-x-4">
          <input 
            type="text" 
            value={filename}
            onChange={(e) => setFilename(e.target.value)}
            placeholder="Enter filename (with extension)"
            className="flex-grow p-2 border rounded bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-300"
          />
          <button 
            onClick={handleDownload}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            disabled={!filename.trim()}
          >
            Download
          </button>
        </div>
        
        <textarea 
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter file text content"
          className="w-full p-2 border rounded bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-300"
          style={{height: "75vh"}}
        />
        
      </div>
    </div>
  );
}