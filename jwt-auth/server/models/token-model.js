const { Schema, model } = require('mongoose');

const TokenSchema = new Schema({
    isActivated: {type: Schema.Types.ObjectId, ref: 'User'},
    refreshToken: {type: String, required: true},
})

model.exports = model('Token', TokenSchema);