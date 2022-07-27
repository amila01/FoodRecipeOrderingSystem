import dbConnect from "../../../util/mongo"
import wishItem from "../../../models/wishItem";


export default async function handler(req, res) {
    const { method, query: { id }, cookies } = req;
    const token = cookies.token;

    dbConnect();

    if (method === "GET") {
        try {
            const wishitem = await wishItem.findById(id);
            res.status(200).json(wishitem)
        } catch (err) {
            res.status(500).json(err)
        }
    }

    if (method === "PUT") {
        // if (!token || token !== process.env.token) {
        //     return res.status(401).json("not Authenticated");
        // }
        try {
            const wishitem = await wishItem.findByIdAndUpdate(id, req.body, {
                new: true,
            });
            res.status(201).json(wishitem)
        } catch (err) {
            res.status(500).json(err)
        }
    }
    if (method === "DELETE") {
        if (!token || token !== process.env.token) {
            return res.status(401).json("not Authenticated");
        }
        try {
            await wishItem.findByIdAndDelete(id);
            res.status(200).json("the wish Item has been deleted");
        } catch (err) {
            res.status(500).json(err)
        }
    }
}