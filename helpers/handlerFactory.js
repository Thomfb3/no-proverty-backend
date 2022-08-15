const catchAsync = require('./catchAsync');
const APIFeatures = require('./apiFeatures');
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

exports.getAll = (Model, limit) =>
    catchAsync(async (req, res, next) => {
        try {
            let query = Model.find().limit(limit);
            // if (popOptions) query = query.populate(popOptions);
            const doc = await query;

            res.status(200).json({
                status: 'success',
                data: doc
            });
        } catch (err) {
            next(err);
        }
    });

exports.getAllperUser = Model =>
    catchAsync(async (req, res, next) => {
        try {
            let filter = { userId: userId };
            const features = new APIFeatures(Model.find(filter), req.query)
                .filter()
                .sort()
                .limitFields()
                .paginate();
            const doc = await features.query;

            res.status(200).json({
                status: 'success',
                results: doc.length,
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