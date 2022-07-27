import dbConnect from "../../../util/mongo"
import wishItem from "../../../models/wishItem";


export default async function handler(req, res) {
    const { method, cookies } = req;

    const token = cookies.token;

    dbConnect();

    if (method === "GET") {
        try {
            const wishList = await wishItem.find();
            res.status(200).json(wishList)
        } catch (err) {
            res.status(500).json(err)
        }
    }

    if (method === "POST") {

        // if (!token || token !== process.env.token) {
        //     return res.status(401).json("not Authenticated");
        // }

        try {
            const wishitem = await wishItem.create(req.body);
            res.status(201).json(wishitem)
        } catch (err) {
            res.status(500).json(err)
        }
    }
}