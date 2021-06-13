import MonsterHealth from '../models/MonsterHealth.js';



const addMonsterData = async (req, res) => {

  let monster = new MonsterHealth({
    health: 100,
    user: req.params.id
  })

  try {
    let createdmonster = await monster.save()
    res.json(createdmonster)
  } catch (e) {
    res.status(400).json(e)
  }
}

const getMonsterData = (req, res) => {
  const id=req.params.id;

  MonsterHealth.findById(id)
  .then((data) => res.json(data))
}


const updateMonstersHealth = (req, res) => {
  const id = req.params.id;
  let helthItem = req.body.health;

  MonsterHealth.findByIdAndUpdate(id, {
    health:helthItem
  })
  .then((response) => {
    res.send()
  })
}


export default {
    addMonsterData,
    getMonsterData,
    updateMonstersHealth
}