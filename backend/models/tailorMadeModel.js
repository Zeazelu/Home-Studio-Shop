import mongoose from 'mongoose';

const tailormadeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    
  },
  {
    timestamps: true,
  }
);
const Tailormade = mongoose.model('Taliormade', tailormadeSchema);

export default Tailormade;