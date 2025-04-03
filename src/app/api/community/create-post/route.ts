import dbConnect from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import PostModel from "@/models/Post";

export async function POST(request: Request) {
    await dbConnect();

    // Get the user session
    const session = await getServerSession(authOptions);
    const user = session?.user;

    // Check if the user is authenticated
    if (!session || !user) {
        return Response.json(
            {
                success: false,
                message: 'Not authenticated'
            },
            {
                status: 401
            }
        );
    }

    try {

        const { content, hastags, image } = await request.json();

        const newPost = new PostModel({
            user: user._id,
            content,
            hastags,
            image
        })

        await newPost.save();
        return Response.json(
            {
                success: true,
                message: "Post Created Successfully"
            },
            {
                status: 200
            }
        );
    } catch (error) {
        console.log("Error in creating post ", error);
        return Response.json(
            {
                success: false,
                message: "Error in creating post"
            },
            {
                status: 500
            }
        );
    }
}