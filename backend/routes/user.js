const express = require('express');
const router = express.Router();

router.get('/users', (req, res) => {
    res.send({ data: 'Here is your user data' });
});

router.post('/users', (req, res) => {
    res.send({ data: 'User Created' });
});

router.put('/users', (req, res) => {
    res.send({ data: 'User Updated' });
});

router.delete('/users', (req, res) => {
    res.send({ data: 'User Deleted' });
});

module.exports = router;
