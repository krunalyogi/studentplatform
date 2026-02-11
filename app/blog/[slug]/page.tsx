import { notFound } from 'next/navigation';
import { Calendar, User, Eye, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { formatDate, generateArticleSchema } from '@/lib/utils/seo';
import connectDB from '@/lib/mongodb';
import Blog from '@/lib/models/Blog';
import { Blog as BlogType } from '@/types';
import { Metadata } from 'next';

// Ensure database connection
async function getBlog(slug: string) {
    try {
        await connectDB();
        const blog = await Blog.findOne({ slug }).lean() as unknown as BlogType;

        if (!blog) return null;

        // Fetch related posts (same category, excluding current)
        const relatedPosts = await Blog.find({
            category: blog.category,
            _id: { $ne: blog._id }
        })
            .limit(3)
            .select('title slug excerpt')
            .lean() as unknown as BlogType[];

        // Convert _id and dates to string/number for serialization if needed
        return {
            blog: JSON.parse(JSON.stringify(blog)),
            relatedPosts: JSON.parse(JSON.stringify(relatedPosts))
        };
    } catch (error) {
        console.error('Error fetching blog:', error);
        return null;
    }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const data = await getBlog(params.slug);

    if (!data) {
        return {
            title: 'Blog Not Found',
        };
    }

    return {
        title: `${data.blog.title} | Student Platform`,
        description: data.blog.excerpt,
        keywords: data.blog.tags.join(', '),
    };
}

export default async function SingleBlogPage({ params }: { params: { slug: string } }) {
    const data = await getBlog(params.slug);

    if (!data) {
        notFound();
    }

    const { blog, relatedPosts } = data;

    const schema = generateArticleSchema({
        title: blog.title,
        description: blog.excerpt,
        author: blog.author,
        publishedDate: new Date(blog.createdAt),
        modifiedDate: new Date(blog.updatedAt),
        url: `https://student-platform.vercel.app/blog/${blog.slug}`,
    });

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            {/* JSON-LD Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Back Button */}
                <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 text-secondary-600 hover:text-secondary-700 mb-6 font-medium"
                >
                    <ArrowLeft className="w-5 h-5" />
                    Back to Blog
                </Link>

                {/* Blog Header */}
                <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                    {/* Category Badge */}
                    <div className="inline-block px-4 py-2 bg-secondary-100 text-secondary-700 rounded-full text-sm font-semibold mb-4">
                        {blog.category}
                    </div>

                    {/* Title */}
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">{blog.title}</h1>

                    {/* Excerpt */}
                    <p className="text-xl text-gray-600 mb-6">{blog.excerpt}</p>

                    {/* Metadata */}
                    <div className="flex flex-wrap items-center gap-6 text-gray-600 pb-6 border-b">
                        <div className="flex items-center gap-2">
                            <User className="w-5 h-5" />
                            <span>{blog.author}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar className="w-5 h-5" />
                            <span>{formatDate(blog.createdAt)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Eye className="w-5 h-5" />
                            <span>{blog.views} views</span>
                        </div>
                    </div>
                </div>

                {/* Blog Content */}
                <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                    <div className="prose prose-lg max-w-none">
                        <div
                            className="text-gray-800 leading-relaxed whitespace-pre-wrap"
                            dangerouslySetInnerHTML={{ __html: blog.content }}
                        />
                    </div>
                </div>

                {/* Related Posts */}
                {relatedPosts && relatedPosts.length > 0 && (
                    <div className="bg-white rounded-xl shadow-lg p-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {relatedPosts.map((post: any) => (
                                <Link
                                    key={post._id}
                                    href={`/blog/${post.slug}`}
                                    className="group"
                                >
                                    <div className="bg-gray-50 rounded-lg p-4 hover:bg-primary-50 transition-colors">
                                        <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 mb-2 line-clamp-2">
                                            {post.title}
                                        </h3>
                                        <p className="text-sm text-gray-600 line-clamp-2">{post.excerpt}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
