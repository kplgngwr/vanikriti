import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import bcrypt from 'bcryptjs'
import { getServerSession } from "next-auth";
import { authOptions } from "../[...nextauth]/options";

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
        const { oldPassword, newPassword } = await request.json();
        const username = user.username;
        const foundUser = await UserModel.findOne({
            username,
            isVerified: true
        })

        if (!foundUser) {
            return Response.json(
                {
                    success: false,
                    message: "User not found"
                },
                {
                    status: 400
                }
            )
        }

        if (oldPassword === newPassword) {
            return Response.json(
                {
                    success: false,
                    message: "Old password and new password can not be same"
                },
                {
                    status: 400
                }
            )
        }

        const isOldPasswordMatching = bcrypt.compare(
            oldPassword,
            foundUser.password
        )

        if (!isOldPasswordMatching) {
            return Response.json(
                {
                    success: false,
                    message: "Old Password is incorrect"
                },
                {
                    status: 400
                }
            )
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        foundUser.password = hashedPassword;
        await foundUser.save()

        return Response.json(
            {
                success: true,
                message: "Password Changed Successfully"
            },
            {
                status: 200
            }
        )


    } catch (error) {
        console.log("Error in changing password", error);
        return Response.json(
            {
                success: false,
                message: "Error in changing password"
            },
            {
                status: 500
            }
        )
    }
}