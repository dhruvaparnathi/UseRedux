import React from 'react';
import { useSelector } from 'react-redux';
import MediaCard from './MediaCard';

// Skeleton shimmer card loader
function SkeletonCard({ type }) {
  const aspectClass = type === 'videos' ? 'aspect-video' : 'aspect-square sm:aspect-[4/3]';
  return (
    <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm flex flex-col h-full">
      <div className={`${aspectClass} w-full bg-slate-200 animate-pulse`} />
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-2">
          <div className="h-3 bg-slate-200 rounded animate-pulse w-1/4" />
          <div className="h-4 bg-slate-200 rounded animate-pulse w-5/6" />
        </div>
        <div className="h-3 bg-slate-200 rounded animate-pulse w-1/3" />
      </div>
    </div>
  );
}

export default function MediaGrid({ collection, onToggleCollect }) {
  const { results, activeTab, loading, error, query } = useSelector((state) => state.search);

  // Helper to extract the list items robustly from various API formats or flat arrays
  const getItemsList = (res, tab) => {
    if (!res) return [];
    if (Array.isArray(res)) return res;

    // Check by tab type first
    if (tab === 'images' && res.results && Array.isArray(res.results)) {
      return res.results;
    }
    if (tab === 'videos' && res.videos && Array.isArray(res.videos)) {
      return res.videos;
    }
    if (tab === 'gifs' && res.data && Array.isArray(res.data)) {
      return res.data;
    }

    // Fallbacks if tab checks mismatch
    if (res.results && Array.isArray(res.results)) return res.results;
    if (res.videos && Array.isArray(res.videos)) return res.videos;
    if (res.data && Array.isArray(res.data)) return res.data;

    return [];
  };

  const items = getItemsList(results, activeTab);

  // 1. Loading State
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <SkeletonCard key={i} type={activeTab} />
        ))}
      </div>
    );
  }

  // 2. Error State
  if (error) {
    return (
      <div className="text-center py-16 px-4 bg-red-50/50 border border-red-100 rounded-2xl max-w-xl mx-auto">
        <div className="inline-flex p-3 rounded-full bg-red-100 text-red-600 mb-4">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            ></path>
          </svg>
        </div>
        <h3 className="text-red-900 font-semibold text-lg mb-1">Search Failed</h3>
        <p className="text-red-600 text-sm">{error.message || String(error)}</p>
      </div>
    );
  }

  // 3. Initial Empty / No Search State
  if (!query) {
    return (
      <div className="text-center py-20 px-4 bg-slate-50/50 border border-slate-100 rounded-2xl max-w-xl mx-auto">
        <div className="inline-flex p-3.5 rounded-full bg-slate-100 text-slate-400 mb-4">
          <svg
            className="w-7 h-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
        <h3 className="text-slate-800 font-semibold text-lg mb-2">Find stunning media</h3>
        <p className="text-slate-500 text-sm max-w-sm mx-auto mb-6">
          Type keywords in the search bar above to fetch free stock photos, Pexels videos, and Giphy animations.
        </p>
        <div className="flex flex-wrap justify-center gap-2 max-w-xs mx-auto">
          {['Nature', 'Retro', 'Space', 'Abstract', 'Vibe'].map((term) => (
            <span
              key={term}
              className="text-xs bg-white text-slate-600 px-3 py-1.5 rounded-lg border border-slate-200 cursor-not-allowed select-none"
            >
              #{term}
            </span>
          ))}
        </div>
      </div>
    );
  }

  // 4. No Results Found
  if (items.length === 0) {
    return (
      <div className="text-center py-20 px-4 bg-slate-50/50 border border-slate-100 rounded-2xl max-w-xl mx-auto">
        <div className="inline-flex p-3.5 rounded-full bg-slate-100 text-slate-400 mb-4">
          <svg
            className="w-7 h-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
        </div>
        <h3 className="text-slate-800 font-semibold text-lg mb-1">No results found</h3>
        <p className="text-slate-500 text-sm">
          We couldn't find anything matching <span className="font-semibold text-slate-800">"{query}"</span> in {activeTab}.
        </p>
      </div>
    );
  }

  // 5. Results Grid
  const key = activeTab === 'images' ? 'imgData' : activeTab === 'videos' ? 'videoData' : 'gifData';
  const collectionList = collection?.[key] || [];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {items.map((item, index) => {
        const isCollected = collectionList.some((x) => x.id === item.id);
        return (
          <MediaCard
            key={item.id || item.link || index}
            item={item}
            type={activeTab}
            isCollected={isCollected}
            onToggleCollect={onToggleCollect}
          />
        );
      })}
    </div>
  );
}
