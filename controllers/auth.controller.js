const User = require("../models/user");

exports.register = async (req, res) => {
    const { name, username, password } = req.body;

    const user = new User({
        name: name,
        username: username,
        password: password
    })

    const userCreated = await user.save();

    if(!userCreated){
        return res.status(404).send({ message: 'User not created'})
    }

    return res.status(201).json({ user: userCreated, status: 201, message: 'User created successfully' });
}

exports.login = async (req, res) => {
    const { username, password } = req.body;
    
    const userFound = await User.findOne({
        username: username
    })

    if(!userFound){
        return res.status(401).send({ message: 'username/password is incorrect'})
    }

    let isPasswordValid = (userFound.password === password ? true : false);

    if(!isPasswordValid){
        return res.status(401).send({ message: 'username/password is incorrect'})
    }

    return res.status(200).json({ user: userFound, status: 200, message: 'User logged in successfully' });
}