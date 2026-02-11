const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('❌ MONGODB_URI is missing in .env.local');
    process.exit(1);
}

// --- Define Schemas Inline (to avoid TS compilation issues) ---

// Note Schema
const noteSchema = new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    category: { type: String, required: true },
    tags: [String],
    views: { type: Number, default: 0 },
}, { timestamps: true });

// Blog Schema
const blogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    excerpt: { type: String, required: true },
    category: { type: String, required: true },
    author: { type: String, default: 'Admin' },
    tags: [String],
    featuredImage: String,
    views: { type: Number, default: 0 },
    relatedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }],
}, { timestamps: true });

// Newsletter Schema
const newsletterSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    active: { type: Boolean, default: true },
}, { timestamps: true });

// User Schema
const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'user' },
}, { timestamps: true });

// Register Models (check if already registered to be safe, though separate process)
const Note = mongoose.models.Note || mongoose.model('Note', noteSchema);
const Blog = mongoose.models.Blog || mongoose.model('Blog', blogSchema);
const Newsletter = mongoose.models.Newsletter || mongoose.model('Newsletter', newsletterSchema);
const User = mongoose.models.User || mongoose.model('User', userSchema);

// --- Sample Data ---

const sampleNotes = [
    {
        title: 'Introduction to JavaScript Basics',
        slug: 'intro-javascript-basics',
        content: 'JavaScript is a versatile programming language...\n\nVariables: let, const, var\nData Types: String, Number, Boolean, Object, Array\nFunctions: Function declarations and expressions\nControl Flow: if-else statements, loops',
        category: 'Programming',
        tags: ['javascript', 'programming', 'web development'],
        views: 150,
    },
    {
        title: 'Python for Beginners',
        slug: 'python-for-beginners',
        content: 'Python is an easy-to-learn, powerful programming language...\n\nBasic Syntax\nData Structures: Lists, Tuples, Dictionaries\nObject-Oriented Programming\nFile Handling',
        category: 'Programming',
        tags: ['python', 'programming', 'beginners'],
        views: 200,
    },
    // ... (Add more if needed, keeping it concise for now)
    {
        title: 'Calculus Fundamentals',
        slug: 'calculus-fundamentals',
        content: 'Calculus is the study of continuous change...\n\nLimits and Continuity\nDerivatives and Applications\nIntegrals and Applications\nDifferential Equations',
        category: 'Mathematics',
        tags: ['calculus', 'mathematics', 'derivatives'],
        views: 120,
    },
];

const sampleBlogs = [
    {
        title: 'How to Choose the Right Career Path',
        slug: 'choose-right-career-path',
        content: 'Choosing a career is one of the most important decisions...\n\nSelf-assessment is crucial. Understand your strengths, interests, and values. Research different fields and talk to professionals. Consider work-life balance and growth opportunities.\n\nNetworking can open doors to opportunities you never knew existed. Attend career fairs, join professional organizations, and leverage social media platforms like LinkedIn.',
        excerpt: 'A comprehensive guide to making informed career decisions and finding your passion',
        category: 'Career Guidance',
        author: 'Career Expert Team',
        tags: ['career', 'guidance', 'professional development'],
        featuredImage: '/images/career.jpg',
        views: 320,
    },
    {
        title: '10 Study Techniques That Actually Work',
        slug: '10-study-techniques-that-work',
        content: 'Evidence-based study methods for better retention...\n\n1. Spaced Repetition\n2. Active Recall\n3. Feynman Technique\n4. Pomodoro Method\n5. Mind Mapping\n6. Practice Testing\n7. Interleaving\n8. Elaborative Interrogation\n9. SQ3R Method\n10. Dual Coding',
        excerpt: 'Discover proven study methods backed by science to improve your learning efficiency',
        category: 'Study Hacks',
        author: 'Education Specialist',
        tags: ['study tips', 'learning', 'productivity'],
        featuredImage: '/images/study.jpg',
        views: 450,
    },
];

async function seedDatabase() {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI);
        console.log('Connected successfully!');

        // Clear existing data
        console.log('\nClearing existing data...');
        await Note.deleteMany({});
        await Blog.deleteMany({});
        await Newsletter.deleteMany({});
        await User.deleteMany({});
        console.log('Existing data cleared!');

        // Insert Notes
        console.log('\nInserting sample notes...');
        const insertedNotes = await Note.insertMany(sampleNotes);
        console.log(`${insertedNotes.length} notes inserted!`);

        // Insert Blogs
        console.log('\nInserting sample blogs...');
        const insertedBlogs = await Blog.insertMany(sampleBlogs);
        console.log(`${insertedBlogs.length} blogs inserted!`);

        // Create sample admin user
        console.log('\nCreating admin user...');

        const adminEmail = process.env.ADMIN_EMAIL || 'admin@studentplatform.com';
        const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

        // Hash password manually (since we use a standalone schema without hooks here)
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(adminPassword, salt);

        const adminUser = await User.create({
            email: adminEmail,
            password: hashedPassword,
            role: 'admin',
        });
        console.log('Admin user created!');
        console.log(`Email: ${adminEmail}`);
        console.log(`Password: ${adminPassword}`);

        // Insert sample newsletter subscribers
        console.log('\nInserting sample newsletter subscribers...');
        await Newsletter.insertMany([
            { email: 'user1@example.com' },
            { email: 'user2@example.com' },
            { email: 'user3@example.com' },
        ]);
        console.log('3 newsletter subscribers inserted!');

        console.log('\n✅ Database seeding completed successfully!');

        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}

seedDatabase();
