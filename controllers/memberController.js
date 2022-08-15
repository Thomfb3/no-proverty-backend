const Member = require('./../models/member');
const { resizeImages } = require('../helpers/handlerFileUpload');
const factory = require('../helpers/handlerFactory');

exports.resizeUserImages = resizeImages("member");
exports.createMember = factory.createOne(Member)
exports.getMember = factory.getOne(Member);
exports.getAllMembers = factory.getAll(Member, 100);
exports.getAllMembersForUser = factory.getAllperUser(Member);
exports.updateMember = factory.updateOne(Member)
exports.deleteMember = factory.deleteOne(Member);

