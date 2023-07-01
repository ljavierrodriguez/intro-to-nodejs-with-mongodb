const bcript = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require("../models/user");

exports.register = async (req, res) => {
    const { name, username, password } = req.body;

    const user = new User({
        name: name,
        username: username,
        password: bcript.hashSync(password, 8)
    })

    const userCreated = await user.save();

    if(!userCreated){
        return res.status(404).send({ message: 'User not created'})
    }

    return res.status(201).json({ user: userCreated, status: 201, message: 'User created successfully' });
}

exports.login = async (req, res) => {
    const { username, password } = req.body;

    if(!username) return res.status(400).send({ message: 'username is required!'})
    if(!password) return res.status(400).send({ message: 'password is required!'})
    
    const userFound = await User.findOne({
        username: username
    })

    if(!userFound){
        return res.status(401).send({ message: 'username/password is incorrect'})
    }

    //let isPasswordValid = (userFound.password === password ? true : false);

    let isPasswordValid = bcript.compareSync(password, userFound.password)

    if(!isPasswordValid){
        return res.status(401).send({ message: 'username/password is incorrect'})
    }

    let token = jwt.sign({ id: userFound.id}, process.env.TOKEN_KEY, {
        expiresIn: 86400 // 24 horas
    })

    return res.status(200).json({ access_token: token, user: userFound, status: 200, message: 'User logged in successfully' });
}