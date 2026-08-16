import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const galleryItems = await db.galleryItem.findMany({
      orderBy: { createdAt: 'desc' },
    });

    const formattedGallery = galleryItems.map((g) => ({
      id: g.id,
      title: { en: g.titleEn, np: g.titleNp },
      category: g.category as any,
      image: g.image,
      aspect: g.aspect as any,
      videoUrl: g.videoUrl || undefined,
      date: g.date,
    }));

    return NextResponse.json({ gallery: formattedGallery });
  } catch (error: any) {
    console.error('Error fetching gallery:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to fetch gallery items' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { titleEn, titleNp, category, image, aspect, videoUrl } = body;

    if (!titleEn || !image) {
      return NextResponse.json(
        { error: 'Title and image/media URL are required' },
        { status: 400 }
      );
    }

    const nowStr = new Date().toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
    });

    const galleryItem = await db.galleryItem.create({
      data: {
        titleEn,
        titleNp: titleNp || titleEn,
        category: category || 'workshops',
        image,
        aspect: aspect || 'landscape',
        videoUrl: videoUrl || null,
        date: nowStr,
      },
    });

    return NextResponse.json({ message: 'Gallery item posted successfully', galleryItem }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating gallery item:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to post gallery item' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Gallery ID is required' }, { status: 400 });
    }

    await db.galleryItem.delete({ where: { id } });
    return NextResponse.json({ message: 'Gallery item deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Failed to delete gallery item' }, { status: 500 });
  }
}
