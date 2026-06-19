import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMediaResults, clearResults } from '../redux/slices/search.slice';
import SearchBar from '../components/SearchBar';
import TabSelector from '../components/TabSelector';
import MediaGrid from '../components/MediaGrid';

export default function Home() {
  const dispatch = useDispatch();
  const { query, activeTab } = useSelector((state) => state.search);

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
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
              Find Your Media Here
            </span>
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
          <MediaGrid />
        </div>
      </main>

      {/* Clean Footer
      <footer className="border-t border-slate-200 bg-white py-8 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs text-slate-400 font-medium">
          <p>&copy; {new Date().getFullYear()} MediaFinder App. Developed with premium Tailwind CSS styling.</p>
        </div>
      </footer> */}
    </div>
  );
}
