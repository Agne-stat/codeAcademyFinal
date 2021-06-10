import express from 'express';
import UserController from '../controlers/userControler.js';
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
router.get('/users', UserController.getAllUsers)

export default router;