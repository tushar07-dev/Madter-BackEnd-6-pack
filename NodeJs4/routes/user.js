import express from 'express';
import { deleteUser, getAllUsers, getUserDetail, register, specialFunctions, updateUser } from '../controllers/user.js';

const router = express.Router();

router.get('/all', getAllUsers)

router.post('/new', register);

router.get('/special', specialFunctions);


//* If we have multiple common route with different req,

// router.get('/userid/:id', getUserDetail);
// router.put('/userid/:id', updateUser);
// router.delete('/userid/:id', deleteUser);

// * OR rather repeated common route create on route only 

router
    .route('/userid/:id')
    .get(getUserDetail)
    .put(updateUser)
    .delete(deleteUser);
export default router;