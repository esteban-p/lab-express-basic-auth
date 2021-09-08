const router = require("express").Router();
const User = require('../models/User.model');
const bcrypt = require('bcrypt');



router.get('/signup', (req, res, next) => {
    res.render('signup');
})

router.post('/signup', (req, res, next) => {
    console.log(req.body);
    const { username, password } = req.body;
    User.findOne({ username: username})
        .then(userFromDB => {
            if (userFromDB !== null) {
                res.render('signup', {message: 'Username taken'});
                return;
            } else {
                const salt = bcrypt.genSaltSync();
                const hash = bcrypt.hashSync(password, salt);
                console.log('Hash is: ', hash);
                User.create({username: username, password: hash})
                    .then(createdUser => {
                        console.log(createdUser);
                        res.redirect('/');
                    })
                    .catch(err => next(err));
            }

        })
})


module.exports = router;