import dbConnect from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "../[...nextauth]/options";
import UserModel from "@/models/User";

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
        const username = user.username;
        const foundUser = await UserModel.findOne({ username }).select("-password");

        if(!foundUser){
            return Response.json(
                {
                    success: false,
                    message: "User not found"
                },
                {
                    status: 400
                }
            );
        }

        return Response.json(
            {
                success: true,
                message: foundUser
            },
            {
                status: 200
            }
        );

    } catch (error) {
        console.log("Error in getting user", error);
        return Response.json(
            {
                success: false,
                message: "Error in getting user"
            },
            {
                status: 500
            }
        )
    }
}