import dbConnect from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import PostModel from "@/models/Post";

export async function GET(request: Request) {
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
        const posts = await PostModel.find({});

        if (!posts || posts.length === 0) {
            return Response.json(
                {
                    success: false,
                    message: "No Post Found"
                },
                {
                    status: 400
                }
            );
        }
        
        return Response.json(
            {
                success: true,
                posts
            },
            {
                status: 200
            }
        );

    } catch (error) {
        console.log("Error in getting all posts ", error);
        return Response.json(
            {
                success: false,
                message: "Error in getting all posts"
            },
            {
                status: 500
            }
        );
    }

}