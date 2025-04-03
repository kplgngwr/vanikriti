import { resend } from "@/lib/resend";
import { ApiResponse } from "@/types/ApiResponse";
import ResetPasswordEmail from "../../emails/PasswordReset";

export async function sendPasswordResetMail(
    email: string,
    username: string,
    resetPasswordLink: string,
): Promise<ApiResponse> {
    try {
        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to:email,
            subject:'Password Reset Email',
            react: ResetPasswordEmail({username, resetPasswordLink})
        })
        return {success:true, message:"Password reset email send successfully"}
    } catch (emailError) {
        console.error("Error sending password reset email : ", emailError);
        return { success: false, message: "Failed to send Password Reset Email" }
    }
}