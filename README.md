# Student Platform

A complete, production-ready full-stack platform for students featuring study notes, career guidance blogs, and 10 essential student tools.

## 🌐 Live Demo

Check out the live version here: **[https://student-platform.vercel.app](https://student-platform.vercel.app)**
*(Note: If your URL is different, please update this link)*

## 🚀 Features

### 📚 Study Notes
- Comprehensive notes across multiple categories (Programming, Mathematics, Science, Engineering, Business)
- Full-text search functionality
- Category filtering and pagination
- SEO-optimized with structured data

### ✍️ Blog & Articles
- Career guidance articles
- Study hacks and productivity tips
- Category-based filtering
- Related posts recommendations

### 🛠️ Student Tools (10 Complete Tools)
1. **CGPA to Percentage Calculator** - Convert CGPA to percentage
2. **GPA Calculator** - Calculate weighted GPA across subjects
3. **Attendance Calculator** - Track attendance and estimate classes needed
4. **Age Calculator** - Calculate exact age and days to next birthday
5. **Countdown Timer** - Live countdown to important events
6. **Word Counter** - Count words, characters, and estimate reading time
7. **Unit Converter** - Convert between length, weight, and temperature units
8. **Essay Generator** - Generate essay structures and outlines
9. **Notes Summarizer** - Extract key points from lengthy notes
10. **Timetable Generator** - Create weekly study schedules

### 🎨 Design Features
- Modern, responsive UI with Tailwind CSS
- Gradient backgrounds and glassmorphism effects
- Smooth animations and transitions
- Mobile-first design

### 🔧 Technical Features
- Next.js 14 with App Router
- TypeScript for type safety
- MongoDB with Mongoose
- API routes for CRUD operations
- Newsletter subscription system
- SEO optimization with meta tags and JSON-LD
- Sitemap and robots.txt

## 📦 Installation

### Prerequisites
- Node.js 18+ installed
- MongoDB Atlas account (free tier)

### Steps

1. **Clone or navigate to the project directory:**
```bash
cd student-platform
```

2. **Install dependencies:**
```bash
npm install
```

3. **Set up environment variables:**

Create a `.env.local` file in the root directory:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/studentdb?retryWrites=true&w=majority
NEXTAUTH_SECRET=your-super-secret-key-change-this
NEXTAUTH_URL=http://localhost:3000
ADMIN_EMAIL=admin@studentplatform.com
ADMIN_PASSWORD=admin123
```

4. **Seed the database with sample data:**
```bash
npm run seed
```

5. **Run the development server:**
```bash
npm run dev
```

6. **Open your browser:**
Navigate to [http://localhost:3000](http://localhost:3000)

## 🚢 Deployment

### Deploy to Vercel

1. **Push your code to GitHub**

2. **Import project in Vercel:**
- Go to [vercel.com](https://vercel.com)
- Click "New Project"
- Import your GitHub repository

3. **Add Environment Variables:**
In Vercel dashboard, add all variables from `.env.local`:
- `MONGODB_URI`
- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL` (update to your production URL)

4. **Deploy:**
Vercel will automatically build and deploy your application

### MongoDB Atlas Setup

1. Create free cluster at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create database user
3. Whitelist all IPs: `0.0.0.0/0`
4. Get connection string
5. Update `MONGODB_URI` in environment variables

## 📂 Project Structure

```
student-platform/
├── app/                      # Next.js App Router
│   ├── api/                  # API routes
│   ├── notes/                # Notes pages
│   ├── blog/                 # Blog pages
│   ├── tools/                # Tool pages
│   ├── about/                # About page
│   ├── contact/              # Contact page
│   ├── privacy/              # Privacy policy
│   ├── terms/                # Terms of service
│   ├── layout.tsx            # Root layout
│   ├── page.tsx              # Homepage
│   └── globals.css           # Global styles
├── components/               # React components
│   ├── layout/               # Layout components
│   ├── cards/                # Card components
│   └── common/               # Common components
├── lib/                      # Utilities and helpers
│   ├── models/               # Mongoose models
│   ├── utils/                # Utility functions
│   └── mongodb.ts            # Database connection
├── types/                    # TypeScript types
├── scripts/                  # Utility scripts
│   └── seed.js               # Database seeding
└── public/                   # Static files
```

## 🎯 API Routes

- `GET/POST /api/notes` - Fetch/create notes
- `GET/PUT/DELETE /api/notes/[id]` - Single note operations
- `GET/POST /api/blogs` - Fetch/create blogs
- `GET/PUT/DELETE /api/blogs/[id]` - Single blog operations
- `POST /api/newsletter` - Newsletter subscription
- `GET /api/search` - Search notes and blogs

## 🔑 Admin Credentials

After seeding:
- **Email:** admin@studentplatform.com
- **Password:** admin123

## 📊 Sample Data

The seed script includes:
- 10 sample notes across different categories
- 10 sample blog articles
- 1 admin user
- 3 newsletter subscribers

## 🛠️ Technologies Used

- **Framework:** Next.js 14
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database:** MongoDB + Mongoose
- **Icons:** Lucide React
- **Deployment:** Vercel
- **Database Hosting:** MongoDB Atlas

## 📝 License

This project is open source and available for educational purposes.

## 🤝 Contributing

Feel free to fork, modify, and use this project for your own purposes!

## 📧 Contact

For questions or support, contact: support@studentplatform.com

---

**Made with ❤️ for students worldwide**
