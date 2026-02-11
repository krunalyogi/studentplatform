import mongoose, { Schema, models, model } from 'mongoose';

const BlogSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Please provide a title'],
        trim: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    content: {
        type: String,
        required: [true, 'Please provide content'],
    },
    excerpt: {
        type: String,
        required: true,
        maxlength: 300,
    },
    category: {
        type: String,
        required: true,
        enum: ['Career Guidance', 'Study Hacks', 'Technology', 'Productivity', 'Health', 'Other'],
    },
    author: {
        type: String,
        default: 'Student Platform Team',
    },
    tags: {
        type: [String],
        default: [],
    },
    featuredImage: {
        type: String,
        default: '/images/placeholder.jpg',
    },
    views: {
        type: Number,
        default: 0,
    },
    relatedPosts: [{
        type: Schema.Types.ObjectId,
        ref: 'Blog',
    }],
}, {
    timestamps: true,
});

// Create text index for search
BlogSchema.index({ title: 'text', content: 'text', excerpt: 'text', tags: 'text' });

const Blog = models.Blog || model('Blog', BlogSchema);

export default Blog;
