import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
// import defaultImage from '../images/profile.png'


const signUp = async (req, res) => {
    let user = new User(req.body)
    try {
      let createdUser = await user.save()
      res.json(createdUser)
    } catch (e) {
      res.status(400).json(e)
    }
}

const login = async (req, res) => {
    try {
      let user = await User.findOne({
        username: req.body.username
    })
    if(user){
        if(!user.image) {
          user.image = `http://localhost:5000/images/profile.png`;
        }
        let response = await bcrypt.compare(req.body.password, user.password)

    if (!response) throw 'Incorrect password'
    }else {
        throw "User doesn't exist"
    }
      let token = await jwt.sign({
        _id: user._id.toHexString()
      }, 'dntpwnme8').toString()
      user.sessionToken.push({
        token
    })
      
      await user.save()
      res.header('gameUser-id', token).json(user)
    } catch (e) {
      console.log(e)
      res.status(400).json(e)
    }
}

const getAllUsers = async (req,res) => {
    try {
        let users = await User.find({})
        res.json(users);
    } catch(e) {
        console.log(e)
    }
}

export default {
    signUp,
    login,
    getAllUsers
}