import mongoose, { Schema, models, model } from 'mongoose';

const NewsletterSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
    },
    active: {
        type: Boolean,
        default: true,
    },
    subscribedAt: {
        type: Date,
        default: Date.now,
    },
});

const Newsletter = models.Newsletter || model('Newsletter', NewsletterSchema);

export default Newsletter;
