const mongoose = require('mongoose');
const { Schema } = mongoose;

const IdeaSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String
        },
        sketches: [{
            type: String
        }],
        votes: [{
            vote: {
                type: Boolean,
                required: true,
            },
            user: {
                type: Schema.Types.ObjectId,
                ref: 'user',
                autopopulate: { select: '_id' }
            },
        }],
        author: {
            type: Schema.Types.ObjectId,
            ref: 'user',
            required: true,
            autopopulate: { select: 'username avatar' }
        },
        comments: [{
            comment: {
                type: String,
                required: true
            },
            user: {
                type: Schema.Types.ObjectId,
                ref: 'user',
                required: true,
                autopopulate: { select: 'username avatar' }
            },
            createdAt: {
                type: Date,
                required: true
            }
        }]
    },
    { 
        timestamps: {
            createdAt: true, 
            updatedAt: true
        }
    }
);

IdeaSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('idea', IdeaSchema);