import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const cities = ['Kathmandu Hub', 'Pokhara Campus', 'Chitwan Center', 'Butwal Hub'];
const batches = [
  'Daytime / Afternoon (12:00 PM - 3:00 PM)',
  'Morning (6:00 AM - 9:00 AM)',
];
const rows = ['A', 'B', 'C', 'D'];
const seatsPerRow = 6;

const initialBlogs = [
  {
    slug: 'meta-ads-mastery-nepal-2026',
    titleEn: 'Meta Ads Strategies for Local Business Growth in Nepal',
    titleNp: 'नेपालमा स्थानीय व्यापार प्रवर्द्धनका लागि मेटा विज्ञापन रणनीति',
    categorySlug: 'facebook-ads',
    categoryEn: 'Facebook Ads',
    categoryNp: 'फेसबुक विज्ञापन',
    summaryEn: 'How local Nepali businesses scale sales using targeted audience segments and eSewa integrated landing pages.',
    summaryNp: 'इसेवा र खल्ती जोडिएका ल्यान्डिङ पेजहरू प्रयोग गरेर नेपाली व्यवसायहरूले कसरी बिक्री बढाउँछन्।',
    contentEn: 'Digital marketing in Nepal is evolving rapidly. Running Meta (Facebook & Instagram) ads effectively requires localized strategy, understanding customer behavior in major hubs like Kathmandu, Pokhara, and Chitwan, and integrating seamless local payment gateways like eSewa and Khalti.',
    contentNp: 'नेपालमा डिजिटल मार्केटिङ द्रुत गतिमा अघि बढिरहेको छ। काठमाडौँ, पोखरा, र चितवन जस्ता प्रमुख शहरहरूमा सफल मेटा विज्ञापन सञ्चालन गर्न स्थानीय रणनीति आवश्यक हुन्छ।',
    readTime: '6 min read',
    date: 'August 10, 2026',
    authorName: 'Anish Sharma',
    authorRole: 'Founder & Lead Instructor',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80',
    featured: true,
  },
  {
    slug: 'ai-tools-for-digital-creators',
    titleEn: 'Top 5 AI Automation Tools for Modern Marketing Agencies',
    titleNp: 'आधुनिक मार्केटिङ एजेन्सीहरूका लागि उत्कृष्ट ५ एआई उपकरणहरू',
    categorySlug: 'ai-tools',
    categoryEn: 'AI Tools',
    categoryNp: 'एआई उपकरण',
    summaryEn: 'Discover how AI prompt engineering can generate high-converting copy and social media graphics in minutes.',
    summaryNp: 'एआई प्रम्प्ट इन्जिनियरिङले कसरी मिनेटमै उच्च रूपान्तरणकारी विज्ञापन प्रतिलिपि तयार गर्न सक्छ।',
    contentEn: 'Artificial Intelligence tools are changing how creative campaigns are generated. From Gemini AI to specialized automation scripts, creators save hours on content production.',
    contentNp: 'कृत्रिम बौद्धिकता (AI) उपकरणहरूले विज्ञापन सिर्जना गर्ने शैली नै परिवर्तन गरिदिएका छन्।',
    readTime: '4 min read',
    date: 'August 08, 2026',
    authorName: 'Pooja Thapa',
    authorRole: 'Senior Marketing Strategist',
    authorAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
    featured: false,
  },
];

const initialGallery = [
  {
    titleEn: 'Kathmandu Intensive Bootcamp 2026',
    titleNp: 'काठमाडौँ सघन बुटक्याम्प २०२६',
    category: 'workshops',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&auto=format&fit=crop&q=80',
    aspect: 'landscape',
    date: 'August 2026',
  },
  {
    titleEn: 'Student Live Ad Campaign Building Session',
    titleNp: 'विद्यार्थी प्रत्यक्ष विज्ञापन निर्माण सत्र',
    category: 'training',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=80',
    aspect: 'portrait',
    date: 'July 2026',
  },
];

async function main() {
  console.log('Seeding initial seat database...');

  // Seed default seats for each city and batch
  for (const city of cities) {
    for (const batch of batches) {
      for (const row of rows) {
        for (let i = 1; i <= seatsPerRow; i++) {
          const seatNumber = `${row}${i}`;
          const seatId = `${city}-${batch}-${seatNumber}`;
          const isVip = row === 'A';
          const isBookedDefault = (seatNumber === 'A3' || seatNumber === 'C2' || seatNumber === 'D5');

          await prisma.seat.upsert({
            where: { id: seatId },
            update: {},
            create: {
              id: seatId,
              city,
              batch,
              seatNumber,
              row,
              status: isBookedDefault ? 'booked' : (isVip ? 'vip' : 'available'),
              isVip,
              priceNpr: isVip ? 25000 : 15000,
            },
          });
        }
      }
    }
  }

  // Seed demo admin user
  const adminPasswordHash = await bcrypt.hash('admin123456', 10);
  await prisma.user.upsert({
    where: { email: 'admin@byom.edu.np' },
    update: {},
    create: {
      name: 'BYOM Admin',
      email: 'admin@byom.edu.np',
      passwordHash: adminPasswordHash,
      phone: '+977 9800000000',
      role: 'admin',
    },
  });

  // Seed Blogs
  for (const blog of initialBlogs) {
    await prisma.blogPost.upsert({
      where: { slug: blog.slug },
      update: {},
      create: blog,
    });
  }

  // Seed Gallery
  for (const item of initialGallery) {
    await prisma.galleryItem.create({
      data: item,
    });
  }

  console.log('Database seeding complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
