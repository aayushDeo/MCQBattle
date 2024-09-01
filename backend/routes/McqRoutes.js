const express = require('express');
const router = express.Router();
const {addMcq, getUserMcqs, getAllMCQs, updateMcq, deleteMcq} = require('../controllers/McqController');
const validateTokenHandler = require('../middleware/validateTokenHandler');

router.post('/', validateTokenHandler, addMcq);
router.get('/', getAllMCQs);
router.get('/user', validateTokenHandler, getUserMcqs); // New route for getting user's MCQs
router.put('/:id', validateTokenHandler, updateMcq);
router.delete('/:id', validateTokenHandler, deleteMcq);

module.exports = router;
