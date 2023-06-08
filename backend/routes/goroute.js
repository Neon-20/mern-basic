const express = require('express');
const router = express.Router();
const { getGoals } = require('../controller/goalController');
const { setGoals } = require('../controller/goalController');
const { updateGoals } = require('../controller/goalController');
const { deleteGoals } = require('../controller/goalController');

const {protect} = require('../middleware/authMiddleware')

//Creating routes
router.route('/').get(protect, getGoals).post(protect,setGoals)
router.route('/:id').put(protect,updateGoals).delete(protect,deleteGoals)

module.exports = router
