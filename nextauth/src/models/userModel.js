import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please provide a username'],
        unique: true,
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        unique: true,
    },
    isVerified: {
        type: Boolean,
        default: false, // Initially set to false until email verification
    },
    isAdmin: {
        type: Boolean,
        default: false, // Only certain users will have admin privileges
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
});

export const User = mongoose.models.User || mongoose.model('User', UserSchema);
