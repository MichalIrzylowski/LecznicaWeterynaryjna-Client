require('dotenv').load();
import express from 'express';
import jwt from 'jsonwebtoken';
import {User, Message} from '../models';
import {registerUser, loginUser, makeSureUserIsLoggedIn, makeSureCorrectUser, editUser} from './handlers/authenticate';
import {getMessages, createMessage, deleteMessage} from './handlers/messages';
import {upload} from '../models';

const router = express.Router();

router.post('/update_user_image/:user_id', async function (req, res, next) {
  upload(req, res, (err) => {
    console.log(req.file)
    if (err) {
      console.log(err)
      return res.status(500).json(err)
    }
    return res.status(200)
  })
})

router.put('/user_update/:user_id', editUser)
router.post('/user_register', registerUser);
router.post('/login_user', loginUser);
router.get('/get_messages', getMessages)
router.post('/post_message/:user_id', makeSureUserIsLoggedIn, makeSureCorrectUser, createMessage)
router.delete('/delete_message/:user_id/:message_id', makeSureUserIsLoggedIn, makeSureCorrectUser, deleteMessage)

export default router;
