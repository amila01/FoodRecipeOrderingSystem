import dbConnect from "../../../util/mongo"
import Product from "../../../models/Product"
import Comment from "../../../models/Comment";


export default async function handler(req, res) {
    const { method, query: { id }, cookies } = req;
    const token = cookies.token;

    dbConnect();

    if (method === "GET") {
        try {
            const comment = await Comment.findById(id);
            res.status(200).json(comment)
        } catch (err) {
            res.status(500).json(err)
        }
    }

    if (method === "PUT") {
        // if (!token || token !== process.env.token) {
        //     return res.status(401).json("not Authenticated");
        // }
        try {
            const comment = await Comment.findByIdAndUpdate(id, req.body, {
                new: true,
            });
            res.status(201).json(comment)
        } catch (err) {
            res.status(500).json(err)
        }
    }
    if (method === "DELETE") {
        if (!token || token !== process.env.token) {
            return res.status(401).json("not Authenticated");
        }
        try {
            await Comment.findByIdAndDelete(id);
            res.status(200).json("the comment has been deleted");
        } catch (err) {
            res.status(500).json(err)
        }
    }
}