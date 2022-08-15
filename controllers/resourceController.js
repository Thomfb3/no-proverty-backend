const Resource = require('./../models/resource');
const factory = require('../helpers/handlerFactory');

exports.createResource = factory.createOne(Resource)
exports.getResource = factory.getOne(Resource);
exports.getAllResources = factory.getAll(Resource, 100);
exports.getAllResourcesForUser = factory.getAllperUser(Resource);
exports.updateResource = factory.updateOne(Resource)
exports.deleteResource = factory.deleteOne(Resource);

