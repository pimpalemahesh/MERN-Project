const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send("Hello world from router");
})

const User = require('../modal/userSchema')


router.post('/register', async (req, res) => {

    const { name, email, phone, profession, password, cpassword } = req.body;

    if (!name || !email || !phone || !profession || !password || !cpassword) {
        return res.status(422).json({ error: "Please, fill all the fields properly." });
    }

    // Using Promise

    // User.findOne({email:email})
    // .then((userExist) => {
    //     if(userExist){
    //         return res.status(422).json({error : "User with this email id is already exist."});
    //     }

    //     const user = new User({name, email, phone, profession, password, cpassword});
    //     user.save().then(() => {
    //         res.status(201).json({message : "User registered successfully."});
    //     })
    //     .catch((err) => {
    //         res.status(500).json({error: "Failed to register"});
    //     })
    // })
    // .catch((err) => {
    //     console.log(err);
    // })

    // Using Async funcition
    try {
        const userExist = await User.findOne({ email: email })
        if (userExist) {
            return res.status(422).json({ error: "User with this email id is already exist." });
        }

        const user = new User({ name, email, phone, profession, password, cpassword });

        const userRegister = await user.save();
        if (userRegister) {
            res.status(201).json({ message: "User registered successfully." });
        } else {
            res.status(500).json({ error: "Failed to register" });
        }
    } catch (error) {
        console.log(error);
    }
})

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(422).json({ error: "Please, fill all fields properly." });
        }

        const userLogin = await User.findOne({ email: email });
        if (userLogin && userLogin.password === password) {
            res.json({ status: 200, message: "Successful Login" });
        } else {
            // 400 : bad request
            res.json({ status: 422, error: "User not exist" });
        }

    } catch (error) {
        // 500 : database error
        res.status(500).json({ error: error });
    }
})

module.exports = router;