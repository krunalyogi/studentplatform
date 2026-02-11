const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('Error: MONGODB_URI is not defined in .env.local');
    process.exit(1);
}

const ContactSchema = new mongoose.Schema({
    name: String,
    email: String,
    subject: String,
    message: String,
    status: String,
    createdAt: Date,
});

const Contact = mongoose.models.Contact || mongoose.model('Contact', ContactSchema);

async function verifyContact() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');

        const count = await Contact.countDocuments();
        console.log(`Total contacts in database: ${count}`);

        const latest = await Contact.findOne().sort({ createdAt: -1 });
        if (latest) {
            console.log('Latest contact submission:', JSON.stringify(latest, null, 2));
        } else {
            console.log('No contact submissions found.');
        }

    } catch (error) {
        console.error('Error verifying contact:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    }
}

verifyContact();
