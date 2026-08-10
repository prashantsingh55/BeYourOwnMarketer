import React, { useState, useEffect } from 'react';
import { Language, PageRoute, OnlineCourse } from './types';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { BentoGrid } from './components/BentoGrid';
import { ProgramsPage } from './components/ProgramsPage';
import { SeatBooking } from './components/SeatBooking';
import { ContactPage } from './components/ContactPage';
import { BlogPage } from './components/BlogPage';
import { GalleryPage } from './components/GalleryPage';
import { AuthModal } from './components/AuthModal';
import { MentorModal } from './components/MentorModal';
import { Footer } from './components/Footer';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, Star, Quote } from 'lucide-react';

export function App() {
  const [currentLang, setCurrentLang] = useState<Language>('en');
  const [currentPage, setCurrentPage] = useState<PageRoute>('home');
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [mentorModalOpen, setMentorModalOpen] = useState(false);

  // Sync lang attribute on HTML root tag for Nepali font line-height adjustments
  useEffect(() => {
    document.documentElement.lang = currentLang;
  }, [currentLang]);

  const handleNavigate = (page: PageRoute) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCourseEnroll = (course: OnlineCourse) => {
    // Jump to book seat or trigger auth
    setCurrentPage('book');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fcf9f8] text-[#1b1c1c] font-sans antialiased selection:bg-[#265cb3] selection:text-white">
      
      {/* Top Glass Navigation Bar */}
      <Navbar
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenAuth={() => setAuthModalOpen(true)}
      />

      {/* Main View Router */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          
          {/* HOME PAGE */}
          {currentPage === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <HeroSection
                currentLang={currentLang}
                onNavigate={handleNavigate}
              />

              <BentoGrid
                currentLang={currentLang}
                onNavigate={handleNavigate}
              />

              {/* Success Stories Teaser Section */}
              <section className="py-16 bg-[#f4eee9] border-y border-[#e2dedc]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
                  <div className="text-center max-w-2xl mx-auto space-y-3">
                    <span className="text-xs font-bold text-[#ac7859] uppercase tracking-wider bg-[#f6b996]/30 px-3 py-1 rounded-full border border-[#ac7859]/30">
                      {currentLang === 'en' ? 'Alumni Impact' : 'विद्यार्थी सफलता'}
                    </span>
                    <h2 className="text-3xl font-extrabold text-[#091b3b] font-heading">
                      {currentLang === 'en'
                        ? 'Hear From Our Graduates Across Nepal'
                        : 'नेपालभरका हाम्रा स्नातकहरूको भनाइ'}
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      {
                        name: 'Sujata Gurung',
                        role: 'E-commerce Owner, Pokhara',
                        text: {
                          en: 'The 7-day program gave me the confidence to handle Meta Ads myself. Our online store sales grew 3x in just 2 months!',
                          np: '७-दिने कार्यक्रमले मलाई आफै मेटा विज्ञापन व्यवस्थापन गर्ने आत्मविश्वास दियो। २ महिनामै हाम्रो बिक्री ३ गुणाले बढ्यो!',
                        },
                        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
                      },
                      {
                        name: 'Bibek Karki',
                        role: 'Freelance Content Creator, Kathmandu',
                        text: {
                          en: 'CapCut editing techniques and Nepali copywriting hooks changed everything. I landed 4 monthly retainer clients.',
                          np: 'क्यापकट सम्पादन विधि र नेपाली हुक लेखनले ठूलो सहयोग गर्‍यो। मैले ४ वटा नयाँ क्लाइन्ट प्राप्त गरेँ।',
                        },
                        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80',
                      },
                      {
                        name: 'Prajwal Bhattarai',
                        role: 'Restaurant Founder, Chitwan',
                        text: {
                          en: 'No more wasting money on agencies. BYOM taught us exact targeting for local dining offers.',
                          np: 'एजेन्सीहरूमा पैसा खेर फाल्न छाडियो। BYOM ले हामीलाई स्थानीय रेस्टुरेन्ट अफरहरू लक्षित गर्ने सटीक तरिका सिकाएको छ।',
                        },
                        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
                      },
                    ].map((story, idx) => (
                      <div
                        key={idx}
                        className="bg-white p-6 rounded-2xl border border-[#e2dedc] shadow-sm space-y-4 flex flex-col justify-between"
                      >
                        <div className="space-y-3">
                          <div className="flex items-center space-x-1 text-[#f59e0b]">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-current" />
                            ))}
                          </div>
                          <Quote className="w-8 h-8 text-[#f6b996] opacity-60" />
                          <p className="text-xs sm:text-sm text-[#3c3e44] leading-relaxed italic">
                            "{story.text[currentLang]}"
                          </p>
                        </div>

                        <div className="flex items-center space-x-3 pt-4 border-t border-[#e2dedc]">
                          <img
                            src={story.avatar}
                            alt={story.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div>
                            <span className="block font-bold text-xs text-[#091b3b]">
                              {story.name}
                            </span>
                            <span className="text-[11px] text-[#5c5d63]">
                              {story.role}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Bottom CTA Section */}
              <section className="py-16 bg-[#091b3b] text-white text-center">
                <div className="max-w-4xl mx-auto px-4 space-y-6">
                  <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-[#f6b996] text-xs font-bold uppercase">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{currentLang === 'en' ? 'Limited Capacity' : 'सीमित स्थान'}</span>
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-extrabold font-heading">
                    {currentLang === 'en'
                      ? 'Ready to Become Your Own Marketer?'
                      : 'के तपाईं आफैँ मार्केटर बन्न तयार हुनुहुन्छ?'}
                  </h2>
                  <p className="text-sm sm:text-base text-[#c5c6cf] max-w-xl mx-auto">
                    {currentLang === 'en'
                      ? 'Reserve your seat for the upcoming 7-day physical cohort in Kathmandu.'
                      : 'काठमाडौँमा हुने आगामी ७-दिने भौतिक टोलीका लागि आफ्नो सिट सुरक्षित गर्नुहोस्।'}
                  </p>
                  <button
                    onClick={() => handleNavigate('book')}
                    className="px-8 py-4 rounded-xl bg-[#f6b996] text-[#321300] font-extrabold text-base btn-hover shadow-lg inline-flex items-center gap-2"
                  >
                    <span>{currentLang === 'en' ? 'Book Your Spot Now' : 'अहिले सिट सुरक्षित गर्नुहोस्'}</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </section>
            </motion.div>
          )}

          {/* PROGRAMS PAGE */}
          {currentPage === 'programs' && (
            <motion.div
              key="programs"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ProgramsPage
                currentLang={currentLang}
                onNavigate={handleNavigate}
                onSelectCourseEnroll={handleSelectCourseEnroll}
              />
            </motion.div>
          )}

          {/* SEAT BOOKING PAGE */}
          {currentPage === 'book' && (
            <motion.div
              key="book"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <SeatBooking currentLang={currentLang} />
            </motion.div>
          )}

          {/* CONTACT PAGE */}
          {currentPage === 'contact' && (
            <motion.div
              key="contact"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ContactPage
                currentLang={currentLang}
                onOpenMentorModal={() => setMentorModalOpen(true)}
              />
            </motion.div>
          )}

          {/* BLOG PAGE */}
          {currentPage === 'blog' && (
            <motion.div
              key="blog"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <BlogPage currentLang={currentLang} />
            </motion.div>
          )}

          {/* GALLERY PAGE */}
          {currentPage === 'gallery' && (
            <motion.div
              key="gallery"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <GalleryPage currentLang={currentLang} />
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* Footer */}
      <Footer
        currentLang={currentLang}
        onNavigate={handleNavigate}
        onLanguageChange={setCurrentLang}
      />

      {/* Modals */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        currentLang={currentLang}
      />

      <MentorModal
        isOpen={mentorModalOpen}
        onClose={() => setMentorModalOpen(false)}
        currentLang={currentLang}
      />

    </div>
  );
}

export default App;
