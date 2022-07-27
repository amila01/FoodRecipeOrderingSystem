import mongoose from "mongoose";

const ProdctSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxlength: 60
    },
    desc: {
        type: String,
        required: true,
        maxlength: 1200
    },
    img: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
        maxlength: 60
    },
    authId: {
        type: String,
        required: true,
        maxlength: 300
    },
    extraOptions: {
        type: [{ text: { type: String, required: true }, price: { type: Number, required: true }, amount: { type: Number, required: true } }]
    },
    steps: {
        type: [{ text: { type: String, required: true } }]
    }

}, { timestamps: true });

export default mongoose.models.Product || mongoose.model("Product", ProdctSchema);