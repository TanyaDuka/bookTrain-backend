const { Schema, model } = require('mongoose');
const Joi = require('joi');
const { schemaValidation } = require('../helpers');

const bookSchema = new Schema(
  {
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
    rating: {
      type: Number,
      enum: [0, 1, 2, 3, 4, 5],
      default: 0,
    },
    resume: {
      type: String,
      default: '',
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    inTrain: {
      type: Boolean,
      default:false
    }
  },
  { versionKey: false }
);


bookSchema.post('save', schemaValidation);


const addSchemaJoi = Joi.object({
      title: Joi.string().min(1).max(50).required(),
      author: Joi.string().min(1).max(50).required(),
      publicDate: Joi.number().integer().required(),
      amountPages:Joi.number().integer().required()
});

const updateSchemaJoi = Joi.object({
    rating: Joi.number().integer().min(1).max(5).required(),
    resume: Joi.string()
})


const schemaJoi = {
    addSchema: addSchemaJoi,
    updateSchema: updateSchemaJoi,
    
}

const Book = model('book', bookSchema);


module.exports = {
    Book,
    schemaJoi
}
