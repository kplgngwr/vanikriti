import crypto from 'crypto';
import { sendPasswordResetMail } from "@/helpers/sendPasswordResetMail";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import jwt from 'jsonwebtoken'

export async function POST(request: Request) {
    await dbConnect();

    try {
        const { username } = await request.json();

        const user = await UserModel.findOne({ username, isVerified: true });

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
        const hash = crypto.createHash('sha256').update(user.username).digest('hex');

        const token = jwt.sign(
            { hash },
            process.env.JWT_SECRET!,
            { expiresIn: '15m' }
        );

        const passwordResetLink = `${process.env.BASE}/reset/token?token=${token}`;

        const emailResponse = await sendPasswordResetMail(user.email, user.username, passwordResetLink);

        if (!emailResponse.success) {
            return Response.json(
                {
                    success: false,
                    message: emailResponse.message
                },
                {
                    status: 500
                }
            )
        }

        return Response.json(
            {
                success: true,
                message: "Password Reset Mail Sent"
            },
            {
                status: 200
            }
        );

    } catch (error) {
        console.log("Error in sending password reset mail", error);
        return Response.json(
            {
                success: false,
                message: "Error in sending password reset mail"
            },
            {
                status: 500
            }
        )
    }
}