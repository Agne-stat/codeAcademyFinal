import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';


const signUp = async (req, res) => {
    let user = new User(req.body)
    
    try {
      let createdUser = await user.save()
      res.json(createdUser)
    } catch (e) {
      res.status(400).send(e)
      console.log(e)
      // res.status(400).json(e)
      // if(!req.body.username) {
      //   res.send({
      //     success: false,
      //     message: "Missing username"
      //   })
      // }
      // if(!req.body.password.length < 4) {
      //   res.send({
      //     success: false,
      //     message: "Pass"
      //   })
      // }
      
    }

    
}

const login = async (req, res) => {
    try {
      let user = await User.findOne({
        username: req.body.username
    })
    if(user){
        if(!user.image) {
          user.image = `http://localhost:5000/images/avatar.png`;
        }
        let response = await bcrypt.compare(req.body.password, user.password);

    if (!response) throw 'Incorrect password'
    }else {
        throw "User doesn't exist"
    }
      let token = await jwt.sign({
        _id: user._id.toHexString()
      }, 'dntpwnme8').toString()
      user.secretKey.push({
        token
    })
      
      await user.save()
      res.header('gameUser-id', token).json(user)
    } catch (e) {
      console.log(e)
      res.status(400).json(e)
    }
}


const getUserData = (req, res) => {
  const id=req.params.id;
  User.findById(id)
  .then((data) => res.json(data))
}

const updateUserData = (req, res) => {
  const id = req.params.id;
  let goldItme = req.body.gold;

  User.findByIdAndUpdate(id, {
    gold:goldItme
  })
  .then((response) => {
    res.send()
  })
}

const updateUserHealth = (req, res) => {
  const id = req.params.id;
  let helthItem = req.body.health;

  User.findByIdAndUpdate(id, {
    health:helthItem
  })
  .then((response) => {
    res.send()
  })
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
    getUserData,
    updateUserData,
    updateUserHealth,
    getAllUsers
}