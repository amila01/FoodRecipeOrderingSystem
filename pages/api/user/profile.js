import dbConnect from "../../../util/mongo";
import User from "../../../models/userModel"
import bcrypt from "bcryptjs"

dbConnect();

export default async(req, res) => {
    try {
        if (req.method === "POST") {
            const { email } = req.body

            // console.log(email, password, firstName, lastName)

            const user = await User.findOne({ email: email })

            return res.status(200).send(user)
        }
    } catch (err) {
        console.log(err)
    }
}