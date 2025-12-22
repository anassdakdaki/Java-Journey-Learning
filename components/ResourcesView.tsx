
import React from 'react';
import { YOUTUBE_RESOURCES, WEBSITE_RESOURCES, BOOK_RESOURCES } from '../constants/resourcesData';
import { GlobeIcon } from './icons/FeedbackIcons';

const ResourcesView: React.FC = () => {
  return (
    <div className="w-full max-w-6xl animate-fade-in space-y-12 px-4">
      
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-primary dark:text-white mb-4">Learning Library</h1>
        <p className="text-xl text-content-200 dark:text-content-200-dark max-w-2xl mx-auto">
          Expand your knowledge with these hand-picked resources. Watch tutorials, read documentation, and find the best books.
        </p>
      </div>

      {/* Section 1: Video Courses */}
      <section className="rounded-xl bg-gray-50 dark:bg-gray-900/10 p-2 md:p-4">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg text-red-600">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
              </svg>
          </div>
          <h2 className="text-2xl font-bold text-content-100 dark:text-white">Video Tutorials</h2>
        </div>
        <p className="text-sm md:text-base text-content-200 dark:text-gray-400 mb-4">Quickly learn concepts with curated, short-form videos.</p>
        
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-6">
          {YOUTUBE_RESOURCES.map(video => (
            <div 
              key={video.id} 
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-base-300 dark:border-gray-700 flex flex-col h-full"
            >
              {/* Video Player */}
              <div className="relative pb-[56.25%] bg-black">
                <iframe 
                  className="absolute top-0 left-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${video.url}`}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              </div>

              {/* Text content */}
              <div className="p-2 md:p-4 flex flex-col h-full">
                <div className="inline-flex items-center gap-1 text-[10px] font-semibold text-red-600 bg-red-50 dark:bg-red-900/20 rounded px-1.5 py-0.5 w-fit mb-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                  </svg>
                  <span>Video</span>
                </div>
                <h3 className="font-bold text-base md:text-lg mb-1 text-content-100 dark:text-white leading-tight">{video.title}</h3>
                <p className="text-xs text-secondary font-semibold mb-1 md:mb-2 leading-tight">{video.author}</p>
                <p className="text-xs md:text-sm text-content-200 dark:text-gray-400 mb-1 md:mb-2 md:h-16 leading-tight line-clamp-2 md:line-clamp-3">{video.description}</p>

                {/* Link */}
                <a 
                  href={`https://www.youtube.com/watch?v=${video.url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs md:text-sm text-center w-full py-1 md:py-2 bg-gray-100 dark:bg-gray-700 hover:bg-red-100 dark:hover:bg-red-900/30 text-gray-600 dark:text-gray-300 hover:text-red-600 rounded transition-colors flex items-center justify-center gap-2 mt-auto"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                      <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" />
                  </svg>
                  Watch on YouTube
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 2: Websites & Docs */}
      <section className="rounded-xl bg-gray-50 dark:bg-gray-900/10 p-2 md:p-4">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600">
            <GlobeIcon className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-content-100 dark:text-white">Websites & Documentation</h2>
        </div>
        <p className="text-sm md:text-base text-content-200 dark:text-gray-400 mb-4">Deep reference material and official docs for precise answers.</p>

        <div className="grid grid-cols-2 md:grid-cols-2 gap-2 md:gap-6">
          {WEBSITE_RESOURCES.map(site => (
            <a 
              key={site.id}
              href={site.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block bg-white dark:bg-gray-800 p-2 md:p-6 rounded-xl shadow-md hover:shadow-xl transition-all border border-base-300 dark:border-gray-700 hover:border-secondary h-full"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="inline-flex items-center gap-1 text-[10px] font-semibold text-blue-600 bg-blue-50 dark:bg-blue-900/20 rounded px-1.5 py-0.5 w-fit mb-1">
                    <GlobeIcon className="w-3 h-3" />
                    <span>Website</span>
                  </div>
                  <h3 className="font-bold text-base md:text-lg text-primary dark:text-blue-400 group-hover:underline decoration-2 underline-offset-2 mb-1 md:mb-2 leading-tight">
                    {site.title} &nearr;
                  </h3>
                  <p className="text-xs md:text-sm text-content-200 dark:text-gray-400 mb-1 md:mb-2 md:h-16 leading-tight line-clamp-2 md:line-clamp-3">{site.description}</p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Section 3: Books */}
      <section className="rounded-xl bg-gray-50 dark:bg-gray-900/10 p-2 md:p-4">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg text-yellow-600">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path fillRule="evenodd" d="M11.25 4.533A9.707 9.707 0 0 0 6 3a9.735 9.735 0 0 0-3.25.555.75.75 0 0 0-.5.707v14.25a.75.75 0 0 0 1 .707A8.237 8.237 0 0 1 6 18.75c1.995 0 3.823.707 5.25 1.886V4.533ZM12.75 4.533A9.707 9.707 0 0 1 18 3c1.126 0 2.2.193 3.25.555.38.133.5.52.5.707v14.25a.75.75 0 0 1-1 .707A8.237 8.237 0 0 0 18 18.75c-1.995 0-3.823.707-5.25 1.886V4.533Z" clipRule="evenodd" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-content-100 dark:text-white">Recommended Reading</h2>
        </div>
        <p className="text-sm md:text-base text-content-200 dark:text-gray-400 mb-4">Books for mastery and deeper understanding of Java.</p>

        <div className="grid grid-cols-2 md:grid-cols-2 gap-2 md:gap-6">
          {BOOK_RESOURCES.map(book => (
            <div 
              key={book.id} 
              className="bg-white dark:bg-gray-800 p-2 md:p-6 rounded-xl shadow-md border border-base-300 dark:border-gray-700 flex flex-col sm:flex-row gap-2 md:gap-4 h-full"
            >
              <div className="flex flex-col h-full">
                <div className="inline-flex items-center gap-1 text-[10px] font-semibold text-yellow-700 bg-yellow-50 dark:bg-yellow-900/20 rounded px-1.5 py-0.5 w-fit mb-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                    <path fillRule="evenodd" d="M11.25 4.533A9.707 9.707 0 0 0 6 3a9.735 9.735 0 0 0-3.25.555.75.75 0 0 0-.5.707v14.25a.75.75 0 0 0 1 .707A8.237 8.237 0 0 1 6 18.75c1.995 0 3.823.707 5.25 1.886V4.533ZM12.75 4.533A9.707 9.707 0 0 1 18 3c1.126 0 2.2.193 3.25.555.38.133.5.52.5.707v14.25a.75.75 0 0 1-1 .707A8.237 8.237 0 0 0 18 18.75c-1.995 0-3.823.707-5.25 1.886V4.533Z" clipRule="evenodd" />
                  </svg>
                  <span>Book</span>
                </div>
                <h3 className="font-bold text-base md:text-lg text-content-100 dark:text-white leading-tight">{book.title}</h3>
                <p className="text-sm font-medium text-secondary mb-2">by {book.author}</p>
                <p className="text-xs md:text-sm text-content-200 dark:text-gray-400 mb-1 md:mb-2 md:h-16 leading-tight line-clamp-2 md:line-clamp-3">{book.description}</p>
                <a 
                  href={book.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs md:text-sm font-bold text-primary dark:text-blue-300 hover:underline mt-auto"
                >
                  View Book →
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default ResourcesView;
