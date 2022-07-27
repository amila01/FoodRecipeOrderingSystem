import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    desc: {
        type: String,
        required: true,
        maxlength: 1200
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
    cusName: {
        type: String,
        required: true,
        maxlength: 300
    },
    proId: {
        type: String,
        required: true,
        maxlength: 300
    },
    star: {
        type: Number,
        required: true,
    },

}, { timestamps: true });

export default mongoose.models.Comment || mongoose.model("Comment", CommentSchema);