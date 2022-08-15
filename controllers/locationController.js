const Location = require('./../models/location');
const factory = require('../helpers/handlerFactory');

exports.createLocation = factory.createOne(Location)
exports.getLocation = factory.getOne(Location);
exports.getAllLocations = factory.getAll(Location, 100);
exports.updateLocation = factory.updateOne(Location)
exports.deleteLocation = factory.deleteOne(Location);

