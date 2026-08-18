'use client';

import React, { useState } from 'react';
import { Language, BlogPost } from '../types';
import { translations } from '../data/translations';
import { blogPosts } from '../data/content';
import { Search, Clock, ArrowRight, BookOpen, X, Mail, Sparkles, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface BlogPageProps {
  currentLang: Language;
}

export const BlogPage: React.FC<BlogPageProps> = ({ currentLang }) => {
  const t = translations.blog;

  const [posts, setPosts] = useState<BlogPost[]>(blogPosts);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState<'all' | string>('all');
  const [activeArticle, setActiveArticle] = useState<BlogPost | null>(null);

  // Newsletter
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  React.useEffect(() => {
    async function loadDynamicBlogs() {
      try {
        const res = await fetch('/api/blogs');
        const data = await res.json();
        if (res.ok && data.blogs && data.blogs.length > 0) {
          setPosts(data.blogs);
        }
      } catch (err) {
        console.error('Failed to load dynamic blogs:', err);
      }
    }
    loadDynamicBlogs();
  }, []);

  const topics = [
    { id: 'all', label: t.allTopics[currentLang] },
    { id: 'digital-marketing', label: { en: 'Digital Marketing', np: 'डिजिटल मार्केटिङ' }[currentLang] },
    { id: 'facebook-ads', label: { en: 'Facebook Ads', np: 'फेसबुक विज्ञापन' }[currentLang] },
    { id: 'ai-tools', label: { en: 'AI Tools', np: 'एआई उपकरण' }[currentLang] },
    { id: 'branding', label: { en: 'Branding', np: 'ब्रान्डिङ' }[currentLang] },
  ];

  const featuredPost = posts.find((p) => p.featured) || posts[0];

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title[currentLang].toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.summary[currentLang].toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTopic = selectedTopic === 'all' || post.categorySlug === selectedTopic;
    return matchesSearch && matchesTopic;
  });

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) setSubscribed(true);
  };

  return (
    <div className="py-12 md:py-20 bg-[#f8fafc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-extrabold text-[#0284c7] uppercase tracking-wider bg-[#0284c7]/10 px-3.5 py-1.5 rounded-full border border-[#0284c7]/20">
            {currentLang === 'en' ? 'Knowledge Base' : 'ज्ञान भण्डार'}
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#0f172a] font-heading tracking-tight">
            {t.headerTitle[currentLang]}
          </h1>
          <p className="text-base text-[#64748b] leading-relaxed">
            {t.headerSub[currentLang]}
          </p>
        </div>

        {/* Featured Article Card */}
        {featuredPost && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-7 p-8 sm:p-12 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0b132b] text-amber-200 text-xs font-extrabold uppercase">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{t.featuredBadge[currentLang]}</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0f172a] font-heading leading-tight">
                  {featuredPost.title[currentLang]}
                </h2>

                <p className="text-sm sm:text-base text-[#475569] leading-relaxed line-clamp-3">
                  {featuredPost.summary[currentLang]}
                </p>
              </div>

              <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-[#0284c7] text-white font-bold text-sm flex items-center justify-center shadow-sm">
                    {featuredPost.author.avatar}
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-[#0f172a]">
                      {featuredPost.author.name}
                    </span>
                    <span className="text-[11px] text-[#64748b]">
                      {featuredPost.date} • {featuredPost.readTime}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setActiveArticle(featuredPost)}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#ff6b00] to-[#f97316] hover:from-[#ea580c] hover:to-[#ea580c] text-white text-xs font-extrabold btn-orange-hover flex items-center gap-2 shadow-md shadow-orange-500/20 transition-all"
                >
                  <span>{t.readMore[currentLang]}</span>
                  <ArrowRight className="w-4 h-4 text-amber-200" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 relative min-h-[300px]">
              <img
                src={featuredPost.image}
                alt={featuredPost.title[currentLang]}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        )}

        {/* Search & Topic Filters */}
        <div className="space-y-6 pt-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.searchPlaceholder[currentLang]}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-semibold outline-none focus:border-[#0284c7] focus:ring-2 focus:ring-[#0284c7]/20 transition-all"
              />
            </div>

            {/* Topic Filter Pills */}
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              {topics.map((topic) => (
                <button
                  key={topic.id}
                  onClick={() => setSelectedTopic(topic.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    selectedTopic === topic.id
                      ? 'bg-[#0284c7] text-white shadow-md shadow-sky-500/20'
                      : 'bg-white text-[#475569] border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {topic.label}
                </button>
              ))}
            </div>
          </div>

          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all card-hover overflow-hidden flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="h-48 overflow-hidden bg-slate-100 relative">
                    <img
                      src={post.image}
                      alt={post.title[currentLang]}
                      className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute top-3 left-3 bg-[#080e1a]/90 text-white text-[10px] font-bold px-3 py-1 rounded-full backdrop-blur-sm">
                      {post.category[currentLang]}
                    </span>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-2 text-xs text-[#64748b] font-semibold">
                      <Clock className="w-3.5 h-3.5 text-[#0284c7]" />
                      <span>{post.readTime}</span>
                      <span>•</span>
                      <span>{post.date}</span>
                    </div>

                    <h3 className="text-lg font-bold text-[#0f172a] font-heading leading-snug">
                      {post.title[currentLang]}
                    </h3>

                    <p className="text-xs text-[#475569] line-clamp-2 leading-relaxed">
                      {post.summary[currentLang]}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-slate-100 mt-4 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-7 h-7 rounded-full bg-[#0284c7] text-white font-bold text-xs flex items-center justify-center">
                      {post.author.avatar}
                    </div>
                    <span className="text-xs font-semibold text-[#0f172a]">{post.author.name}</span>
                  </div>

                  <button
                    onClick={() => setActiveArticle(post)}
                    className="text-xs font-extrabold text-[#0284c7] hover:text-[#0369a1] transition-colors flex items-center gap-1"
                  >
                    <span>{t.readMore[currentLang]}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Newsletter Subscription Box */}
        <div className="bg-gradient-to-br from-[#080e1a] via-[#0b132b] to-[#0284c7] text-white p-8 sm:p-12 rounded-3xl shadow-2xl max-w-4xl mx-auto text-center space-y-6 relative overflow-hidden">
          <div className="w-12 h-12 rounded-2xl bg-white/10 text-amber-200 mx-auto flex items-center justify-center backdrop-blur-sm">
            <Mail className="w-6 h-6" />
          </div>

          <div className="space-y-2 max-w-xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-extrabold font-heading">
              {t.newsletterTitle[currentLang]}
            </h3>
            <p className="text-sm text-slate-300">
              {t.newsletterSub[currentLang]}
            </p>
          </div>

          {!subscribed ? (
            <form onSubmit={handleNewsletter} className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder={t.workEmailPlaceholder[currentLang]}
                className="w-full sm:w-72 px-4 py-3 rounded-xl bg-white text-[#0f172a] font-semibold text-sm outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-[#0284c7]"
              />
              <button
                type="submit"
                className="w-full sm:w-auto px-7 py-3 rounded-xl bg-gradient-to-r from-[#ff6b00] to-[#f97316] hover:from-[#ea580c] hover:to-[#ea580c] text-white font-extrabold text-sm btn-orange-hover flex items-center justify-center gap-2 shadow-lg shadow-orange-500/25 transition-all"
              >
                <span>{t.subscribeBtn[currentLang]}</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <div className="p-4 rounded-2xl bg-white/10 text-amber-200 text-sm font-bold backdrop-blur-sm border border-white/15">
              {currentLang === 'en' ? 'Thank you for subscribing!' : 'सदस्यता लिनुभएकोमा धन्यवाद!'}
            </div>
          )}

          <p className="text-[11px] text-slate-400">{t.noSpamNotice[currentLang]}</p>
        </div>

        {/* Article Reader Modal */}
        <AnimatePresence>
          {activeArticle && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white max-w-3xl w-full rounded-3xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col"
              >
                {/* Modal Top Header */}
                <div className="p-6 border-b border-slate-200 flex items-center justify-between bg-slate-50">
                  <span className="text-xs font-bold text-[#0284c7] uppercase tracking-wider bg-[#0284c7]/10 px-3 py-1 rounded-full border border-[#0284c7]/20">
                    {activeArticle.category[currentLang]}
                  </span>
                  <button
                    onClick={() => setActiveArticle(null)}
                    className="p-2 rounded-xl text-[#0f172a] hover:bg-slate-200/60"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Article Body */}
                <div className="p-8 space-y-6 overflow-y-auto">
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0f172a] font-heading leading-tight">
                    {activeArticle.title[currentLang]}
                  </h2>

                  <div className="flex items-center space-x-3 text-xs text-[#64748b] font-semibold border-b border-slate-100 pb-4">
                    <span>{activeArticle.author.name} ({activeArticle.author.role})</span>
                    <span>•</span>
                    <span>{activeArticle.date}</span>
                    <span>•</span>
                    <span>{activeArticle.readTime}</span>
                  </div>

                  <img
                    src={activeArticle.image}
                    alt={activeArticle.title[currentLang]}
                    className="w-full h-64 sm:h-80 object-cover rounded-2xl"
                    referrerPolicy="no-referrer"
                  />

                  <div className="prose prose-slate max-w-none text-sm sm:text-base text-[#334155] leading-relaxed whitespace-pre-line space-y-4">
                    {activeArticle.content[currentLang]}
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="p-6 border-t border-slate-200 bg-slate-50 flex justify-end">
                  <button
                    onClick={() => setActiveArticle(null)}
                    className="px-6 py-2.5 rounded-xl bg-[#0f172a] hover:bg-[#0284c7] text-white font-bold text-xs transition-colors"
                  >
                    {currentLang === 'en' ? 'Close Reader' : 'बन्द गर्नुहोस्'}
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};

