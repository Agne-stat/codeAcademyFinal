import User from '../models/userModel.js';

const addWeapon = async (req, res) => {
    const id = req.params.id;
    const inventory = req.body;
    

    User.findByIdAndUpdate(id, {
        inventoryWeapons: inventory.weapon
    })
    .then((response) => {
        res.send()
    })
}

const addArmor = async (req, res) => {
    const id = req.params.id;
    const inventory = req.body;


    User.findByIdAndUpdate(id, {
        inventoryArmors: inventory.armor
    })
    .then((response) => {
        res.send()
    })
}

const addPotion = async (req, res) => {
    const id = req.params.id;
    const inventory = req.body;

    User.findByIdAndUpdate(id, {
        inventoryPotions:inventory.potion
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