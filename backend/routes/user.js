const express = require("express");
const zod = require("zod");
const { User, Account } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { authMiddleware } = require("./middleware");
const mongoose = require("mongoose");


const router = express.Router();

const signupSchema = zod.object({
    username: zod.string().email(),
    password: zod.string(),
    firstName: zod.string(),
    lastName: zod.string()
});

const signinSchema = zod.object({
    username: zod.string().email(),
    password: zod.string()
})

const updateSchema = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional()
})

router.post("/signup", async (req,res) => {

    const {success} = signupSchema.safeParse(req.body);

    if (!success) {
        return res.status(411).json({
            message: "Incorrect inputs"
        });
    }

    const existingUser = await User.findOne({
        username: req.body.username
    });

    if (existingUser) {
        return res.status(411).json({
            message: "Email already taken"
        });
    }

    const username = req.body.username;
    const password = req.body.password;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;

    const user = await User.create({
        username,
        password,
        firstName,
        lastName
    });

    const userId = user._id;

    await Account.create({
        userId,
        balance: 1 + Math.random() * 10000
    })

    const token = jwt.sign({
        userId: user._id
    }, JWT_SECRET);

    return res.status(200).json({
        message: "User created successfully",
        token: "Bearer "+token
    });
    
});

router.post("/signin", async (req,res) => {
    const {success} = signinSchema.safeParse(req.body);
    if (!success) {
        return res.status(411).json({
            message: "Error while logging in"
        });
    }
    
    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
    })

    if (user) {
        const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET);
  
        return res.status(200).json({
            token: "Bearer "+token
        });
    } else {
        return res.status(401).json({
            message: "Wrong Credentials"
        })
    }
});

router.put("/", authMiddleware, async (req,res) => {
    const {success} = updateSchema.safeParse(req.body);

    if (!success) {
        return res.status(411).json({
            message: "Error while updating your password"
        })
    }

    const updateFields = {}
    
    if (req.body.password) {
        updateFields.password = req.body.password;
    }

    if (req.body.firstName) {
        updateFields.firstName = req.body.firstName;
    }

    if (req.body.lastName) {
        updateFields.lastName = req.body.lastName;
    }

    await User.updateOne(
        { _id: req.userId },
        { $set: updateFields }
    )

    return res.status(200).json({
        message: "Updated successfully"
    })

})

router.get("/bulk", async (req,res) => {

    const filter = req.query.filter || "";
    const excludeId = req.query.by;
    const users = await User.find({
        $and: [
            { _id: { $ne: excludeId } },
            {
                $or: [
                    { firstName: { $regex: filter, $options: "i" } },
                    { lastName: { $regex: filter, $options: "i" } }
                ]
            }
        ]
    });
    
    if (users.length === 0) {
        return res.json({
            message: 'No users found matching the filter criteria.'
        });
    }
    
    return res.json({
        users: users.map((item) => ({
            username: item.username,
            firstName: item.firstName,
            lastName: item.lastName,
            _id: item._id
        }))
    });
})

router.get("/getUsername", async (req,res) => {
    const id = req.query.id;

    const user = await User.findOne({
        _id: id
    });

    res.status(200).json({
        user
    });
})

module.exports = router;