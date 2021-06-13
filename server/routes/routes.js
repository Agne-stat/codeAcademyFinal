import express from 'express';
import UserController from '../controlers/userControler.js';
import UserInventoryController from '../controlers/userInventoryControler.js';
import MonsterControler from '../controlers/monsterControler.js';
import UserMiddleware from '../models/authenticate.js';
import multer from 'multer';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname)
  }
})
const upload = multer({
  storage
})

// testing
router.get('/', (req, res) => {
    res.json('Hello')
})


router.post('/signup', UserController.signUp);
router.post('/login', UserController.login);
router.get('/user/:id', UserController.getUserData);
router.put('/updateUserData/:id', UserController.updateUserData);
router.put('/updateUserHealth/:id', UserController.updateUserHealth);
router.get('/users', UserController.getAllUsers);
router.put('/addWeapon/:id', UserInventoryController.addWeapon)
router.put('/addArmor/:id', UserInventoryController.addArmor)
router.put('/addPotion/:id', UserInventoryController.addPotion)
router.put('/sellWeapon/:id', UserInventoryController.sellWeapon)
router.put('/sellArmor/:id', UserInventoryController.sellArmor)
router.put('/sellPotion/:id', UserInventoryController.sellPotion)
router.post('/addMonsterData', MonsterControler.addMonsterData);
router.get('/getMonsterData/:id', MonsterControler.getMonsterData)
router.put('/updateMonstersHealth/:id', MonsterControler.updateMonstersHealth);

export default router;