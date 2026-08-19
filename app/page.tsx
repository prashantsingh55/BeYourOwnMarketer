'use client';

import React, { useState, useEffect } from 'react';
import { Language, PageRoute, OnlineCourse } from '@/src/types';
import { Navbar } from '@/src/components/Navbar';
import { HeroSection } from '@/src/components/HeroSection';
import { BentoGrid } from '@/src/components/BentoGrid';
import { ProgramsPage } from '@/src/components/ProgramsPage';
import { SeatBooking } from '@/src/components/SeatBooking';
import { ContactPage } from '@/src/components/ContactPage';
import { BlogPage } from '@/src/components/BlogPage';
import { GalleryPage } from '@/src/components/GalleryPage';
import { AuthModal } from '@/src/components/AuthModal';
import { MentorModal } from '@/src/components/MentorModal';
import { UserDashboard } from '@/src/components/UserDashboard';
import { FloatingSocials } from '@/src/components/FloatingSocials';
import { Footer } from '@/src/components/Footer';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, Star, Quote } from 'lucide-react';

// User type for auth state
type AuthUser = { id: string; name: string; email: string; avatar?: string | null; role: string } | null;

export default function Home() {
  const [currentLang, setCurrentLang] = useState<Language>('en');
  const [currentPage, setCurrentPage] = useState<PageRoute>('home');
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [mentorModalOpen, setMentorModalOpen] = useState(false);
  const [authUser, setAuthUser] = useState<AuthUser>(null);

  // Sync lang attribute on HTML root tag for Nepali font line-height adjustments
  useEffect(() => {
    document.documentElement.lang = currentLang;
  }, [currentLang]);

  // Persistent auth check — runs on every page mount/refresh
  // The JWT httpOnly cookie persists across browser refreshes (7-day expiry)
  useEffect(() => {
    fetch('/api/auth/me')
      .then(r => r.json())
      .then(d => { if (d.user) setAuthUser(d.user); })
      .catch(() => {});
  }, []);

  // Handle Google OAuth redirect result (?google_login=success or ?auth_error=...)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const googleLogin = params.get('google_login');
    const authError = params.get('auth_error');

    if (googleLogin === 'success') {
      fetch('/api/auth/me')
        .then(r => r.json())
        .then(d => {
          if (d.user) {
            setAuthUser(d.user);
            setCurrentPage('dashboard' as PageRoute);
          }
        })
        .catch(() => {});
      window.history.replaceState({}, '', '/');
    }

    if (authError) {
      const redirectUri = params.get('uri');
      const messages: Record<string, string> = {
        google_denied: 'Google sign-in was cancelled.',
        google_not_configured: 'Google OAuth credentials are not set up yet.\nPlease add GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET to your .env file.',
        google_failed: 'Google sign-in failed. Please check the server console for details.',
        google_no_email: 'Could not retrieve your email from Google. Please try another method.',
        google_redirect_mismatch: `Google OAuth: Redirect URI mismatch.\n\nPlease add this exact URI to your Google Cloud Console:\n${redirectUri || 'http://localhost:3000/api/auth/google/callback'}\n\nGo to: console.cloud.google.com → APIs & Services → Credentials → OAuth Client → Authorized redirect URIs`,
      };
      alert(messages[authError] || 'Authentication error. Please try again.');
      window.history.replaceState({}, '', '/');
    }
  }, []);

  const handleNavigate = (page: PageRoute) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCourseEnroll = (course: OnlineCourse) => {
    setCurrentPage('book');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoginSuccess = () => {
    // Re-fetch user data after login to get full profile incl. avatar
    fetch('/api/auth/me')
      .then(r => r.json())
      .then(d => { if (d.user) setAuthUser(d.user); })
      .catch(() => {});
    setAuthModalOpen(false);
    setCurrentPage('dashboard' as PageRoute);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fcf9f8] text-[#1b1c1c] font-sans antialiased selection:bg-[#265cb3] selection:text-white">
      
      {/* Top Navigation Bar */}
      <Navbar
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenAuth={() => setAuthModalOpen(true)}
        authUser={authUser}
        onLogout={() => { setAuthUser(null); setCurrentPage('home'); }}
      />

      {/* Sticky WhatsApp Button */}
      <a
        href="https://wa.me/9779808193078"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] rounded-full shadow-2xl flex items-center justify-center hover:bg-[#1db955] hover:scale-110 transition-all duration-200"
      >
        <svg viewBox="0 0 24 24" fill="white" className="w-7 h-7">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>

      {/* Floating Social Media Links on Right Edge */}
      <FloatingSocials />

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

              {/* Testimonials Section */}
              <section className="py-20 bg-gradient-to-b from-[#f8fafc] via-[#f0f9ff]/30 to-[#f8fafc] border-y border-slate-200/80">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                  <div className="text-center max-w-2xl mx-auto space-y-3">
                    <span className="text-xs font-extrabold text-[#ea580c] uppercase tracking-wider bg-[#fff7ed] px-3.5 py-1.5 rounded-full border border-[#fed7aa] shadow-sm">
                      {currentLang === 'en' ? '★ Real Student Stories' : '★ वास्तविक विद्यार्थीका अनुभव'}
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f172a] font-heading">
                      {currentLang === 'en'
                        ? 'What Our Graduates Say'
                        : 'हाम्रा स्नातकहरूको भनाइ'}
                    </h2>
                    <p className="text-sm text-[#64748b] max-w-xl mx-auto">
                      {currentLang === 'en'
                        ? 'Over 200+ entrepreneurs and professionals have transformed their marketing with BYOM.'
                        : '२०० भन्दा बढी उद्यमी र व्यवसायीहरूले BYOM मार्फत आफ्नो मार्केटिङ रूपान्तरण गरेका छन्।'}
                    </p>
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
                        stars: 5,
                      },
                      {
                        name: 'Bibek Karki',
                        role: 'Freelance Content Creator, Kathmandu',
                        text: {
                          en: 'CapCut editing techniques and Nepali copywriting hooks changed everything. I landed 4 monthly retainer clients.',
                          np: 'क्यापकट सम्पादन विधि र नेपाली हुक लेखनले ठूलो सहयोग गर्यो। मैले ४ वटा नयाँ क्लाइन्ट प्राप्त गरें।',
                        },
                        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80',
                        stars: 5,
                      },
                      {
                        name: 'Prajwal Bhattarai',
                        role: 'Restaurant Founder, Chitwan',
                        text: {
                          en: 'No more wasting money on agencies. BYOM taught us exact targeting for local dining offers.',
                          np: 'एजेन्सीहरूमा पैसा खेर फाल्न छाडियो। BYOM ले हामीलाई स्थानीय रेस्टुरेन्ट अफरहरू लक्षित गर्ने सटीक तरिका सिकाएको छ।',
                        },
                        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
                        stars: 5,
                      },
                      {
                        name: 'Asha Tamang',
                        role: 'Boutique Owner, Lalitpur',
                        text: {
                          en: 'I never knew I could run ads myself. After BYOM, I now manage all my Facebook campaigns and cut agency costs by 100%!',
                          np: 'मलाई थाहा थिएन म आफैं विज्ञापन चलाउन सक्छु। BYOM पछि म आफ्ना सबै फेसबुक क्याम्पेन व्यवस्थापन गर्छु।',
                        },
                        avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=200&q=80',
                        stars: 5,
                      },
                      {
                        name: 'Rajan Maharjan',
                        role: 'Tour Operator, Thamel',
                        text: {
                          en: 'BYOM connected me with other Nepal entrepreneurs. The 7 days were intense but the ROI was 10x within months.',
                          np: 'BYOM ले मलाई अन्य नेपाली उद्यमीहरूसँग जोड्यो। ७ दिन गहन थिए तर महिनाभित्रै लगानीको १० गुणा फिर्ता पाएँ।',
                        },
                        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
                        stars: 5,
                      },
                      {
                        name: 'Manisha Lama',
                        role: 'Beauty Salon Owner, Bhaktapur',
                        text: {
                          en: 'Before BYOM, I had zero followers. Now I have 8K+ on Instagram and my appointment slots are fully booked every week.',
                          np: 'BYOM अघि मसँग शून्य फलोअर थिए। अब इन्स्टाग्राममा ८K+ छन् र हरेक हप्ता मेरो अपोइन्टमेन्ट स्लट पूर्ण भरिन्छ।',
                        },
                        avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=200&q=80',
                        stars: 5,
                      },
                    ].map((story, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.08 }}
                        viewport={{ once: true }}
                        className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/80 shadow-sm space-y-4 flex flex-col justify-between hover:shadow-lg transition-all"
                      >
                        <div className="space-y-3">
                          <div className="flex items-center space-x-1 text-amber-400">
                            {[...Array(story.stars)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-current" />
                            ))}
                          </div>
                          <Quote className="w-7 h-7 text-[#f97316]/40" />
                          <p className="text-xs sm:text-sm text-[#334155] leading-relaxed italic">
                            "{story.text[currentLang]}"
                          </p>
                        </div>

                        <div className="flex items-center space-x-3 pt-4 border-t border-slate-100">
                          <img
                            src={story.avatar}
                            alt={story.name}
                            className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-100"
                          />
                          <div>
                            <span className="block font-bold text-xs text-[#0f172a]">
                              {story.name}
                            </span>
                            <span className="text-[11px] text-[#64748b]">
                              {story.role}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Modern CTA Card sitting cleanly above the footer with proper spacing */}
              <section className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
                <div className="bg-gradient-to-br from-[#101b35] via-[#0b132b] to-[#080e1a] rounded-3xl sm:rounded-[36px] border border-white/15 p-8 sm:p-14 text-white text-center shadow-2xl shadow-slate-950/40 relative overflow-hidden">
                  
                  {/* Ambient glowing background orbs */}
                  <div className="absolute top-0 right-1/4 w-80 h-80 bg-[#2D9EDE]/15 rounded-full blur-3xl pointer-events-none" />
                  <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-[#EF7B3A]/10 rounded-full blur-3xl pointer-events-none" />
                  
                  <div className="max-w-3xl mx-auto space-y-6 relative z-10">
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-amber-200 text-xs font-extrabold uppercase tracking-wide backdrop-blur-md border border-white/15 shadow-sm">
                      <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                      <span>{currentLang === 'en' ? 'Limited Capacity • Only 25 Seats' : 'सीमित स्थान • केवल २५ सिट'}</span>
                    </span>
                    
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading tracking-tight text-white">
                      {currentLang === 'en'
                        ? 'Ready to Become Your Own Marketer?'
                        : 'के तपाईं आफैँ मार्केटर बन्न तयार हुनुहुन्छ?'}
                    </h2>
                    
                    <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
                      {currentLang === 'en'
                        ? 'Reserve your seat for the upcoming 7-day physical cohort in Kathmandu.'
                        : 'काठमाडौँमा हुने आगामी ७-दिने भौतिक टोलीका लागि आफ्नो सिट सुरक्षित गर्नुहोस्।'}
                    </p>
                    
                    <div className="pt-2">
                      <button
                        onClick={() => handleNavigate('book')}
                        className="px-9 py-4 rounded-full bg-gradient-to-r from-[#EF7B3A] to-[#e06a29] hover:from-[#e06a29] hover:to-[#d0591b] text-white font-black text-sm uppercase tracking-wider shadow-xl shadow-[#EF7B3A]/30 inline-flex items-center gap-2.5 transition-all hover:scale-105 active:scale-95"
                      >
                        <span>{currentLang === 'en' ? 'Book Your Spot Now' : 'अहिले सिट सुरक्षित गर्नुहोस्'}</span>
                        <ArrowRight className="w-4 h-4 text-amber-100" />
                      </button>
                    </div>
                  </div>
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
              <SeatBooking
                currentLang={currentLang}
                onNavigate={handleNavigate}
                onBookingSuccess={(user) => {
                  setAuthUser(user);
                }}
              />
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

          {/* STUDENT DASHBOARD / USER PORTAL */}
          {currentPage === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <UserDashboard
                currentLang={currentLang}
                onLogout={() => {
                  setAuthUser(null);
                  handleNavigate('home');
                }}
                onNavigate={handleNavigate}
              />
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
        onLoginSuccess={handleLoginSuccess}
      />

      <MentorModal
        isOpen={mentorModalOpen}
        onClose={() => setMentorModalOpen(false)}
        currentLang={currentLang}
      />

    </div>
  );
}
