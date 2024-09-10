import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
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
        min: 8
    },
    phone: {
        type: String,
        required: false,
        min: 10,
        max: 10
    },
    whatsapp: {
        type: String,
        required: false,
        min: 10,
        max: 10
    },
    telegram: {
        type: String,
        required: false,
        min: 10,
        max: 10
    },
    }, {timestamps: true});

    const User = mongoose.model('User', userSchema)

    export default User;