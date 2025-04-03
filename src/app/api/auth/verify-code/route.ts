import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";

export async function POST(request: Request) {
    await dbConnect();

    try {
        const { username, code } = await request.json();

        const decodedUsername = decodeURIComponent(username);
        const user = await UserModel.findOne({ username: decodedUsername });

        if (!user) {
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

        if (user?.isVerified) {
            return Response.json(
                {
                    success: false,
                    message: "User already verified"
                },
                {
                    status: 400
                }
            )
        }

        const isCodeValid = user.verifyCode === code;
        const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date();

        console.log(user.verifyCode);
        console.log(user.verifyCodeExpiry);
        console.log(isCodeValid);
        console.log(isCodeNotExpired);

        if (isCodeValid && isCodeNotExpired) {
            user.isVerified = true;
            await user.save()

            return Response.json(
                {
                    success: true,
                    message: "User Verified Successfully"
                },
                {
                    status: 200
                }
            )
        }
        else if (!isCodeNotExpired) {
            return Response.json(
                {
                    success: false,
                    message: "Verification Code Expired. Please SignUp again to get new code."
                },
                {
                    status: 400
                }
            )
        }
        else {
            return Response.json(
                {
                    success: false,
                    message: "Invalid Verification Code"
                },
                {
                    status: 400
                }
            )
        }

    } catch (error) {
        console.error("Error Verifying User", error);
        return Response.json(
            {
                success: false,
                message: "Error Verifying User"
            },
            {
                status: 500
            }
        )
    }
}