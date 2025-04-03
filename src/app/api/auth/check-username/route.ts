// api/auth/check-username
import dbConnect from '@/lib/dbConnect';
import UserModel from '@/models/User';
import { usernameValidation } from '@/schemas/signUpSchema';
import { z } from 'zod';

const UsernameQuerySchema = z.object({
    username: usernameValidation
})

export async function GET(request: Request) {
    await dbConnect();
    
    try {
        const { searchParams } = new URL(request.url);
        const username = searchParams.get('username');
        
        const result = UsernameQuerySchema.safeParse({ username });

        if (!result.success) {
            const usernameErrors = result.error.format().username?._errors || [];
            return new Response(
                JSON.stringify({
                    success: false,
                    message: usernameErrors.length > 0 ? usernameErrors.join(", ") : "Invalid Query Parameters"
                }), 
                { status: 400 }
            );
        }

        const existingVerifiedUser = await UserModel.findOne({ username, isVerified: true });

        if (existingVerifiedUser) {
            return new Response(
                JSON.stringify({
                    success: false,
                    message: "Username is already taken"
                }), 
                { status: 400 }
            );
        }

        return new Response(
            JSON.stringify({
                success: true,
                message: "Username is available"
            }), 
            { status: 200 }
        );

    } catch (error) {
        console.error("Error in username validation", error);
        return new Response(
            JSON.stringify({
                success: false,
                message: "Error checking username"
            }), 
            { status: 500 }
        );
    }
}
