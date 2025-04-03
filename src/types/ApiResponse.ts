import { Plant } from "@/models/Plant";
import { Post } from "@/models/Post";

export interface ApiResponse{
    success:boolean,
    message:string,
    token?:string,
    plants?:Array<Plant>
    posts?:Array<Post>
}