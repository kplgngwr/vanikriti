import mongoose, { Document, Schema } from "mongoose";

interface Caring {
    wateringCost: string;
    pestControlCost: string;
    manureCost: string;
    humusCost: string;
}

const CaringSchema: Schema<Caring> = new Schema({
    wateringCost: {
        type: String,
        required: [true, "Watering Cost is required"]
    },
    pestControlCost: {
        type: String,
        required: [true, "Pest Control Cost is required"]
    },
    manureCost: {
        type: String,
        required: [true, "Manure Cost is required"]
    },
    humusCost: {
        type: String,
        required: [true, "Humus Cost is required"]
    }
})

export interface Plant extends Document {
    name: string;
    description: string;
    price: number;
    category: string;
    plantImage: string;
    plantStatus: boolean;
    caring: Caring[];
    user: object;
}

export const PlantSchema: Schema<Plant> = new Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true
        },
        description: {
            type: String,
            required: [true, "Description is required"],
            trim: true
        },
        price: {
            type: Number,
            required: true,
        },
        category: {
            type: String,
            required: [true, "Category is required"],
        },
        plantImage: {
            type: String
        },
        plantStatus: {
            type: Boolean,
            default: false,
        },
        caring: [CaringSchema],
        user: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: [true, "User id required"],
        },
    },
    {
        timestamps: true
    }
);

const PlantModel = (mongoose.models.Plant as mongoose.Model<Plant>) || (mongoose.model<Plant>("Plant", PlantSchema));

export default PlantModel;