import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import PlantModel from "@/models/Plant";
import { getServerSession } from "next-auth";

export async function PUT(
    request: Request,
    { params }: { params: { plantId: string } }
) {

    await dbConnect();

    const plantID = params.plantId;

    const session = await getServerSession(authOptions);
    const user = session?.user;

    if (!session || !user) {
        return Response.json(
            {
                success: false,
                message: "Not Authenticated"
            },
            {
                status: 401
            }
        );
    }

    if (user.role !== 'admin' || user.role !== 'nursery') {
        return Response.json(
            {
                success: false,
                message: "Not allowed"
            },
            {
                status: 403
            }
        );
    }

    try {

        const plant = await PlantModel.findByIdAndDelete(
            { _id: plantID }
        );

        if (!plant) {
            return Response.json(
                {
                    success: false,
                    message: "Plant not found"
                },
                {
                    status: 400
                }
            );
        }

        return Response.json(
            {
                success: true,
                message: "Plant deleted successfully"
            },
            {
                status: 200
            }
        );


    } catch (error) {
        console.log("Error in deleting plant ", error);
        return Response.json(
            {
                success: false,
                message: "Error in deleting plant"
            },
            {
                status: 500
            }
        );
    }

}