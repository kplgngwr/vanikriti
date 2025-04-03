import dbConnect from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import PlantModel from "@/models/Plant";

export async function GET(
    request: Request,
    { params }: { params: { plantId: string } }
) {
    await dbConnect();

    const plantID = params.plantId;

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
        const plants = await PlantModel.findById(plantID);

        if (!plants) {
            return Response.json(
                {
                    success: false,
                    message: "No Plant Found"
                },
                {
                    status: 400
                }
            );
        }
        
        return Response.json(
            {
                success: true,
                plants
            },
            {
                status: 200
            }
        );

    } catch (error) {
        console.log("Error in getting all plants ", error);
        return Response.json(
            {
                success: false,
                message: "Error in getting all plants"
            },
            {
                status: 500
            }
        );
    }

}