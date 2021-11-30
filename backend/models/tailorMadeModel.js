import mongoose from 'mongoose';

const tailorMadeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    height: {type: Number, required: true},
    width: {type: Number, required: true},
    sleeveCircumference: {type: Number, required: true},
    collarCircumference: {type: Number, required: true},
    chestCircumference: {type: Number, required: true},
    waistCircumference: {type: Number, required: true},
  },
  {
    timestamps: true,
  }
);
const TailorMade = mongoose.model('TaliorMade', tailorMadeSchema);

export default TailorMade;