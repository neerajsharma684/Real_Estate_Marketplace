import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        min: 3,
        max: 255
    },
    email: {
        type: String,
        required: true,
        unique: true,
        max: 255
    },
    password: {
        type: String,
        required: true,
        min: 8,
        max: 1024
    }
    }, {timestamps: true});

    const User = mongoose.model('User', userSchema)

    export default User;