import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
// import validator from 'validator'


let UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: [true, 'This username is taken'] ,
        minLength: 4,
        maxLength: 20,
    },

    password: {
        type: String, 
        minLength: 4,
        required: true,
    },

    image: {
        type: String
    },

    health: {
        type: Number, 
        default: 100
    },

    gold: {
        type: Number, 
        default: 100
    },

    inventoryWeapons: {
        type: [],
    },

    inventoryArmors: {
        type: []
    },
    
    inventoryPotions: {
        type: []
    },

    secretKey: [{
        token: String
    }]

})

UserSchema.pre('save', function(next) {
    let user = this;
    if (user.isModified('password')) {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user.password, salt, (err, hash) => {
          user.password = hash
          next()
        })
      })
    } else {
      next()
    }
})

let User = mongoose.model('User', UserSchema)

export default User;