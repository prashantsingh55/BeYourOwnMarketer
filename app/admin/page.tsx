'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Users,
  CreditCard,
  BookOpen,
  Image as ImageIcon,
  MessageSquare,
  Search,
  Plus,
  Trash2,
  CheckCircle,
  Clock,
  ArrowLeft,
  Upload,
  Sparkles,
  ExternalLink,
  Shield,
  FileText,
  Calendar,
  Save,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<'bookings' | 'sessions' | 'blogs' | 'gallery' | 'contacts'>('bookings');

  // Bookings state
  const [bookings, setBookings] = useState<any[]>([]);
  const [loadingBookings, setLoadingBookings] = useState(true);
  const [searchBooking, setSearchBooking] = useState('');
  const [filterCity, setFilterCity] = useState('all');

  // Blogs state
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loadingBlogs, setLoadingBlogs] = useState(true);
  const [blogFormData, setBlogFormData] = useState({
    titleEn: '',
    titleNp: '',
    categorySlug: 'digital-marketing',
    categoryEn: 'Digital Marketing',
    categoryNp: 'डिजिटल मार्केटिङ',
    summaryEn: '',
    summaryNp: '',
    contentEn: '',
    contentNp: '',
    readTime: '5 min read',
    authorName: 'Anish Sharma',
    authorRole: 'Founder & Lead Trainer',
    image: '',
    featured: false,
  });
  const [publishingBlog, setPublishingBlog] = useState(false);
  const [blogSuccessMsg, setBlogSuccessMsg] = useState('');

  // Gallery state
  const [gallery, setGallery] = useState<any[]>([]);
  const [loadingGallery, setLoadingGallery] = useState(true);
  const [galleryFormData, setGalleryFormData] = useState({
    titleEn: '',
    titleNp: '',
    category: 'workshops',
    image: '',
    aspect: 'landscape',
    videoUrl: '',
  });
  const [postingGallery, setPostingGallery] = useState(false);
  const [gallerySuccessMsg, setGallerySuccessMsg] = useState('');

  // Image Upload state
  const [uploadingImage, setUploadingImage] = useState(false);

  // Sessions state
  const [sessions, setSessions] = useState<any[]>([]);
  const [sessionSaving, setSessionSaving] = useState<string | null>(null);
  const [sessionMsg, setSessionMsg] = useState('');
  const [newSessionForm, setNewSessionForm] = useState({
    startDate: '',
    endDate: '',
    nameEn: '7-Day Marketing Mastery Cohort',
  });

  useEffect(() => {
    fetchBookings();
    fetchBlogs();
    fetchGallery();
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      const res = await fetch('/api/sessions');
      const data = await res.json();
      if (data.sessions) setSessions(data.sessions);
    } catch (err) {
      console.error('Failed to fetch sessions:', err);
    }
  };

  const handleUpdateSession = async (id: string, updates: any) => {
    setSessionSaving(id);
    setSessionMsg('');
    try {
      const res = await fetch(`/api/sessions/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      if (res.ok) {
        setSessionMsg('Session dates updated successfully!');
        fetchSessions();
        setTimeout(() => setSessionMsg(''), 3000);
      }
    } catch (err) {
      console.error('Failed to update session:', err);
    } finally {
      setSessionSaving(null);
    }
  };

  const handleCreateSession = async () => {
    if (!newSessionForm.startDate || !newSessionForm.endDate) {
      alert('Please fill in start and end dates');
      return;
    }
    try {
      const res = await fetch('/api/sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSessionForm),
      });
      if (res.ok) {
        setSessionMsg('New session created!');
        setNewSessionForm({ startDate: '', endDate: '', nameEn: '7-Day Marketing Mastery Cohort' });
        fetchSessions();
        setTimeout(() => setSessionMsg(''), 3000);
      }
    } catch (err) {
      console.error('Failed to create session:', err);
    }
  };

  const handleDeleteSession = async (id: string) => {
    if (!confirm('Deactivate this session?')) return;
    await fetch(`/api/sessions/${id}`, { method: 'DELETE' });
    fetchSessions();
  };

  const fetchBookings = async () => {
    setLoadingBookings(true);
    try {
      const res = await fetch('/api/admin/bookings');
      const data = await res.json();
      if (res.ok) setBookings(data.bookings || []);
    } catch (err) {
      console.error('Failed to fetch bookings:', err);
    } finally {
      setLoadingBookings(false);
    }
  };

  const fetchBlogs = async () => {
    setLoadingBlogs(true);
    try {
      const res = await fetch('/api/blogs');
      const data = await res.json();
      if (res.ok) setBlogs(data.blogs || []);
    } catch (err) {
      console.error('Failed to fetch blogs:', err);
    } finally {
      setLoadingBlogs(false);
    }
  };

  const fetchGallery = async () => {
    setLoadingGallery(true);
    try {
      const res = await fetch('/api/gallery');
      const data = await res.json();
      if (res.ok) setGallery(data.gallery || []);
    } catch (err) {
      console.error('Failed to fetch gallery:', err);
    } finally {
      setLoadingGallery(false);
    }
  };

  const handleImageFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, targetForm: 'blog' | 'gallery') => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.url) {
        if (targetForm === 'blog') {
          setBlogFormData((prev) => ({ ...prev, image: data.url }));
        } else {
          setGalleryFormData((prev) => ({ ...prev, image: data.url }));
        }
      } else {
        alert(data.error || 'Failed to upload image');
      }
    } catch (err) {
      console.error('Image upload failed:', err);
    } finally {
      setUploadingImage(false);
    }
  };

  const handlePublishBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    setPublishingBlog(true);
    setBlogSuccessMsg('');

    try {
      const res = await fetch('/api/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(blogFormData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to publish blog');

      setBlogSuccessMsg('Blog article published successfully!');
      setBlogFormData({
        titleEn: '',
        titleNp: '',
        categorySlug: 'digital-marketing',
        categoryEn: 'Digital Marketing',
        categoryNp: 'डिजिटल मार्केटिङ',
        summaryEn: '',
        summaryNp: '',
        contentEn: '',
        contentNp: '',
        readTime: '5 min read',
        authorName: 'Anish Sharma',
        authorRole: 'Founder & Lead Trainer',
        image: '',
        featured: false,
      });
      fetchBlogs();
    } catch (err: any) {
      alert(err.message || 'Error publishing blog');
    } finally {
      setPublishingBlog(false);
    }
  };

  const handleDeleteBlog = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return;
    try {
      const res = await fetch(`/api/blogs?id=${id}`, { method: 'DELETE' });
      if (res.ok) fetchBlogs();
    } catch (err) {
      console.error('Failed to delete blog:', err);
    }
  };

  const handlePostGallery = async (e: React.FormEvent) => {
    e.preventDefault();
    setPostingGallery(true);
    setGallerySuccessMsg('');

    try {
      const res = await fetch('/api/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(galleryFormData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to post gallery item');

      setGallerySuccessMsg('Gallery item posted successfully!');
      setGalleryFormData({
        titleEn: '',
        titleNp: '',
        category: 'workshops',
        image: '',
        aspect: 'landscape',
        videoUrl: '',
      });
      fetchGallery();
    } catch (err: any) {
      alert(err.message || 'Error posting gallery item');
    } finally {
      setPostingGallery(false);
    }
  };

  const handleDeleteGallery = async (id: string) => {
    if (!confirm('Are you sure you want to delete this gallery item?')) return;
    try {
      const res = await fetch(`/api/gallery?id=${id}`, { method: 'DELETE' });
      if (res.ok) fetchGallery();
    } catch (err) {
      console.error('Failed to delete gallery item:', err);
    }
  };

  // Filtered Bookings
  const filteredBookings = bookings.filter((b) => {
    const matchesSearch =
      b.fullName.toLowerCase().includes(searchBooking.toLowerCase()) ||
      b.phone.includes(searchBooking) ||
      b.email.toLowerCase().includes(searchBooking.toLowerCase()) ||
      b.refId.toLowerCase().includes(searchBooking.toLowerCase());
    const matchesCity = filterCity === 'all' || b.city === filterCity;
    return matchesSearch && matchesCity;
  });

  const totalRevenue = bookings
    .filter((b) => b.paymentStatus === 'completed')
    .reduce((sum, b) => sum + b.amount, 0);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#0f172a]">
      {/* Top Admin Navigation Bar */}
      <header className="bg-[#080e1a] text-white py-4 px-6 sticky top-0 z-40 shadow-lg border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#0284c7] to-[#0369a1] rounded-2xl flex items-center justify-center text-white font-black text-lg shadow-md shadow-sky-500/20">
              B
            </div>
            <div>
              <h1 className="font-extrabold text-lg tracking-tight font-heading">BYOM Admin Portal</h1>
              <p className="text-[11px] text-slate-400">Seat Bookings & Content Management Studio</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-xs font-bold text-slate-300 hover:text-white transition-colors bg-white/10 px-4 py-2 rounded-xl hover:bg-white/15"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Website
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* KPI Overview Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-1">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-bold uppercase tracking-wider">Total Bookings</span>
              <Users className="w-5 h-5 text-[#0284c7]" />
            </div>
            <p className="text-3xl font-extrabold font-heading text-[#0f172a]">{bookings.length}</p>
            <p className="text-xs text-emerald-600 font-semibold">Physical Seat Reservations</p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-1">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-bold uppercase tracking-wider">Total Revenue</span>
              <CreditCard className="w-5 h-5 text-emerald-600" />
            </div>
            <p className="text-3xl font-extrabold font-heading text-[#0f172a]">
              NPR {totalRevenue.toLocaleString()}
            </p>
            <p className="text-xs text-slate-500 font-semibold">Verified Fonepay & Deposits</p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-1">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-bold uppercase tracking-wider">Published Blogs</span>
              <BookOpen className="w-5 h-5 text-[#f97316]" />
            </div>
            <p className="text-3xl font-extrabold font-heading text-[#0f172a]">{blogs.length}</p>
            <p className="text-xs text-[#0284c7] font-semibold">Active Knowledge Base</p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-1">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-bold uppercase tracking-wider">Gallery Media</span>
              <ImageIcon className="w-5 h-5 text-purple-600" />
            </div>
            <p className="text-3xl font-extrabold font-heading text-[#0f172a]">{gallery.length}</p>
            <p className="text-xs text-slate-500 font-semibold">Photos & Videos</p>
          </div>
        </div>

        {/* Tab Selection Navigation */}
        <div className="flex border-b border-slate-200 space-x-4">
          {[
            { id: 'bookings', label: 'Seat Bookings', icon: CreditCard },
            { id: 'sessions', label: 'Upcoming Sessions', icon: Calendar },
            { id: 'blogs', label: 'Blog Studio', icon: BookOpen },
            { id: 'gallery', label: 'Gallery', icon: ImageIcon },
          ].map((tab) => {
            const Icon = tab.icon;
            const isSel = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 pb-3.5 pt-2 text-sm font-extrabold border-b-2 transition-all ${
                  isSel
                    ? 'border-[#0284c7] text-[#0284c7]'
                    : 'border-transparent text-slate-400 hover:text-[#0f172a]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB: UPCOMING SESSIONS — Date Management */}
        {activeTab === 'sessions' && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-8">
            <div className="border-b border-slate-200 pb-4">
              <h2 className="text-2xl font-extrabold text-[#0f172a] font-heading flex items-center gap-2">
                <Calendar className="w-6 h-6 text-[#0284c7]" />
                Upcoming Session Dates
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Update the start and end dates for each cohort — these appear live on the website.
              </p>
            </div>

            {sessionMsg && (
              <div className="bg-[#10b981]/10 border border-[#10b981]/30 text-[#065f46] text-sm font-bold px-4 py-3 rounded-xl flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#10b981]" />
                {sessionMsg}
              </div>
            )}

            {/* Existing Sessions */}
            <div className="space-y-4">
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-500">Active Sessions</h3>
              {sessions.length === 0 ? (
                <p className="text-sm text-slate-400 italic">No sessions found. Create one below.</p>
              ) : (
                sessions.map((s) => {
                  const localStart = s.startDate || '';
                  const localEnd = s.endDate || '';
                  return (
                    <div key={s.id} className="bg-[#f8fafc] border border-slate-200 rounded-3xl p-6 space-y-4 shadow-sm">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="font-extrabold text-[#0f172a] text-sm">{s.nameEn}</p>
                          <p className="text-xs text-[#64748b] mt-0.5">{s.city} · {s.batch}</p>
                        </div>
                        <button
                          onClick={() => handleDeleteSession(s.id)}
                          className="text-rose-400 hover:text-rose-600 p-1.5 rounded-xl hover:bg-rose-50 transition-colors"
                          title="Deactivate session"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <SessionDateEditor
                        session={s}
                        saving={sessionSaving === s.id}
                        onSave={(updates) => handleUpdateSession(s.id, updates)}
                      />
                    </div>
                  );
                })
              )}
            </div>

            {/* Create New Session */}
            <div className="border-t border-slate-200 pt-6 space-y-4">
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-500">Add New Session</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#0f172a] mb-1.5">Session Name</label>
                  <input
                    type="text"
                    value={newSessionForm.nameEn}
                    onChange={(e) => setNewSessionForm((p) => ({ ...p, nameEn: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold outline-none focus:border-[#0284c7] focus:ring-2 focus:ring-[#0284c7]/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#0f172a] mb-1.5">Start Date</label>
                  <input
                    type="date"
                    value={newSessionForm.startDate}
                    onChange={(e) => setNewSessionForm((p) => ({ ...p, startDate: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold outline-none focus:border-[#0284c7] focus:ring-2 focus:ring-[#0284c7]/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#0f172a] mb-1.5">End Date</label>
                  <input
                    type="date"
                    value={newSessionForm.endDate}
                    onChange={(e) => setNewSessionForm((p) => ({ ...p, endDate: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold outline-none focus:border-[#0284c7] focus:ring-2 focus:ring-[#0284c7]/20 transition-all"
                  />
                </div>
              </div>
              <button
                onClick={handleCreateSession}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0f172a] hover:bg-[#0284c7] text-white text-sm font-extrabold transition-colors shadow-sm"
              >
                <Plus className="w-4 h-4" />
                Create Session
              </button>
            </div>
          </div>
        )}

        {/* TAB 1: BOOKINGS & PAYMENTS */}
        {activeTab === 'bookings' && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
              <div>
                <h2 className="text-2xl font-extrabold text-[#0f172a] font-heading">
                  Physical Classroom Bookings
                </h2>
                <p className="text-xs text-[#64748b]">
                  Real-time seat reservations with Fonepay QR deposit verification
                </p>
              </div>

              {/* Filters */}
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={searchBooking}
                    onChange={(e) => setSearchBooking(e.target.value)}
                    placeholder="Search name, phone, ref ID..."
                    className="pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold outline-none focus:border-[#0284c7] focus:ring-2 focus:ring-[#0284c7]/20 transition-all"
                  />
                </div>

                <select
                  value={filterCity}
                  onChange={(e) => setFilterCity(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold outline-none text-[#0f172a] bg-white focus:border-[#0284c7]"
                >
                  <option value="all">All Cities</option>
                  <option value="Kathmandu Hub">Kathmandu Hub</option>
                  <option value="Pokhara Campus">Pokhara Campus</option>
                  <option value="Chitwan Center">Chitwan Center</option>
                  <option value="Butwal Hub">Butwal Hub</option>
                </select>
              </div>
            </div>

            {loadingBookings ? (
              <div className="py-12 text-center text-sm font-semibold text-slate-400">
                Loading seat bookings...
              </div>
            ) : filteredBookings.length === 0 ? (
              <div className="py-12 text-center text-sm text-slate-400">
                No bookings found matching your search.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 text-xs font-bold uppercase text-slate-400">
                      <th className="py-3 px-4">Student Info</th>
                      <th className="py-3 px-4">Campus & Batch</th>
                      <th className="py-3 px-4">Seat ID</th>
                      <th className="py-3 px-4">Amount</th>
                      <th className="py-3 px-4">Payment Method</th>
                      <th className="py-3 px-4">Status & Ref ID</th>
                      <th className="py-3 px-4">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs font-semibold">
                    {filteredBookings.map((b) => (
                      <tr key={b.id} className="hover:bg-slate-50 transition-colors">
                        <td className="py-4 px-4">
                          <div className="font-extrabold text-[#0f172a] text-sm">{b.fullName}</div>
                          <div className="text-[#64748b]">{b.phone}</div>
                          <div className="text-slate-400 text-[11px]">{b.email}</div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="font-bold text-[#0f172a]">{b.city}</div>
                          <div className="text-slate-400 text-[11px] max-w-[150px] truncate">{b.batch}</div>
                        </td>
                        <td className="py-4 px-4 font-mono font-bold text-[#0284c7]">
                          {b.seatNumber}
                        </td>
                        <td className="py-4 px-4 font-extrabold text-[#0f172a]">
                          NPR {b.amount.toLocaleString()}
                        </td>
                        <td className="py-4 px-4">
                          <span className="uppercase font-extrabold text-[11px] px-2.5 py-1 rounded-md bg-slate-100 text-[#0f172a]">
                            {b.paymentMethod}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex flex-col space-y-1">
                            <span
                              className={`inline-flex items-center gap-1 font-extrabold text-[10px] uppercase px-2.5 py-0.5 rounded-full w-max ${
                                b.paymentStatus === 'completed'
                                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                  : 'bg-amber-50 text-amber-700 border border-amber-200'
                              }`}
                            >
                              {b.paymentStatus === 'completed' && <CheckCircle className="w-3 h-3" />}
                              {b.paymentStatus}
                            </span>
                            <span className="font-mono text-[11px] text-[#64748b]">
                              {b.refId}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-slate-400 text-[11px]">
                          {new Date(b.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: BLOG PUBLISHING STUDIO */}
        {activeTab === 'blogs' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Form */}
            <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
              <div className="border-b border-slate-200 pb-4">
                <h2 className="text-2xl font-extrabold text-[#0f172a] font-heading">
                  Publish New Blog Post
                </h2>
                <p className="text-xs text-[#64748b]">
                  Post educational marketing content directly to the knowledge base
                </p>
              </div>

              {blogSuccessMsg && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl text-xs font-bold text-center">
                  {blogSuccessMsg}
                </div>
              )}

              <form onSubmit={handlePublishBlog} className="space-y-4 text-xs font-semibold">
                <div>
                  <label className="block font-bold text-[#0f172a] mb-1">Article Title (English) *</label>
                  <input
                    type="text"
                    required
                    value={blogFormData.titleEn}
                    onChange={(e) => setBlogFormData({ ...blogFormData, titleEn: e.target.value })}
                    placeholder="e.g. Master Meta Ads for Local Business Growth in Nepal"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 outline-none focus:border-[#0284c7] focus:ring-2 focus:ring-[#0284c7]/20 text-sm transition-all"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#0f172a] mb-1">Article Title (Nepali)</label>
                  <input
                    type="text"
                    value={blogFormData.titleNp}
                    onChange={(e) => setBlogFormData({ ...blogFormData, titleNp: e.target.value })}
                    placeholder="उदा: नेपालमा स्थानीय व्यापार प्रवर्द्धनका लागि मेटा विज्ञापन"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 outline-none focus:border-[#0284c7] focus:ring-2 focus:ring-[#0284c7]/20 text-sm transition-all"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-[#0f172a] mb-1">Category</label>
                    <select
                      value={blogFormData.categorySlug}
                      onChange={(e) => {
                        const val = e.target.value;
                        const labelEnMap: Record<string, string> = {
                          'facebook-ads': 'Facebook Ads',
                          'digital-marketing': 'Digital Marketing',
                          'ai-tools': 'AI Tools',
                          branding: 'Branding',
                        };
                        setBlogFormData({
                          ...blogFormData,
                          categorySlug: val,
                          categoryEn: labelEnMap[val] || 'Digital Marketing',
                        });
                      }}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 outline-none text-xs font-bold focus:border-[#0284c7]"
                    >
                      <option value="facebook-ads">Facebook Ads</option>
                      <option value="digital-marketing">Digital Marketing</option>
                      <option value="ai-tools">AI Tools</option>
                      <option value="branding">Branding</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-[#0f172a] mb-1">Read Time</label>
                    <input
                      type="text"
                      value={blogFormData.readTime}
                      onChange={(e) => setBlogFormData({ ...blogFormData, readTime: e.target.value })}
                      placeholder="5 min read"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 outline-none text-xs font-semibold focus:border-[#0284c7]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-[#0f172a] mb-1">Short Summary (English) *</label>
                  <textarea
                    rows={2}
                    required
                    value={blogFormData.summaryEn}
                    onChange={(e) => setBlogFormData({ ...blogFormData, summaryEn: e.target.value })}
                    placeholder="Brief intro preview for article card..."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 outline-none text-xs focus:border-[#0284c7]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#0f172a] mb-1">Full Article Body (English) *</label>
                  <textarea
                    rows={5}
                    required
                    value={blogFormData.contentEn}
                    onChange={(e) => setBlogFormData({ ...blogFormData, contentEn: e.target.value })}
                    placeholder="Write detailed blog article content here..."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 outline-none text-xs focus:border-[#0284c7]"
                  />
                </div>

                {/* Cover Image Upload / URL */}
                <div>
                  <label className="block font-bold text-[#0f172a] mb-1">Cover Image *</label>
                  <div className="space-y-2">
                    <input
                      type="text"
                      required
                      value={blogFormData.image}
                      onChange={(e) => setBlogFormData({ ...blogFormData, image: e.target.value })}
                      placeholder="https://images.unsplash.com/... OR upload file below"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 outline-none text-xs focus:border-[#0284c7]"
                    />
                    <div className="flex items-center gap-2">
                      <label className="cursor-pointer py-2 px-4 bg-slate-100 hover:bg-slate-200 text-[#0f172a] rounded-xl text-xs font-bold flex items-center gap-2 transition-colors">
                        <Upload className="w-3.5 h-3.5" />
                        <span>{uploadingImage ? 'Uploading...' : 'Upload Image File'}</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageFileUpload(e, 'blog')}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={blogFormData.featured}
                    onChange={(e) => setBlogFormData({ ...blogFormData, featured: e.target.checked })}
                    className="w-4 h-4 rounded text-[#0284c7]"
                  />
                  <label htmlFor="featured" className="font-bold text-[#0f172a] text-xs">
                    Mark as Featured Article on Top Banner
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={publishingBlog}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#ff6b00] to-[#f97316] hover:from-[#ea580c] hover:to-[#ea580c] text-white font-extrabold text-sm btn-orange-hover shadow-lg shadow-orange-500/25 transition-all disabled:opacity-50"
                >
                  {publishingBlog ? 'Publishing...' : 'Publish Article'}
                </button>
              </form>
            </div>

            {/* List of Published Blogs */}
            <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-4">
              <h3 className="text-xl font-bold text-[#0f172a] font-heading border-b border-slate-200 pb-3">
                Published Articles ({blogs.length})
              </h3>

              {loadingBlogs ? (
                <div className="py-8 text-center text-xs text-slate-400">Loading blogs...</div>
              ) : (
                <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
                  {blogs.map((blog) => (
                    <div
                      key={blog.id}
                      className="p-4 rounded-2xl border border-slate-200 bg-[#f8fafc] flex items-start justify-between gap-3"
                    >
                      <div className="space-y-1">
                        <span className="text-[10px] font-extrabold uppercase text-[#0284c7] bg-[#0284c7]/10 px-2 py-0.5 rounded-full">
                          {blog.category?.en || 'Blog'}
                        </span>
                        <h4 className="font-bold text-xs text-[#0f172a] line-clamp-2">
                          {blog.title?.en}
                        </h4>
                        <p className="text-[11px] text-slate-400">{blog.date}</p>
                      </div>

                      <button
                        onClick={() => handleDeleteBlog(blog.id)}
                        className="p-2 text-rose-500 hover:bg-rose-50 rounded-xl transition-colors flex-shrink-0"
                        title="Delete blog"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: GALLERY MANAGER */}
        {activeTab === 'gallery' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Form */}
            <div className="lg:col-span-6 bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
              <div className="border-b border-slate-200 pb-4">
                <h2 className="text-2xl font-extrabold text-[#0f172a] font-heading">
                  Post Gallery Image / Video
                </h2>
                <p className="text-xs text-[#64748b]">
                  Add workshop photos, student moments, and training highlights
                </p>
              </div>

              {gallerySuccessMsg && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl text-xs font-bold text-center">
                  {gallerySuccessMsg}
                </div>
              )}

              <form onSubmit={handlePostGallery} className="space-y-4 text-xs font-semibold">
                <div>
                  <label className="block font-bold text-[#0f172a] mb-1">Title (English) *</label>
                  <input
                    type="text"
                    required
                    value={galleryFormData.titleEn}
                    onChange={(e) => setGalleryFormData({ ...galleryFormData, titleEn: e.target.value })}
                    placeholder="e.g. Kathmandu Intensive Ad Workshop 2026"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 outline-none focus:border-[#0284c7] focus:ring-2 focus:ring-[#0284c7]/20 text-sm transition-all"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-[#0f172a] mb-1">Category</label>
                    <select
                      value={galleryFormData.category}
                      onChange={(e) => setGalleryFormData({ ...galleryFormData, category: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 outline-none text-xs font-bold focus:border-[#0284c7]"
                    >
                      <option value="workshops">Workshops</option>
                      <option value="training">Training</option>
                      <option value="events">Events</option>
                      <option value="students">Students</option>
                      <option value="videos">Videos</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-[#0f172a] mb-1">Aspect Ratio</label>
                    <select
                      value={galleryFormData.aspect}
                      onChange={(e) => setGalleryFormData({ ...galleryFormData, aspect: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 outline-none text-xs font-bold focus:border-[#0284c7]"
                    >
                      <option value="landscape">Landscape</option>
                      <option value="portrait">Portrait</option>
                      <option value="square">Square</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-[#0f172a] mb-1">Image URL / File *</label>
                  <div className="space-y-2">
                    <input
                      type="text"
                      required
                      value={galleryFormData.image}
                      onChange={(e) => setGalleryFormData({ ...galleryFormData, image: e.target.value })}
                      placeholder="https://images.unsplash.com/... OR upload file"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 outline-none text-xs focus:border-[#0284c7]"
                    />
                    <label className="cursor-pointer py-2 px-4 bg-slate-100 hover:bg-slate-200 text-[#0f172a] rounded-xl text-xs font-bold flex items-center gap-2 w-max transition-colors">
                      <Upload className="w-3.5 h-3.5" />
                      <span>{uploadingImage ? 'Uploading...' : 'Upload Image File'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageFileUpload(e, 'gallery')}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={postingGallery}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#ff6b00] to-[#f97316] hover:from-[#ea580c] hover:to-[#ea580c] text-white font-extrabold text-sm btn-orange-hover shadow-lg shadow-orange-500/25 transition-all disabled:opacity-50"
                >
                  {postingGallery ? 'Posting...' : 'Post Gallery Item'}
                </button>
              </form>
            </div>

            {/* List of Gallery Items */}
            <div className="lg:col-span-6 bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-4">
              <h3 className="text-xl font-bold text-[#0f172a] font-heading border-b border-slate-200 pb-3">
                Current Gallery ({gallery.length})
              </h3>

              {loadingGallery ? (
                <div className="py-8 text-center text-xs text-slate-400">Loading gallery...</div>
              ) : (
                <div className="grid grid-cols-2 gap-4 max-h-[600px] overflow-y-auto pr-1">
                  {gallery.map((item) => (
                    <div
                      key={item.id}
                      className="relative group rounded-2xl overflow-hidden border border-slate-200 bg-slate-100"
                    >
                      <img
                        src={item.image}
                        alt={item.title?.en}
                        className="w-full h-36 object-cover"
                      />
                      <div className="p-3 bg-white">
                        <h4 className="font-bold text-xs text-[#0f172a] truncate">{item.title?.en}</h4>
                        <span className="text-[10px] font-bold text-slate-400 uppercase">{item.category}</span>
                      </div>

                      <button
                        onClick={() => handleDeleteGallery(item.id)}
                        className="absolute top-2 right-2 p-2 bg-rose-600 text-white rounded-xl shadow-lg opacity-90 hover:opacity-100 transition-opacity"
                        title="Delete image"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* SessionDateEditor — inline sub-component for editing session dates  */
/* ------------------------------------------------------------------ */
function SessionDateEditor({
  session,
  saving,
  onSave,
}: {
  session: any;
  saving: boolean;
  onSave: (updates: { startDate: string; endDate: string; nameEn: string }) => void;
}) {
  const [localStart, setLocalStart] = React.useState(session.startDate || '');
  const [localEnd, setLocalEnd] = React.useState(session.endDate || '');
  const [localName, setLocalName] = React.useState(session.nameEn || '');

  // Sync local state when parent re-fetches and passes new session props
  React.useEffect(() => {
    setLocalStart(session.startDate || '');
    setLocalEnd(session.endDate || '');
    setLocalName(session.nameEn || '');
  }, [session.startDate, session.endDate, session.nameEn]);

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div>
          <label className="block text-xs font-bold text-[#0f172a] mb-1">Cohort Name</label>
          <input
            type="text"
            value={localName}
            onChange={(e) => setLocalName(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold outline-none focus:border-[#0284c7] focus:ring-2 focus:ring-[#0284c7]/20 transition-all"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-[#0f172a] mb-1">Start Date</label>
          <input
            type="date"
            value={localStart}
            onChange={(e) => setLocalStart(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold outline-none focus:border-[#0284c7] focus:ring-2 focus:ring-[#0284c7]/20 transition-all"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-[#0f172a] mb-1">End Date</label>
          <input
            type="date"
            value={localEnd}
            onChange={(e) => setLocalEnd(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold outline-none focus:border-[#0284c7] focus:ring-2 focus:ring-[#0284c7]/20 transition-all"
          />
        </div>
      </div>
      <button
        disabled={saving}
        onClick={() => onSave({ startDate: localStart, endDate: localEnd, nameEn: localName })}
        className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-extrabold transition-colors disabled:opacity-50 shadow-sm"
      >
        <Save className="w-3.5 h-3.5" />
        {saving ? 'Saving…' : 'Save Changes'}
      </button>
    </div>
  );
}

