import mongoose from 'mongoose';

const tailorMadeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    countInStock: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);
const TailorMade = mongoose.model('TaliorMade', tailorMadeSchema);

export default TailorMade;