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
    <div className="min-h-screen bg-[#091b3b]/5 text-[#091b3b]">
      {/* Top Admin Navigation Bar */}
      <header className="bg-[#091b3b] text-white py-4 px-6 sticky top-0 z-40 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#265cb3] rounded-xl flex items-center justify-center text-white font-black text-lg">
              B
            </div>
            <div>
              <h1 className="font-extrabold text-lg tracking-tight font-heading">BYOM Admin Portal</h1>
              <p className="text-[11px] text-[#8e8f99]">Seat Bookings & Content Management Studio</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-xs font-bold text-[#c5c6cf] hover:text-white transition-colors bg-white/10 px-3.5 py-2 rounded-xl"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Website
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* KPI Overview Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-3xl border border-[#e2dedc] shadow-sm space-y-1">
            <div className="flex items-center justify-between text-[#8e8f99]">
              <span className="text-xs font-bold uppercase tracking-wider">Total Bookings</span>
              <Users className="w-5 h-5 text-[#265cb3]" />
            </div>
            <p className="text-3xl font-extrabold font-heading text-[#091b3b]">{bookings.length}</p>
            <p className="text-xs text-[#10b981] font-semibold">Physical Seat Reservations</p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-[#e2dedc] shadow-sm space-y-1">
            <div className="flex items-center justify-between text-[#8e8f99]">
              <span className="text-xs font-bold uppercase tracking-wider">Total Revenue</span>
              <CreditCard className="w-5 h-5 text-[#10b981]" />
            </div>
            <p className="text-3xl font-extrabold font-heading text-[#091b3b]">
              NPR {totalRevenue.toLocaleString()}
            </p>
            <p className="text-xs text-[#8e8f99] font-semibold">Verified eSewa & Khalti</p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-[#e2dedc] shadow-sm space-y-1">
            <div className="flex items-center justify-between text-[#8e8f99]">
              <span className="text-xs font-bold uppercase tracking-wider">Published Blogs</span>
              <BookOpen className="w-5 h-5 text-[#ac7859]" />
            </div>
            <p className="text-3xl font-extrabold font-heading text-[#091b3b]">{blogs.length}</p>
            <p className="text-xs text-[#265cb3] font-semibold">Active Knowledge Base</p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-[#e2dedc] shadow-sm space-y-1">
            <div className="flex items-center justify-between text-[#8e8f99]">
              <span className="text-xs font-bold uppercase tracking-wider">Gallery Media</span>
              <ImageIcon className="w-5 h-5 text-purple-600" />
            </div>
            <p className="text-3xl font-extrabold font-heading text-[#091b3b]">{gallery.length}</p>
            <p className="text-xs text-[#8e8f99] font-semibold">Photos & Videos</p>
          </div>
        </div>

        {/* Tab Selection Navigation */}
        <div className="flex border-b border-[#d6d0cc] space-x-4">
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
                className={`flex items-center gap-2 pb-3 pt-2 text-sm font-extrabold border-b-2 transition-all ${
                  isSel
                    ? 'border-[#091b3b] text-[#091b3b]'
                    : 'border-transparent text-[#8e8f99] hover:text-[#091b3b]'
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
          <div className="bg-white rounded-3xl border border-[#e2dedc] shadow-sm p-6 sm:p-8 space-y-8">
            <div className="border-b border-[#e2dedc] pb-4">
              <h2 className="text-2xl font-extrabold text-[#091b3b] font-heading flex items-center gap-2">
                <Calendar className="w-6 h-6 text-[#265cb3]" />
                Upcoming Session Dates
              </h2>
              <p className="text-xs text-[#5c5d63] mt-1">
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
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-[#5c5d63]">Active Sessions</h3>
              {sessions.length === 0 ? (
                <p className="text-sm text-[#8e8f99] italic">No sessions found. Create one below.</p>
              ) : (
                sessions.map((s) => {
                  const localStart = s.startDate || '';
                  const localEnd = s.endDate || '';
                  return (
                    <div key={s.id} className="bg-[#fcf9f8] border border-[#e2dedc] rounded-2xl p-5 space-y-4">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="font-extrabold text-[#091b3b] text-sm">{s.nameEn}</p>
                          <p className="text-xs text-[#5c5d63] mt-0.5">{s.city} · {s.batch}</p>
                        </div>
                        <button
                          onClick={() => handleDeleteSession(s.id)}
                          className="text-red-400 hover:text-red-600 p-1 rounded-lg hover:bg-red-50 transition-colors"
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
            <div className="border-t border-[#e2dedc] pt-6 space-y-4">
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-[#5c5d63]">Add New Session</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#091b3b] mb-1.5">Session Name</label>
                  <input
                    type="text"
                    value={newSessionForm.nameEn}
                    onChange={(e) => setNewSessionForm((p) => ({ ...p, nameEn: e.target.value }))}
                    className="w-full px-3 py-2.5 rounded-xl border border-[#d6d0cc] text-sm font-semibold outline-none focus:border-[#265cb3]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#091b3b] mb-1.5">Start Date</label>
                  <input
                    type="date"
                    value={newSessionForm.startDate}
                    onChange={(e) => setNewSessionForm((p) => ({ ...p, startDate: e.target.value }))}
                    className="w-full px-3 py-2.5 rounded-xl border border-[#d6d0cc] text-sm font-semibold outline-none focus:border-[#265cb3]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#091b3b] mb-1.5">End Date</label>
                  <input
                    type="date"
                    value={newSessionForm.endDate}
                    onChange={(e) => setNewSessionForm((p) => ({ ...p, endDate: e.target.value }))}
                    className="w-full px-3 py-2.5 rounded-xl border border-[#d6d0cc] text-sm font-semibold outline-none focus:border-[#265cb3]"
                  />
                </div>
              </div>
              <button
                onClick={handleCreateSession}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#091b3b] text-white text-sm font-extrabold hover:opacity-90 transition-opacity"
              >
                <Plus className="w-4 h-4" />
                Create Session
              </button>
            </div>
          </div>
        )}

        {/* TAB 1: BOOKINGS & PAYMENTS */}
        {activeTab === 'bookings' && (
          <div className="bg-white rounded-3xl border border-[#e2dedc] shadow-sm p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#e2dedc] pb-4">
              <div>
                <h2 className="text-2xl font-extrabold text-[#091b3b] font-heading">
                  Physical Classroom Bookings
                </h2>
                <p className="text-xs text-[#5c5d63]">
                  Real-time seat reservations with eSewa & Khalti payment verification
                </p>
              </div>

              {/* Filters */}
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="w-4 h-4 text-[#8e8f99] absolute left-3 top-3" />
                  <input
                    type="text"
                    value={searchBooking}
                    onChange={(e) => setSearchBooking(e.target.value)}
                    placeholder="Search name, phone, ref ID..."
                    className="pl-9 pr-4 py-2 rounded-xl border border-[#d6d0cc] text-xs font-semibold outline-none focus:border-[#265cb3]"
                  />
                </div>

                <select
                  value={filterCity}
                  onChange={(e) => setFilterCity(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-[#d6d0cc] text-xs font-bold outline-none text-[#091b3b]"
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
              <div className="py-12 text-center text-sm font-semibold text-[#8e8f99]">
                Loading seat bookings...
              </div>
            ) : filteredBookings.length === 0 ? (
              <div className="py-12 text-center text-sm text-[#8e8f99]">
                No bookings found matching your search.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[#e2dedc] text-xs font-bold uppercase text-[#8e8f99]">
                      <th className="py-3 px-4">Student Info</th>
                      <th className="py-3 px-4">Campus & Batch</th>
                      <th className="py-3 px-4">Seat ID</th>
                      <th className="py-3 px-4">Amount</th>
                      <th className="py-3 px-4">Payment Method</th>
                      <th className="py-3 px-4">Status & Ref ID</th>
                      <th className="py-3 px-4">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#f0ece9] text-xs font-semibold">
                    {filteredBookings.map((b) => (
                      <tr key={b.id} className="hover:bg-[#fcf9f8] transition-colors">
                        <td className="py-4 px-4">
                          <div className="font-extrabold text-[#091b3b] text-sm">{b.fullName}</div>
                          <div className="text-[#5c5d63]">{b.phone}</div>
                          <div className="text-[#8e8f99] text-[11px]">{b.email}</div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="font-bold text-[#091b3b]">{b.city}</div>
                          <div className="text-[#8e8f99] text-[11px] max-w-[150px] truncate">{b.batch}</div>
                        </td>
                        <td className="py-4 px-4 font-mono font-bold text-[#265cb3]">
                          {b.seatNumber}
                        </td>
                        <td className="py-4 px-4 font-extrabold text-[#091b3b]">
                          NPR {b.amount.toLocaleString()}
                        </td>
                        <td className="py-4 px-4">
                          <span className="uppercase font-extrabold text-[11px] px-2.5 py-1 rounded-md bg-[#ebe7e5] text-[#091b3b]">
                            {b.paymentMethod}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex flex-col space-y-1">
                            <span
                              className={`inline-flex items-center gap-1 font-extrabold text-[10px] uppercase px-2 py-0.5 rounded-full w-max ${
                                b.paymentStatus === 'completed'
                                  ? 'bg-emerald-100 text-emerald-700'
                                  : 'bg-amber-100 text-amber-700'
                              }`}
                            >
                              {b.paymentStatus === 'completed' && <CheckCircle className="w-3 h-3" />}
                              {b.paymentStatus}
                            </span>
                            <span className="font-mono text-[11px] text-[#5c5d63]">
                              {b.refId}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-[#8e8f99] text-[11px]">
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
            <div className="lg:col-span-7 bg-white rounded-3xl border border-[#e2dedc] shadow-sm p-6 sm:p-8 space-y-6">
              <div className="border-b border-[#e2dedc] pb-4">
                <h2 className="text-2xl font-extrabold text-[#091b3b] font-heading">
                  Publish New Blog Post
                </h2>
                <p className="text-xs text-[#5c5d63]">
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
                  <label className="block font-bold text-[#091b3b] mb-1">Article Title (English) *</label>
                  <input
                    type="text"
                    required
                    value={blogFormData.titleEn}
                    onChange={(e) => setBlogFormData({ ...blogFormData, titleEn: e.target.value })}
                    placeholder="e.g. Master Meta Ads for Local Business Growth in Nepal"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#d6d0cc] outline-none focus:border-[#265cb3] text-sm"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#091b3b] mb-1">Article Title (Nepali)</label>
                  <input
                    type="text"
                    value={blogFormData.titleNp}
                    onChange={(e) => setBlogFormData({ ...blogFormData, titleNp: e.target.value })}
                    placeholder="उदा: नेपालमा स्थानीय व्यापार प्रवर्द्धनका लागि मेटा विज्ञापन"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#d6d0cc] outline-none focus:border-[#265cb3] text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-[#091b3b] mb-1">Category</label>
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
                      className="w-full px-3 py-2.5 rounded-xl border border-[#d6d0cc] outline-none text-xs font-bold"
                    >
                      <option value="facebook-ads">Facebook Ads</option>
                      <option value="digital-marketing">Digital Marketing</option>
                      <option value="ai-tools">AI Tools</option>
                      <option value="branding">Branding</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-[#091b3b] mb-1">Read Time</label>
                    <input
                      type="text"
                      value={blogFormData.readTime}
                      onChange={(e) => setBlogFormData({ ...blogFormData, readTime: e.target.value })}
                      placeholder="5 min read"
                      className="w-full px-4 py-2.5 rounded-xl border border-[#d6d0cc] outline-none text-xs font-semibold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-[#091b3b] mb-1">Short Summary (English) *</label>
                  <textarea
                    rows={2}
                    required
                    value={blogFormData.summaryEn}
                    onChange={(e) => setBlogFormData({ ...blogFormData, summaryEn: e.target.value })}
                    placeholder="Brief intro preview for article card..."
                    className="w-full px-4 py-2.5 rounded-xl border border-[#d6d0cc] outline-none text-xs"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#091b3b] mb-1">Full Article Body (English) *</label>
                  <textarea
                    rows={5}
                    required
                    value={blogFormData.contentEn}
                    onChange={(e) => setBlogFormData({ ...blogFormData, contentEn: e.target.value })}
                    placeholder="Write detailed blog article content here..."
                    className="w-full px-4 py-2.5 rounded-xl border border-[#d6d0cc] outline-none text-xs"
                  />
                </div>

                {/* Cover Image Upload / URL */}
                <div>
                  <label className="block font-bold text-[#091b3b] mb-1">Cover Image *</label>
                  <div className="space-y-2">
                    <input
                      type="text"
                      required
                      value={blogFormData.image}
                      onChange={(e) => setBlogFormData({ ...blogFormData, image: e.target.value })}
                      placeholder="https://images.unsplash.com/... OR upload file below"
                      className="w-full px-4 py-2.5 rounded-xl border border-[#d6d0cc] outline-none text-xs"
                    />
                    <div className="flex items-center gap-2">
                      <label className="cursor-pointer py-2 px-4 bg-[#ebe7e5] hover:bg-[#d6d0cc] text-[#091b3b] rounded-xl text-xs font-bold flex items-center gap-2">
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
                    className="w-4 h-4 rounded text-[#091b3b]"
                  />
                  <label htmlFor="featured" className="font-bold text-[#091b3b] text-xs">
                    Mark as Featured Article on Top Banner
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={publishingBlog}
                  className="w-full py-3 rounded-xl bg-[#091b3b] text-white font-extrabold text-sm shadow-md hover:bg-[#122b5e] transition-all disabled:opacity-50"
                >
                  {publishingBlog ? 'Publishing...' : 'Publish Article'}
                </button>
              </form>
            </div>

            {/* List of Published Blogs */}
            <div className="lg:col-span-5 bg-white rounded-3xl border border-[#e2dedc] shadow-sm p-6 space-y-4">
              <h3 className="text-xl font-bold text-[#091b3b] font-heading border-b border-[#e2dedc] pb-3">
                Published Articles ({blogs.length})
              </h3>

              {loadingBlogs ? (
                <div className="py-8 text-center text-xs text-[#8e8f99]">Loading blogs...</div>
              ) : (
                <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
                  {blogs.map((blog) => (
                    <div
                      key={blog.id}
                      className="p-4 rounded-2xl border border-[#e2dedc] bg-[#fcf9f8] flex items-start justify-between gap-3"
                    >
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold uppercase text-[#265cb3] bg-[#265cb3]/10 px-2 py-0.5 rounded-full">
                          {blog.category?.en || 'Blog'}
                        </span>
                        <h4 className="font-bold text-xs text-[#091b3b] line-clamp-2">
                          {blog.title?.en}
                        </h4>
                        <p className="text-[11px] text-[#8e8f99]">{blog.date}</p>
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
            <div className="lg:col-span-6 bg-white rounded-3xl border border-[#e2dedc] shadow-sm p-6 sm:p-8 space-y-6">
              <div className="border-b border-[#e2dedc] pb-4">
                <h2 className="text-2xl font-extrabold text-[#091b3b] font-heading">
                  Post Gallery Image / Video
                </h2>
                <p className="text-xs text-[#5c5d63]">
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
                  <label className="block font-bold text-[#091b3b] mb-1">Title (English) *</label>
                  <input
                    type="text"
                    required
                    value={galleryFormData.titleEn}
                    onChange={(e) => setGalleryFormData({ ...galleryFormData, titleEn: e.target.value })}
                    placeholder="e.g. Kathmandu Intensive Ad Workshop 2026"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#d6d0cc] outline-none focus:border-[#265cb3] text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-[#091b3b] mb-1">Category</label>
                    <select
                      value={galleryFormData.category}
                      onChange={(e) => setGalleryFormData({ ...galleryFormData, category: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl border border-[#d6d0cc] outline-none text-xs font-bold"
                    >
                      <option value="workshops">Workshops</option>
                      <option value="training">Training</option>
                      <option value="events">Events</option>
                      <option value="students">Students</option>
                      <option value="videos">Videos</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-[#091b3b] mb-1">Aspect Ratio</label>
                    <select
                      value={galleryFormData.aspect}
                      onChange={(e) => setGalleryFormData({ ...galleryFormData, aspect: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl border border-[#d6d0cc] outline-none text-xs font-bold"
                    >
                      <option value="landscape">Landscape</option>
                      <option value="portrait">Portrait</option>
                      <option value="square">Square</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-[#091b3b] mb-1">Image URL / File *</label>
                  <div className="space-y-2">
                    <input
                      type="text"
                      required
                      value={galleryFormData.image}
                      onChange={(e) => setGalleryFormData({ ...galleryFormData, image: e.target.value })}
                      placeholder="https://images.unsplash.com/... OR upload file"
                      className="w-full px-4 py-2.5 rounded-xl border border-[#d6d0cc] outline-none text-xs"
                    />
                    <label className="cursor-pointer py-2 px-4 bg-[#ebe7e5] hover:bg-[#d6d0cc] text-[#091b3b] rounded-xl text-xs font-bold flex items-center gap-2 w-max">
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
                  className="w-full py-3 rounded-xl bg-[#091b3b] text-white font-extrabold text-sm shadow-md hover:bg-[#122b5e] transition-all disabled:opacity-50"
                >
                  {postingGallery ? 'Posting...' : 'Post Gallery Item'}
                </button>
              </form>
            </div>

            {/* List of Gallery Items */}
            <div className="lg:col-span-6 bg-white rounded-3xl border border-[#e2dedc] shadow-sm p-6 space-y-4">
              <h3 className="text-xl font-bold text-[#091b3b] font-heading border-b border-[#e2dedc] pb-3">
                Current Gallery ({gallery.length})
              </h3>

              {loadingGallery ? (
                <div className="py-8 text-center text-xs text-[#8e8f99]">Loading gallery...</div>
              ) : (
                <div className="grid grid-cols-2 gap-4 max-h-[600px] overflow-y-auto pr-1">
                  {gallery.map((item) => (
                    <div
                      key={item.id}
                      className="relative group rounded-2xl overflow-hidden border border-[#e2dedc] bg-slate-100"
                    >
                      <img
                        src={item.image}
                        alt={item.title?.en}
                        className="w-full h-36 object-cover"
                      />
                      <div className="p-3 bg-white">
                        <h4 className="font-bold text-xs text-[#091b3b] truncate">{item.title?.en}</h4>
                        <span className="text-[10px] font-bold text-[#8e8f99] uppercase">{item.category}</span>
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
          <label className="block text-xs font-bold text-[#091b3b] mb-1">Cohort Name</label>
          <input
            type="text"
            value={localName}
            onChange={(e) => setLocalName(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-[#d6d0cc] text-xs font-semibold outline-none focus:border-[#265cb3]"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-[#091b3b] mb-1">Start Date</label>
          <input
            type="date"
            value={localStart}
            onChange={(e) => setLocalStart(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-[#d6d0cc] text-xs font-semibold outline-none focus:border-[#265cb3]"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-[#091b3b] mb-1">End Date</label>
          <input
            type="date"
            value={localEnd}
            onChange={(e) => setLocalEnd(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-[#d6d0cc] text-xs font-semibold outline-none focus:border-[#265cb3]"
          />
        </div>
      </div>
      <button
        disabled={saving}
        onClick={() => onSave({ startDate: localStart, endDate: localEnd, nameEn: localName })}
        className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-[#265cb3] text-white text-xs font-extrabold hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        <Save className="w-3.5 h-3.5" />
        {saving ? 'Saving…' : 'Save Changes'}
      </button>
    </div>
  );
}
