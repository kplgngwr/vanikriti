import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import { z } from "zod";
import jwt, { JwtPayload } from "jsonwebtoken"
import crypto from "crypto"
import bcrypt from "bcryptjs"

const TokenQuerySchema = z.object({
    token: z.string()
})


export async function POST(request: Request) {
    await dbConnect();

    try {

        const { searchParams } = new URL(request.url);
        const queryParams = {
            token: searchParams.get('token')
        }

        const result = TokenQuerySchema.safeParse(queryParams)

        if (!result.success) {
            const tokenErrors = result.error.format().token?._errors || []
            return Response.json(
                {
                    success: false,
                    message: tokenErrors?.length > 0 ? tokenErrors.join(", ") : "Invalid Query Parameters"
                },
                {
                    status: 400
                }
            )
        }

        const { token } = result.data;

        if (!token) {
            return Response.json(
                {
                    success: false,
                    message: "Token not found"
                },
                {
                    status: 400
                }
            );
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

        const { hash } = decoded;

        if (!hash) {
            return Response.json(
                {
                    success: false,
                    message: "Data from Token can't be retrieved"
                },
                {
                    status: 400
                }
            );
        }

        // Find the user by verifying the hash
        const users = await UserModel.find({ isVerified: true });
        const user = users.find(user => crypto.createHash('sha256').update(user.username).digest('hex') === hash);

        if (!user) {
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

        const { password } = await request.json();

        const hashedPassword = await bcrypt.hash(password, 10);

        user.password = hashedPassword
        await user.save();

        return Response.json(
            {
                success: true,
                message: "Password reset successfully"
            },
            {
                status: 200
            }
        );


    } catch (error) {
        console.log("Error in resetting password ", error);
        return Response.json(
            {
                success: false,
                message: "Error in resetting password"
            },
            {
                status: 500
            }
        );
    }
}