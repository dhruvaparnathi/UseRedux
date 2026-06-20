import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMediaResults, clearResults } from '../redux/slices/search.slice';
import SearchBar from '../components/SearchBar';
import TabSelector from '../components/TabSelector';
import MediaGrid from '../components/MediaGrid';
import CollectionDrawer from '../components/CollectionDrawer';

export default function Home() {
  const dispatch = useDispatch();
  const { query, activeTab } = useSelector((state) => state.search);

  // Initialize collection state from localStorage
  const [collection, setCollection] = useState({
    imgData: JSON.parse(localStorage.getItem("imgData")) || [],
    videoData: JSON.parse(localStorage.getItem("videoData")) || [],
    gifData: JSON.parse(localStorage.getItem("gifData")) || []
  });
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Toggle saving/removing items in collection
  const toggleCollect = (type, item) => {
    const key = type === 'images' ? 'imgData' : type === 'videos' ? 'videoData' : 'gifData';
    const currentList = collection[key] || [];
    const exists = currentList.some((x) => x.id === item.id);
    let newList;
    if (exists) {
      newList = currentList.filter((x) => x.id !== item.id);
    } else {
      newList = [...currentList, item];
    }
    const newCollection = { ...collection, [key]: newList };
    setCollection(newCollection);
    localStorage.setItem(key, JSON.stringify(newList));
  };

  // Clear all items in collection
  const clearCollection = () => {
    const cleared = { imgData: [], videoData: [], gifData: [] };
    setCollection(cleared);
    localStorage.setItem("imgData", JSON.stringify([]));
    localStorage.setItem("videoData", JSON.stringify([]));
    localStorage.setItem("gifData", JSON.stringify([]));
  };

  const totalCollectedCount =
    (collection.imgData?.length || 0) +
    (collection.videoData?.length || 0) +
    (collection.gifData?.length || 0);

  useEffect(() => {
    if (query) {
      dispatch(fetchMediaResults(query, activeTab));
    } else {
      dispatch(clearResults());
    }
  }, [query, activeTab, dispatch]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Top Header */}
      <header className="border-b border-slate-200 bg-white sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white font-black text-sm">
              M
            </div>
            <span className="font-semibold text-lg tracking-tight text-slate-900">
              MediaFinder
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline-block text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
              Find Your Media Here
            </span>
            
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-medium text-sm transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer shadow-sm relative group"
            >
              <svg className="w-4 h-4 text-rose-500 fill-current group-hover:scale-110 transition-transform duration-200" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
              <span>My Collection</span>
              {totalCollectedCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white ring-2 ring-white animate-pulse">
                  {totalCollectedCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Intro Banner */}
        <div className="text-center mb-10 space-y-3">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Search Free Images, Videos & GIFs
          </h1>
          <p className="text-slate-500 max-w-xl mx-auto text-base sm:text-lg font-normal">
            Explore millions of high-quality assets sourced directly from Unsplash, Pexels, and Giphy.
          </p>
        </div>

        {/* Search Section */}
        <div className="mb-10">
          <SearchBar />
        </div>

        {/* Filters and Grid Section */}
        <div className="space-y-8">
          <TabSelector />
          <MediaGrid collection={collection} onToggleCollect={toggleCollect} />
        </div>
      </main>

      {/* Slide-out drawer for saved items */}
      <CollectionDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        collection={collection}
        onToggleCollect={toggleCollect}
        onClearCollection={clearCollection}
      />
    </div>
  );
}

