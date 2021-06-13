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

const sellWeapon = (req, res) => {
    const id = req.params.id;
    let weaponItme = req.body.weapon;
    let goldItme = req.body.gold;
  
    User.findByIdAndUpdate(id, {
        inventoryWeapons:weaponItme,
        gold:goldItme
    })
    .then((response) => {
      res.send()
    })
}

const sellArmor = (req, res) => {
    const id = req.params.id;
    let armorItme = req.body.armor;
    let goldItme = req.body.gold;
  
    User.findByIdAndUpdate(id, {
        inventoryArmors:armorItme,
        gold:goldItme
    })
    .then((response) => {
      res.send()
    })
}

const sellPotion = (req, res) => {
    const id = req.params.id;
    let potionItme = req.body.potion;
    let goldItme = req.body.gold;
  
    User.findByIdAndUpdate(id, {
        inventoryPotions:potionItme,
        gold:goldItme
    })
    .then((response) => {
      res.send()
    })
}

export default {
    addWeapon,
    addArmor,
    addPotion,
    sellWeapon,
    sellArmor,
    sellPotion
}