import mongoose from "mongoose";

const listingSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        min: 6,
        max: 255
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
    name: {
        type: String,
        required: true,
        min: 3,
        max: 255
    },
    description: {
        type: String,
        min: 3,
        max: 1024
    },
    address: {
        type: String,
        required: true,
        min: 3,
        max: 1024
    },
    action: {
        type: String,
        required: true,
    },
    bedrooms: {
        type: Number,
        required: true
    },
    halls: {
        type: Number,
        required: true
    },
    kitchens: {
        type: Number,
        required: true
    },
    bathrooms: {
        type: Number,
        required: true
    },
    furnished:{
        type: String,
        required: true,
    },
    four_wheeler_parking: {
        type: Number,
        required: true
    },
    two_wheeler_parking: {
        type: Number,
        required: true
    },
    area: {
        type: Number,
        required: true
    },
    property_type: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    discountPercent: {
        type: Number,
        required: true
    },
    discountAmount: {
        type: Number,
        required: true
    },
    imageName: {
        type: [String],
    }
});

const Listing = mongoose.model("Listings", listingSchema);

export default Listing;