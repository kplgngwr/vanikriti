import { Document, Schema } from "mongoose";
import { Plant, PlantSchema } from "./Plant";

export interface Order extends Document {
    orderId: string;
    product:Plant[],
    paymentStatus: boolean;
}

export const OrderSchema: Schema<Order> = new Schema({
    orderId: {
        type: String,
        required: [true, "Order ID is required"],
        unique: true,
    },
    product:[PlantSchema],
    paymentStatus:{
        type:Boolean,
        default:false
    }
})
