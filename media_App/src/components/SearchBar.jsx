import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setQuery } from '../redux/slices/search.slice';

export default function SearchBar() {
  const dispatch = useDispatch();
  const reduxQuery = useSelector((state) => state.search.query);
  const [localQuery, setLocalQuery] = useState(reduxQuery);
  

  // Keep local query in sync if redux query changes externally
  useEffect(() => {
    setLocalQuery(reduxQuery);
  }, [reduxQuery]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setQuery(localQuery.trim()));
  };

  const handleClear = () => {
    setLocalQuery('');
    dispatch(setQuery(''));
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto">
      <div className="relative flex items-center gap-2">
        <div className="relative flex-1">
          {/* Search Icon */}
          <span className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </span>

          {/* Input Field */}
          <input
            type="text"
            className="w-full pl-11 pr-10 py-3.5 bg-slate-50 border border-slate-200 text-slate-900 rounded-xl text-base placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent transition-all"
            placeholder="Search images, videos or GIFs..."
            value={localQuery}
            onChange={(e) => setLocalQuery(e.target.value)}
          />

          {/* Clear Button */}
          {localQuery && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          )}
        </div>

        {/* Search Button */}
        <button
          type="submit"
          className="px-6 py-3.5 bg-slate-900 hover:bg-slate-800 active:bg-slate-950 text-white font-medium rounded-xl text-base shadow-sm transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
        >
          Search
        </button>
      </div>
    </form>
  );
}
