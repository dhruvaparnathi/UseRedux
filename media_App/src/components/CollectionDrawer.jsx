import React, { useState, useEffect } from 'react';

export default function CollectionDrawer({
  isOpen,
  onClose,
  collection,
  onToggleCollect,
  onClearCollection
}) {
  const [activeTab, setActiveTab] = useState('images');

  // Handle locking body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const imgList = collection.imgData || [];
  const videoList = collection.videoData || [];
  const gifList = collection.gifData || [];

  const getActiveList = () => {
    switch (activeTab) {
      case 'videos':
        return videoList;
      case 'gifs':
        return gifList;
      case 'images':
      default:
        return imgList;
    }
  };

  const currentList = getActiveList();
  const totalCount = imgList.length + videoList.length + gifList.length;

  const handleRemove = (item) => {
    onToggleCollect(activeTab, item);
  };

  // Helper to format duration
  const formatDuration = (sec) => {
    if (!sec) return '0:00';
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
      <div className="absolute inset-0 overflow-hidden">
        {/* Backdrop overlay */}
        <div 
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-300 ease-in-out opacity-100"
        />

        {/* Sliding Panel */}
        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
          <div className="pointer-events-auto w-screen max-w-md transform transition duration-300 ease-in-out sm:duration-500 translate-x-0">
            <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-2xl border-l border-slate-100">
              
              {/* Header */}
              <div className="px-6 py-6 bg-slate-50 border-b border-slate-200">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2" id="slide-over-title">
                      Saved Collection
                      <span className="inline-flex items-center rounded-full bg-slate-900 px-2.5 py-0.5 text-xs font-semibold text-white">
                        {totalCount}
                      </span>
                    </h2>
                    <p className="mt-1 text-xs text-slate-500">Your favorite media items saved locally.</p>
                  </div>
                  
                  <div className="ml-3 flex h-7 items-center gap-2">
                    {totalCount > 0 && (
                      <button
                        type="button"
                        onClick={onClearCollection}
                        className="text-xs font-semibold text-rose-600 hover:text-rose-800 bg-rose-50 hover:bg-rose-100 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
                      >
                        Clear All
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={onClose}
                      className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-all cursor-pointer"
                    >
                      <span className="sr-only">Close panel</span>
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Drawer Tabs */}
              <div className="border-b border-slate-200 bg-white sticky top-0 z-10 px-4">
                <nav className="-mb-px flex justify-around" aria-label="Tabs">
                  {[
                    { id: 'images', name: 'Images', count: imgList.length },
                    { id: 'videos', name: 'Videos', count: videoList.length },
                    { id: 'gifs', name: 'GIFs', count: gifList.length }
                  ].map((tab) => {
                    const isActive = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-1.5 border-b-2 py-4 px-1 text-sm font-medium transition-all cursor-pointer ${
                          isActive
                            ? 'border-slate-900 text-slate-900 font-bold'
                            : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700'
                        }`}
                      >
                        {tab.name}
                        <span className={`inline-block rounded-full px-1.5 py-0.2 text-[10px] font-bold ${
                          isActive ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {tab.count}
                        </span>
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* Drawer Content */}
              <div className="flex-1 py-6 px-4 sm:px-6 overflow-y-auto bg-slate-50/50">
                {currentList.length === 0 ? (
                  <div className="text-center py-16 px-4">
                    <div className="inline-flex p-3 rounded-full bg-slate-100 text-slate-400 mb-4">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </div>
                    <h3 className="text-slate-800 font-semibold text-base mb-1">No saved {activeTab}</h3>
                    <p className="text-slate-500 text-xs max-w-xs mx-auto">
                      Click the heart icon on any {activeTab.slice(0, -1)} while searching to save it here.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                    {currentList.map((item, index) => {
                      const id = item.id || item.link || index;
                      
                      // Resolve media content based on activeTab
                      let title = '';
                      let imageUrl = '';
                      let extraInfo = '';
                      let originalLink = '#';

                      if (activeTab === 'images') {
                        title = item.alt_description || item.description || 'Untitled Image';
                        imageUrl = item.urls?.small || item.urls?.regular || item.src?.medium;
                        extraInfo = item.user?.name || item.photographer || 'Unsplash';
                        originalLink = item.links?.html || imageUrl;
                      } else if (activeTab === 'videos') {
                        title = `Video by ${item.user?.name || 'Pexels Creator'}`;
                        imageUrl = item.image;
                        extraInfo = item.duration ? `${formatDuration(item.duration)} duration` : 'Pexels';
                        originalLink = item.url;
                      } else if (activeTab === 'gifs') {
                        title = item.title || 'Giphy GIF';
                        imageUrl = item.images?.fixed_height?.url || item.images?.original?.url;
                        extraInfo = item.username ? `@${item.username}` : 'Giphy';
                        originalLink = item.url;
                      }

                      return (
                        <div key={id} className="group relative bg-white border border-slate-150 rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col h-full">
                          
                          {/* Image Thumbnail */}
                          <div className="relative aspect-square w-full overflow-hidden bg-slate-100">
                            {activeTab === 'videos' && item.video_files?.[0]?.link ? (
                              <video
                                src={item.video_files?.[0]?.link}
                                poster={imageUrl}
                                muted
                                loop
                                playsInline
                                onMouseEnter={(e) => e.target.play().catch(() => {})}
                                onMouseLeave={(e) => e.target.pause()}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <img
                                src={imageUrl}
                                alt={title}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-103"
                                loading="lazy"
                              />
                            )}
                            
                            {/* Overlay delete button (always visible or on hover) */}
                            <button
                              type="button"
                              onClick={() => handleRemove(item)}
                              className="absolute top-2 right-2 p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg shadow-sm hover:scale-105 transition-all cursor-pointer z-10"
                              title="Remove from collection"
                            >
                              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>

                            {activeTab === 'videos' && (
                              <div className="absolute bottom-2 left-2 bg-black/60 text-white text-[9px] px-1.5 py-0.5 rounded font-medium flex items-center gap-0.5">
                                <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 20 20">
                                  <path d="M4 4l12 6-12 6V4z" />
                                </svg>
                                Video
                              </div>
                            )}

                            {activeTab === 'gifs' && (
                              <div className="absolute bottom-2 left-2 bg-black/60 text-white text-[9px] px-1.5 py-0.5 rounded font-black tracking-wider">
                                GIF
                              </div>
                            )}
                          </div>

                          {/* Info section */}
                          <div className="p-2.5 flex-1 flex flex-col justify-between">
                            <h4 className="text-slate-800 font-medium text-[11px] leading-tight line-clamp-2 capitalize">
                              {title}
                            </h4>
                            <div className="mt-2 flex items-center justify-between text-[10px] text-slate-400">
                              <span className="truncate max-w-[80px] font-medium">{extraInfo}</span>
                              <a
                                href={originalLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-indigo-600 hover:text-indigo-850 hover:underline flex items-center gap-0.5"
                              >
                                View
                                <svg className="w-2 h-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                              </a>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
