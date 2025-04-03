import { sendVerificationEmail } from "@/helpers/sendVerificationMail";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import bcrypt from "bcryptjs"

export async function POST(request: Request) {
    await dbConnect();

    try {
        const { name, username, email, password } = await request.json();

        const exisitingUserVerifiedByUsername = await UserModel.findOne({
            username,
            isVerified: true
        });

        if (exisitingUserVerifiedByUsername) {
            return Response.json(
                {
                    success: false,
                    message: "Username is already taken"
                },
                {
                    status: 400
                }
            )
        }

        const exisitingUserByEmail = await UserModel.findOne({email})

        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString()

        if (exisitingUserByEmail) {
            if (exisitingUserByEmail.isVerified) {
                return Response.json(
                    {
                        success: false,
                        message: "User is already registerd"
                    },
                    {
                        status: 500
                    }
                )
            }
            else {
                const hashedPassword = await bcrypt.hash(password, 10);
                exisitingUserByEmail.password = hashedPassword;
                exisitingUserByEmail.verifyCode = verifyCode;
                exisitingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000);
                await exisitingUserByEmail.save();
            }
        }
        else {
            const hashedPassword = await bcrypt.hash(password, 10);
            const verifyCodeExpiry = new Date(Date.now() + 3600000);

            const newUser = new UserModel({
                name,
                username,
                email,
                password: hashedPassword,
                verifyCode,
                verifyCodeExpiry,
                isVerified: false,
                orders: []
            })

            await newUser.save();
        }

        const emailResponse = await sendVerificationEmail(email, username, verifyCode);

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
                message: "User Registered successsfully. Please verify your email"
            },
            {
                status: 201
            }
        )
    } catch (error) {
        console.error("Error registering user ", error);
        return Response.json(
            {
                success: false,
                message: "Error in registering user"
            },
            {
                status: 500
            }
        )
    }
}