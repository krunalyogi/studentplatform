import mongoose, { Schema, models, model } from 'mongoose';

const ContactSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name'],
        trim: true,
        maxlength: [50, 'Name cannot be more than 50 characters'],
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please provide a valid email',
        ],
    },
    subject: {
        type: String,
        required: false,
        trim: true,
        maxlength: [100, 'Subject cannot be more than 100 characters'],
    },
    message: {
        type: String,
        required: [true, 'Please provide a message'],
        maxlength: [5000, 'Message cannot be more than 5000 characters'],
    },
    status: {
        type: String,
        enum: ['unread', 'read', 'replied'],
        default: 'unread',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Contact = models.Contact || model('Contact', ContactSchema);

export default Contact;
