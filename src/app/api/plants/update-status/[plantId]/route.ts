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

    if (user.role !== 'admin') {
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

        const plant = await PlantModel.findById(plantID);

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

        const { plantStatus } = await request.json();

        if (!plantStatus) {
            return Response.json(
                {
                    success: false,
                    message: "Please provide plant status to update"
                },
                {
                    status: 400
                }
            );
        }

        plant.save();

        return Response.json(
            {
                success: true,
                message: "Plant Status Updated successfully"
            },
            {
                status: 200
            }
        );


    } catch (error) {
        console.log("Error in updating plant status ", error);
        return Response.json(
            {
                success: false,
                message: "Error in updating plant status"
            },
            {
                status: 500
            }
        );
    }

}