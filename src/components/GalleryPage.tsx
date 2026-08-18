'use client';

import React, { useState } from 'react';
import { Language, GalleryItem } from '../types';
import { translations } from '../data/translations';
import { galleryItems } from '../data/content';
import { Play, ZoomIn, X, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface GalleryPageProps {
  currentLang: Language;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({ currentLang }) => {
  const t = translations.gallery;

  const [items, setItems] = useState<GalleryItem[]>(galleryItems);
  const [activeFilter, setActiveFilter] = useState<'all' | string>('all');
  const [selectedMedia, setSelectedMedia] = useState<GalleryItem | null>(null);

  React.useEffect(() => {
    async function loadDynamicGallery() {
      try {
        const res = await fetch('/api/gallery');
        const data = await res.json();
        if (res.ok && data.gallery && data.gallery.length > 0) {
          setItems(data.gallery);
        }
      } catch (err) {
        console.error('Failed to load dynamic gallery:', err);
      }
    }
    loadDynamicGallery();
  }, []);

  const filterTabs = [
    { id: 'all', label: t.filters.all[currentLang] },
    { id: 'training', label: t.filters.training[currentLang] },
    { id: 'workshops', label: t.filters.workshops[currentLang] },
    { id: 'events', label: t.filters.events[currentLang] },
    { id: 'students', label: t.filters.students[currentLang] },
    { id: 'videos', label: t.filters.videos[currentLang] },
  ];

  const filteredItems = items.filter((item) => {
    if (activeFilter === 'all') return true;
    return item.category === activeFilter;
  });

  return (
    <div className="py-12 md:py-20 bg-[#f8fafc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-extrabold text-[#0284c7] uppercase tracking-wider bg-[#0284c7]/10 px-3.5 py-1.5 rounded-full border border-[#0284c7]/20">
            {currentLang === 'en' ? 'Life at BYOM' : 'BYOM का गतिविधिहरू'}
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#0f172a] font-heading tracking-tight">
            {t.headerTitle[currentLang]}
          </h1>
          <p className="text-base text-[#64748b] leading-relaxed">
            {t.headerSub[currentLang]}
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                activeFilter === tab.id
                  ? 'bg-[#0284c7] text-white shadow-md shadow-sky-500/20'
                  : 'bg-white text-[#475569] border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Responsive Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <motion.div
              layout
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={() => setSelectedMedia(item)}
              className="group relative bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all cursor-pointer h-72"
            >
              <img
                src={item.image}
                alt={item.title[currentLang]}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#080e1a]/90 via-[#080e1a]/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

              {/* Video Badge */}
              {item.videoUrl && (
                <div className="absolute top-4 right-4 bg-red-600 text-white p-2 rounded-full shadow-md">
                  <Play className="w-4 h-4 fill-current" />
                </div>
              )}

              {/* Caption Bottom Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white space-y-1">
                <div className="flex items-center gap-1.5 text-[11px] text-amber-300 font-bold">
                  <Calendar className="w-3 h-3" />
                  <span>{item.date}</span>
                </div>
                <h3 className="text-base font-bold font-heading line-clamp-1">
                  {item.title[currentLang]}
                </h3>
              </div>

              {/* Hover Zoom Icon */}
              <div className="absolute top-4 left-4 w-9 h-9 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <ZoomIn className="w-4 h-4" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox Preview Modal */}
        <AnimatePresence>
          {selectedMedia && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="relative bg-white max-w-4xl w-full rounded-3xl overflow-hidden shadow-2xl space-y-4"
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedMedia(null)}
                  className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-black"
                >
                  <X className="w-6 h-6" />
                </button>

                {selectedMedia.videoUrl ? (
                  <div className="aspect-video w-full bg-black">
                    <iframe
                      src={selectedMedia.videoUrl}
                      title={selectedMedia.title[currentLang]}
                      className="w-full h-full border-0"
                      allowFullScreen
                    />
                  </div>
                ) : (
                  <div className="max-h-[70vh] overflow-hidden bg-black flex items-center justify-center">
                    <img
                      src={selectedMedia.image}
                      alt={selectedMedia.title[currentLang]}
                      className="w-full h-full object-contain"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                )}

                <div className="p-6 bg-white flex items-center justify-between border-t border-slate-200">
                  <div>
                    <span className="text-xs font-bold text-[#0284c7] uppercase">
                      {selectedMedia.category}
                    </span>
                    <h3 className="text-xl font-bold text-[#0f172a] font-heading mt-0.5">
                      {selectedMedia.title[currentLang]}
                    </h3>
                  </div>
                  <span className="text-xs font-semibold text-[#64748b]">
                    {selectedMedia.date}
                  </span>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};

