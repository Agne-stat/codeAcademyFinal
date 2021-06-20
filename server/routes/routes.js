import express from 'express';
import UserController from '../controlers/userControler.js';
import UserInventoryController from '../controlers/userInventoryControler.js';

const router = express.Router();


// testing
router.get('/', (req, res) => {
    res.json('Hello')
})

router.post('/signup', UserController.signUp);
router.post('/login', UserController.login);
router.get('/user/:id', UserController.getUserData);
router.put('/updateUserData/:id', UserController.updateUserData);
router.put('/updateUserHealth/:id', UserController.updateUserHealth);
router.put('/updateUsername/:id', UserController.updateUsername);
router.get('/users', UserController.getAllUsers);
router.put('/addWeapon/:id', UserInventoryController.addWeapon)
router.put('/addArmor/:id', UserInventoryController.addArmor)
router.put('/addPotion/:id', UserInventoryController.addPotion)
router.put('/sellWeapon/:id', UserInventoryController.sellWeapon)
router.put('/sellArmor/:id', UserInventoryController.sellArmor)
router.put('/sellPotion/:id', UserInventoryController.sellPotion)
router.delete('/removeUsers', UserController.removeUsers)

export default router;