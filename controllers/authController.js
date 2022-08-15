const User = require("../models/user");
const { createToken } = require("../helpers/token");
const { BadRequestError } = require("../expressError");
const catchAsync = require('../helpers/catchAsync');


/** Returns JWT token which can be used to authenticate further requests.
 *  Authorization required: none **/
 exports.authenticateAndGetToken = catchAsync(async (req, res, next) => {
    try {
        const { username, password } = req.body;

        //authenticate the username and password
        const user = await User.findOne({ username: username });
         
        if (!user) {
            //Return token with username and team if user has team
            throw new BadRequestError("Invalid Username", 400);
        };
        const authenticated = await user.authenticate(password, user.password);
 
        if (!authenticated) {
            //Return token with username and team if user has team
            throw new BadRequestError("Invalid Password", 400);
        };
        const token = createToken(user);
        return res.json({ token });
        
    } catch (err) {
        return next(err);
    };
});


/** Returns JWT token which can be used to authenticate further requests.
 *  Authorization required: none **/
 exports.registerAndGetToken = catchAsync(async (req, res, next) => {
    try {
        if(req.body.password.length < 8) {
            throw new BadRequestError("Password must be at least 8 characters.", 400);
        }

        if(req.body.username.length < 5) {
            throw new BadRequestError("Username must be at least 5 characters.", 400);
        }

        const newUser = await User.create({ ...req.body, role: "user" });
        const token = createToken(newUser);
        //Return token token with username and no team
        return res.status(201).json({ token });
    } catch (err) {
        return next(err.code === 11000 
            ?   new BadRequestError('Username or Email already exist', 400)
            :   err);
    };
});
