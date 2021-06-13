import mongoose from 'mongoose';

let MonsterSchema = new mongoose.Schema({
    health: {
        type: Number, 
        default: 100
    },
    user: {
        type:String,
        ref:'User'
    }
})


let MonsterHealth = mongoose.model('MonsterHealth', MonsterSchema)

export default MonsterHealth;