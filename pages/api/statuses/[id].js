import dbConnect from "../../../util/mongo"
import Status from "../../../models/Status";


export default async function handler(req, res) {
    const { method, query: { id }, cookies } = req;
    const token = cookies.token;

    dbConnect();

    if (method === "GET") {
        try {
            const statuse = await Status.findById(id);
            res.status(200).json(statuse)
        } catch (err) {
            res.status(500).json(err)
        }
    }

    if (method === "PUT") {
        // if (!token || token !== process.env.token) {
        //     return res.status(401).json("not Authenticated");
        // }
        try {
            const statuse = await Status.findByIdAndUpdate(id, req.body, {
                new: true,
            });
            res.status(201).json(statuse)
        } catch (err) {
            res.status(500).json(err)
        }
    }
    if (method === "DELETE") {
        if (!token || token !== process.env.token) {
            return res.status(401).json("not Authenticated");
        }
        try {
            await Status.findByIdAndDelete(id);
            res.status(200).json("the status has been deleted");
        } catch (err) {
            res.status(500).json(err)
        }
    }
}