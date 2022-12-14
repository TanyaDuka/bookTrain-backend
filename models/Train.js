const { Schema, model } = require('mongoose');
const Joi = require('joi');
const { schemaValidation } = require('../helpers');

const trainingSchema = new Schema(
    {
        startDate: {
            type: Number,
            required: [true, "startDate must be exist"],
        },
        finishDate: {
            type: Number,
            required: [true, "finishDate must be exist"],
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },
        book: [{
            title: {
                type: String,
                required: [true, "Title must be exist"],
            },
            author: {
                type: String,
                required: [true, "Title must be exist"],
            },
            publicDate: {
                type: Number,
                required: [true, "publicDate must be exist"],
            },
            amountPages: {
                type: Number,
                required: [true, "amountPage must be exist"],
            },
            status: {
                type: String,
                enum: ["goingToRead", "readingNow", "alreadyRead"],
                default: "goingToRead",
            },
            
        }],
        statistic: [{
            date: {
                type: String,
                required: [true, "date must be exist"],
            },
            createAt: {
                type: String,
                required: [true, "date must be exist"],
            },
            amountPages: {
                type: Number,
                required: [true, "amountPage must be exist"],
            }
        }]
    },
    { versionKey: false }
)


trainingSchema.post('save', schemaValidation)

const addTimeTrainSchemaJoi = Joi.object({
    startDate:Joi.number().integer().required(),
    finishDate: Joi.number().integer().required(),
    book:Joi.array()
});

const updateStatusSchemaJoi = Joi.object({
    status:Joi.string().valid("goingToRead", "readingNow", "alreadyRead").required()
})

const addStatisticSchemaJoi = Joi.object({
    date: Joi.string().required(),
    createAt:Joi.string().required(),
    amountPages:Joi.number().integer().required()
});

const schemaJoi = {
    addTimeTrain:addTimeTrainSchemaJoi,
    updateStatusSchema: updateStatusSchemaJoi,
    addStatistic:addStatisticSchemaJoi
}

const Train = model('train', trainingSchema);

module.exports = {
    Train,
    schemaJoi
}
