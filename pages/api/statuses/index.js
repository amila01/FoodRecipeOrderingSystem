import dbConnect from "../../../util/mongo"
import Status from "../../../models/Status";


export default async function handler(req, res) {
    const { method, cookies } = req;

    const token = cookies.token;

    dbConnect();

    if (method === "GET") {
        try {
            const statuse = await Status.find();
            res.status(200).json(statuse)
        } catch (err) {
            res.status(500).json(err)
        }
    }

    if (method === "POST") {

        // if (!token || token !== process.env.token) {
        //     return res.status(401).json("not Authenticated");
        // }

        try {
            const statusphoto = await Status.create(req.body);
            res.status(201).json(statusphoto)
        } catch (err) {
            res.status(500).json(err)
        }
    }
}