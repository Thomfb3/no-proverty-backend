const User = require('./../models/user');
const { resizeImages } = require('../helpers/handlerFileUpload');
const factory = require('../helpers/handlerFactory');
const { UnauthorizedError, NotFoundError } = require("../expressError");

exports.getUser = async (req, res, next) => {
    try {
        const userId = req.params.id
        const user = await User.findById(userId,
            "_id username firstName lastName email profileImage role affiliation resources location dateCreated")

        res.status(200).json({
            status: 'success',
            data: user
        });
    } catch (err) {
        next(err)
    };
};


exports.updateUser = async (req, res, next) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({username: username});
        const authenticated = await user.authenticate(password, user.password);

        if (!authenticated) {
            throw new UnauthorizedError('Incorrect username or password');
        }

        const userData = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            profileImage: req.body.profileImage
        };

        const doc = await User.findByIdAndUpdate(user._id, userData, {
            new: true,
            runValidators: true,
            select:  "_id username firstName lastName email profileImage role affiliation resources location dateCreated"
        });

        if (!doc) {
            throw new NotFoundError('No document found with that ID');
        }

        res.status(200).json({
            status: 'success',
            data: doc
        });
    } catch (err) {
        next(err);
    }
}

exports.resizeUserImages = resizeImages("user");
exports.createUser = factory.createOne(User);
exports.getAllUsers = factory.getAll(User, 100)
exports.deleteUser = factory.deleteOne(User);

