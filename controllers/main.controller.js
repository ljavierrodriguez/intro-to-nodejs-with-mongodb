const Comment = require("../models/comment");
const User = require("../models/user")

exports.home = async (req, res) => {

    const user = await User.findOne({ _id: req.user.id })

    const texto = req.body.texto;

    const newComment = Comment({
        name: user.username,
        comment: texto
    })

    const comment = await newComment.save();

    return res.json({
        data: "Datos Privados",
        id: req.user.id,
        user: user,
        comment: comment
    })
}