"use client"
import React from 'react'
import YouTube from 'react-youtube'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

const opts = {
  height: '390',
  width: '640',
  playerVars: {
    autoplay: 0,
  },
}

function ChapterContent({ chapter, content }) {
  // Step 1: Parse `content.content` safely
  let parsed = content?.content;
  if (typeof parsed === 'string') {
    try {
      parsed = JSON.parse(parsed);
    } catch (err) {
      console.error("Failed to parse content.content", err);
      parsed = null;
    }
  }

  // Step 2: Special handling for chapter 2
  let items = [];
  
  if (Array.isArray(parsed)) {
    // Handle chapter 2 with extra "undefined" entry
    if (parsed.length >= 2 && parsed[1].chapter === "undefined") {
      // Extract only the first valid chapter data
      const validChapter = parsed[0];
      if (validChapter.details && Array.isArray(validChapter.details)) {
        items = validChapter.details;
      } else if (validChapter.topics && Array.isArray(validChapter.topics)) {
        items = validChapter.topics;
      }
    } 
    // Handle normal array of items
    else {
      items = parsed;
    }
  } 
  // Handle object format
  else if (parsed && typeof parsed === 'object') {
    if (parsed.details && Array.isArray(parsed.details)) {
      items = parsed.details;
    } else if (parsed.topics && Array.isArray(parsed.topics)) {
      items = parsed.topics;
    }
  }

  // Clean code examples and check if valid
  const getCleanedCode = (code) => {
    if (
      !code ||
      typeof code !== 'string' ||
      code.toLowerCase().includes("not applicable") ||
      code.trim() === ""
    ) {
      return null;
    }

    const cleaned = code
      .replace(/<precode>/g, '')
      .replace(/<\/precode>/g, '')
      .replace(/sprecodes?/g, '')
      .replace(/u\n/g, '\n')
      .replace(/{}n/g, '{\n')
      .replace(/ln/g, '\n')
      .trim();

    return cleaned ? cleaned : null;
  };

  return (
    <div className='p-10'>
      <h2 className='font-medium text-2xl'>{chapter?.chapterName || chapter?.name}</h2>
      <p className='text-gray-500'>{chapter?.about}</p>

      {/* Video */}
      <div className='flex justify-center my-6'>
        {content?.videoId && <YouTube videoId={content.videoId} opts={opts} />}
      </div>

      {/* Render content */}
      <div>
        {items.length > 0 ? (
          items.map((item, index) => {
            // Clean the code and check if it's valid
            const cleanedCode = item["Code Example"] 
              ? getCleanedCode(item["Code Example"]) 
              : null;
              
            return (
              <div
                key={index}
                className='p-5 mb-4 rounded-lg bg-slate-100 shadow-sm transition hover:scale-[1.02]'
              >
                <h3 className='font-medium text-lg mb-2'>{item?.title}</h3>
                <div className='text-gray-700 whitespace-pre-wrap prose prose-slate max-w-none'>
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {item?.explanation || item?.description || '*No description provided*'}
                  </ReactMarkdown>
                </div>
                
                {/* Only render if cleanedCode exists */}
                {cleanedCode && (
                  <div className='p-4 mt-4 rounded-md bg-slate-800 text-slate-100 overflow-x-auto text-sm'>
                    <pre>
                      <code>{cleanedCode}</code>
                    </pre>
                  </div>
                )}
              </div>
            )
          })
        ) : (
          <div className="relative w-full h-full">
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
              <p className="text-3xl font-semibold text-gray-800 mb-2">👋 Welcome!</p>
              <p className="text-lg text-gray-600 max-w-md">
                Start by selecting a chapter on the left to begin your learning journey.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ChapterContent;