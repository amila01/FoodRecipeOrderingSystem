import dbConnect from "../../../util/mongo"
import Comment from "../../../models/Comment";


export default async function handler(req, res) {
    const { method, cookies } = req;

    const token = cookies.token;

    dbConnect();

    if (method === "GET") {
        try {
            const comments = await Comment.find();
            res.status(200).json(comments)
        } catch (err) {
            res.status(500).json(err)
        }
    }

    if (method === "POST") {

        // if (!token || token !== process.env.token) {
        //     return res.status(401).json("not Authenticated");
        // }

        try {
            const comment = await Comment.create(req.body);
            res.status(201).json(comment)
        } catch (err) {
            res.status(500).json(err)
        }
    }
}