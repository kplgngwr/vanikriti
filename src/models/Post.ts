import mongoose, { Document, Schema } from "mongoose";

export interface Post extends Document {
    content: string;
    image: string;
    hashtags: string;
    user: object;
    likes:number;
}

export const PostSchema: Schema<Post> = new Schema(
    {
        content: {
            type: String,
            required: [true, "Content is required"],
            trim: true
        },
        image: {
            type: String,
        },
        hashtags: {
            type: String,
            required: [true, "Hash Tag is required"],
        },
        user: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: [true, "User id required"],
        },
        likes:{
            type:Number,
            default:0
        }
    },
    {
        timestamps: true
    }
);

const PostModel = (mongoose.models.Post as mongoose.Model<Post>) || (mongoose.model<Post>("Post", PostSchema));

export default PostModel;