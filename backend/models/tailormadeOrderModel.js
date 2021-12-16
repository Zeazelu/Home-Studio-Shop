import mongoose from 'mongoose';

const tailormadeOrderSchema = new mongoose.Schema({
    tailormadeOrderItems: [{
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        tailormade: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Tailormade', required: true
        },
    },
    ],
    tailormadeShippingAddress: {
        fullName: { type: String, required: true },
        address: { type: String, required: true },
        postalCode: { type: String, required: true },
        city: { type: String, required: true },
        country: { type: String, required: true },
    },
    dimensions: {
        height: { type: Number, required: true },
        shoulderwidth: { type: Number, required: true },
        collarcircumference: { type: Number, required: true },
        chestcircumference: { type: Number, required: true },
        waistcircumference: { type: Number, required: true },
        sleevecircumference: { type: Number, required: true },
    },
    paymentMethod: { type: String, required: true },
    paymentResult: {
        id: String,
        status: String,
        update_time: String,
        email_address: String,
    },
    tailormadeItemsPrice: { type: Number, required: true },
    shippingPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
    isDelivered: { type: Boolean, default: false },
    deliveredAt: { type: Date },
},
    {
        timestamps: true,
    }
);

const TailormadeOrder = mongoose.model('TailormadeOrder', tailormadeOrderSchema);
export default TailormadeOrder;