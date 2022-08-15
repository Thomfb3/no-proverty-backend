const catchAsync = require('./catchAsync');
const { BadRequestError, NotFoundError } = require("../expressError");

exports.createOne = Model =>
    catchAsync(async (req, res, next) => {
        try {
            const doc = await Model.create(req.body);

            res.status(201).json({
                status: 'success',
                data: doc
            });
        } catch (err) {
            next(err);
        }
    });

exports.getOne = (Model, popOptions) =>
    catchAsync(async (req, res, next) => {
        try {
            let query = Model.findById(req.params.id);
            if (popOptions) query = query.populate(popOptions);
            const doc = await query;

            if (!doc) {
                return next(new BadRequestError('No document found with that ID'));
            }
            res.status(200).json({
                status: 'success',
                data: doc
            });
        } catch (err) {
            next(err);
        }
    });

exports.updateOne = Model =>
    catchAsync(async (req, res, next) => {
        try {
            const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true
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
    });


exports.deleteOne = Model =>
    catchAsync(async (req, res, next) => {
        try {
            const doc = await Model.findByIdAndDelete(req.params.id);

            if (!doc) {
                throw new NotFoundError('No document found with that ID');
            }
            res.status(200).json({
                status: 'success',
                data: { message: "Deleted!", }
            });

        } catch (err) {
            next(err);
        }
    });