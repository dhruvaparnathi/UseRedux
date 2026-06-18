import React, { useRef, useState } from 'react';

// --- IMAGE CARD ---
function ImageCard({ item }) {
  const imageUrl = item.urls?.regular || item.urls?.small || item.src?.medium;
  const authorName = item.user?.name || item.photographer || 'Unknown Artist';
  const authorProfile = item.user?.profile_image?.small;
  const description = item.alt_description || item.description || 'Untitled';
  const downloadLink = item.links?.download || imageUrl;
  const likes = item.likes;

  return (
    <div className="group relative bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col h-full">
      {/* Image Container */}
      <div className="relative aspect-square sm:aspect-[4/3] w-full overflow-hidden bg-slate-100">
        <img
          src={imageUrl}
          alt={description}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {/* Hover overlay with action buttons */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
          <div className="flex items-center gap-2 text-white">
            {authorProfile ? (
              <img
                src={authorProfile}
                alt={authorName}
                className="w-7 h-7 rounded-full border border-white/50"
              />
            ) : (
              <div className="w-7 h-7 rounded-full bg-slate-500 border border-white/50 flex items-center justify-center text-[10px] font-bold">
                {authorName.charAt(0)}
              </div>
            )}
            <span className="text-sm font-medium truncate max-w-[120px]">{authorName}</span>
          </div>

          <a
            href={downloadLink}
            target="_blank"
            rel="noopener noreferrer"
            download
            className="p-2 bg-white/95 hover:bg-white text-slate-800 rounded-lg shadow-sm hover:scale-105 transition-all"
            title="Open original or download"
            onClick={(e) => e.stopPropagation()}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              ></path>
            </svg>
          </a>
        </div>
      </div>

      {/* Info details */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-1">Image</p>
          <h3 className="text-slate-800 font-medium text-sm line-clamp-2 leading-relaxed capitalize">
            {description}
          </h3>
        </div>
        {likes !== undefined && (
          <div className="mt-3 flex items-center text-xs text-slate-400 font-medium">
            <svg
              className="w-4 h-4 mr-1 text-rose-500 fill-rose-500"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clipRule="evenodd"
              ></path>
            </svg>
            {likes} likes
          </div>
        )}
      </div>
    </div>
  );
}

// --- VIDEO CARD ---
function VideoCard({ item }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const posterUrl = item.image || item.user?.url;
  const authorName = item.user?.name || 'Pexels Creator';
  const duration = item.duration;

  // Find MP4 file link, fallback to any link
  const videoLink =
    item.video_files?.find((f) => f.file_type === 'video/mp4' || f.link?.includes('.mp4'))?.link ||
    item.video_files?.[0]?.link;

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play().catch((err) => console.log('Video play interrupted', err));
      setIsPlaying(true);
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const formatDuration = (sec) => {
    if (!sec) return '0:00';
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col h-full"
    >
      {/* Video Container */}
      <div className="relative aspect-video w-full overflow-hidden bg-slate-900">
        {videoLink ? (
          <video
            ref={videoRef}
            src={videoLink}
            poster={posterUrl}
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-slate-800 text-white text-xs">
            No video preview
          </div>
        )}

        {/* Video badge: duration */}
        {duration && (
          <span className="absolute bottom-3 right-3 bg-black/75 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
            {formatDuration(duration)}
          </span>
        )}

        {/* Play indicator overlay */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/30 transition-all pointer-events-none">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white/90 shadow-md transform group-hover:scale-110 transition-transform">
              <svg
                className="w-5 h-5 text-slate-900 ml-0.5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
          </div>
        )}
      </div>

      {/* Info details */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wider mb-1">Video</p>
          <h3 className="text-slate-800 font-medium text-sm line-clamp-2 leading-relaxed">
            Shared by {authorName}
          </h3>
        </div>
        <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
          <span>Pexels Video</span>
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-500 hover:text-slate-950 font-medium inline-flex items-center transition-colors"
          >
            Watch Original
            <svg
              className="w-3 h-3 ml-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              ></path>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}

// --- GIF CARD ---
function GifCard({ item }) {
  const gifUrl = item.images?.fixed_height?.url || item.images?.original?.url;
  const title = item.title || 'Giphy GIF';
  const author = item.username ? `@${item.username}` : 'Giphy Creator';

  return (
    <div className="group bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col h-full">
      {/* Gif Container */}
      <div className="relative aspect-square sm:aspect-[4/3] w-full overflow-hidden bg-slate-100">
        <img
          src={gifUrl}
          alt={title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-sm text-white text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded">
          GIF
        </div>
      </div>

      {/* Info details */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-1">GIF</p>
          <h3 className="text-slate-800 font-medium text-sm line-clamp-2 leading-relaxed capitalize">
            {title}
          </h3>
        </div>
        <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
          <span className="truncate max-w-[120px]" title={author}>
            {author}
          </span>
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-500 hover:text-slate-950 font-medium inline-flex items-center transition-colors"
          >
            Giphy link
            <svg
              className="w-3 h-3 ml-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              ></path>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}

// --- MAIN WRAPPER CARD ---
export default function MediaCard({ item, type }) {
  if (!item) return null;

  // Render correct card based on the activeTab/type
  switch (type) {
    case 'videos':
      return <VideoCard item={item} />;
    case 'gifs':
      return <GifCard item={item} />;
    case 'images':
    default:
      return <ImageCard item={item} />;
  }
}
