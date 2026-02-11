const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('Error: MONGODB_URI is not defined in .env.local');
    process.exit(1);
}

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'user' },
}, { timestamps: true });

// We define the model but WITHOUT the pre-save hook here, because we just want to READ.
// If we included the hook, it wouldn't matter for reading, but let's keep it simple.
// We DO need to manually verify the password though.

const User = mongoose.models.User || mongoose.model('User', userSchema);

async function verifyLogin() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');

        const adminEmail = process.env.ADMIN_EMAIL || 'admin@studentplatform.com';
        const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

        console.log(`Checking user: ${adminEmail}`);
        console.log(`Using password: ${adminPassword}`);

        const user = await User.findOne({ email: adminEmail });

        if (!user) {
            console.error('❌ User not found in database!');
            return;
        }

        console.log('User found.');
        console.log('Stored Value (First 10 chars):', user.password.substring(0, 10) + '...');
        console.log('Is it a hash?', user.password.startsWith('$2'));

        const isMatch = await bcrypt.compare(adminPassword, user.password);

        if (isMatch) {
            console.log('✅ Password Match: SUCCESS');
        } else {
            console.error('❌ Password Match: FAILED');
            console.error('The stored password is NOT matching the provided credentials.');
        }

    } catch (error) {
        console.error('Error verifying login:', error);
    } finally {
        await mongoose.disconnect();
    }
}

verifyLogin();
