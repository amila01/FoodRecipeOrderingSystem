import mongoose from "mongoose";

const StatusSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxlength: 60
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
    }

}, { timestamps: true });

export default mongoose.models.Status || mongoose.model("Status", StatusSchema);