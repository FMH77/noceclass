const express = require('express');

const router = express.Router();

router.get('/posts', (req, res) => {
    res.send('these are the posts')
})

module.exports = router;