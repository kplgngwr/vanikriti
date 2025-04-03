import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import PostModel from "@/models/Post";
import { getServerSession } from "next-auth";

export async function PUT(
    request: Request,
    { params }: { params: { postId: string } }
) {
    await dbConnect();

    const postID = params.postId;

    const session = await getServerSession(authOptions);
    const user = session?.user;

    if (!session || !user) {
        return new Response(
            JSON.stringify({
                success: false,
                message: "Not Authenticated"
            }),
            {
                status: 401
            }
        );
    }

    try {
        const post = await PostModel.findById(postID);

        if (!post) {
            return new Response(
                JSON.stringify({
                    success: false,
                    message: "No Post found"
                }),
                {
                    status: 400
                }
            );
        }

        post.likes += 1;

        await post.save();

        return new Response(
            JSON.stringify({
                success: true,
                message: "Post Updated successfully"
            }),
            {
                status: 200
            }
        );
    } catch (error) {
        console.log("Error in updating post ", error);
        return new Response(
            JSON.stringify({
                success: false,
                message: "Error in updating post"
            }),
            {
                status: 500
            }
        );
    }
}
