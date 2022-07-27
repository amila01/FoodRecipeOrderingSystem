import mongoose from "mongoose";

const WishItemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxlength: 60
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
    cusId: {
        type: String,
        required: true,
        maxlength: 300
    },
    proId: {
        type: String,
        required: true,
        maxlength: 300
    },


}, { timestamps: true });

export default mongoose.models.WishItem || mongoose.model("WishItem", WishItemSchema);