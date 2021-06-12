import express from 'express';
import UserController from '../controlers/userControler.js';
import UserInventoryController from '../controlers/userInventoryControler.js';
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
router.get('/users', UserController.getAllUsers);
router.put('/addWeapon/:id', UserInventoryController.addWeapon)
router.put('/addArmor/:id', UserInventoryController.addArmor)
router.put('/addPotion/:id', UserInventoryController.addPotion)

export default router;