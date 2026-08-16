import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const blogs = await db.blogPost.findMany({
      orderBy: { createdAt: 'desc' },
    });

    const formattedBlogs = blogs.map((b) => ({
      id: b.id,
      slug: b.slug,
      title: { en: b.titleEn, np: b.titleNp },
      category: { en: b.categoryEn, np: b.categoryNp },
      categorySlug: b.categorySlug as any,
      summary: { en: b.summaryEn, np: b.summaryNp },
      content: { en: b.contentEn, np: b.contentNp },
      readTime: b.readTime,
      date: b.date,
      author: {
        name: b.authorName,
        role: b.authorRole,
        avatar: b.authorAvatar,
      },
      image: b.image,
      featured: b.featured,
    }));

    return NextResponse.json({ blogs: formattedBlogs });
  } catch (error: any) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to fetch blogs' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      titleEn,
      titleNp,
      categorySlug,
      categoryEn,
      categoryNp,
      summaryEn,
      summaryNp,
      contentEn,
      contentNp,
      readTime,
      authorName,
      authorRole,
      authorAvatar,
      image,
      featured,
    } = body;

    if (!titleEn || !summaryEn || !contentEn || !image) {
      return NextResponse.json(
        { error: 'Title, summary, content, and image URL are required' },
        { status: 400 }
      );
    }

    const slug = titleEn
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '') + '-' + Date.now().toString().slice(-4);

    const nowStr = new Date().toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });

    const blog = await db.blogPost.create({
      data: {
        slug,
        titleEn,
        titleNp: titleNp || titleEn,
        categorySlug: categorySlug || 'digital-marketing',
        categoryEn: categoryEn || 'Digital Marketing',
        categoryNp: categoryNp || 'डिजिटल मार्केटिङ',
        summaryEn,
        summaryNp: summaryNp || summaryEn,
        contentEn,
        contentNp: contentNp || contentEn,
        readTime: readTime || '5 min read',
        date: nowStr,
        authorName: authorName || 'BYOM Instructor',
        authorRole: authorRole || 'Senior Strategist',
        authorAvatar: authorAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        image,
        featured: !!featured,
      },
    });

    return NextResponse.json({ message: 'Blog created successfully', blog }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating blog:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to create blog' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Blog ID is required' }, { status: 400 });
    }

    await db.blogPost.delete({ where: { id } });
    return NextResponse.json({ message: 'Blog deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Failed to delete blog' }, { status: 500 });
  }
}
