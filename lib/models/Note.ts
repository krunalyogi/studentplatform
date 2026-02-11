import mongoose, { Schema, models, model } from 'mongoose';

const NoteSchema = new Schema({
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
    category: {
        type: String,
        required: true,
        enum: ['Programming', 'Mathematics', 'Science', 'Engineering', 'Business', 'Other'],
    },
    tags: {
        type: [String],
        default: [],
    },
    views: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: true,
});

// Create text index for search
NoteSchema.index({ title: 'text', content: 'text', tags: 'text' });

// Prevent model recompilation in development
const Note = models.Note || model('Note', NoteSchema);

export default Note;
