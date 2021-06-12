import User from '../models/userModel.js';

const addWeapon = async (req, res) => {
    const id = req.params.id;
    const inventory = req.body;
    

    User.findByIdAndUpdate(id, {
        inventory: inventory.weapon
    })
    .then((response) => {
        res.send()
    })
}

const addArmor = async (req, res) => {
    const id = req.params.id;
    const inventory = req.body;


    User.findByIdAndUpdate(id, {
        inventory: inventory.armor
    })
    .then((response) => {
        res.send()
    })
}

const addPotion = async (req, res) => {
    const id = req.params.id;
    const inventory = req.body;

    User.findByIdAndUpdate(id, {
        inventory:inventory.potion
    })
    .then((response) => {
        res.send()
    })
}

export default {
    addWeapon,
    addArmor,
    addPotion
}