import * as UserControllser from '../controlers/users';
import express from 'express';

const router = express.Router();

router.post('/signup',UserControllser.singUp);
router.post('/signin',UserControllser.signIn);

export default router;


