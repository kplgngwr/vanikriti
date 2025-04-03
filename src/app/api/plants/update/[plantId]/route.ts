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

        const { name, description, price, category, plantImage, wateringCost, pestControlCost, manureCost, humusCost } = await request.json();

        if (!name || !description || !price || !category || !plantImage || !wateringCost || !pestControlCost || !manureCost || !humusCost) {
            return Response.json(
                {
                    success: false,
                    message: "Please provide something to update"
                },
                {
                    status: 400
                }
            );
        }

        if (name) {
            plant.name = name;
        }

        if (description) {
            plant.description = description;
        }

        if (price) {
            plant.price = price;
        }

        if (category) {
            plant.category = category;
        }

        if (plantImage) {
            plant.plantImage = plantImage;
        }

        if (wateringCost) {
            plant.caring[wateringCost] = wateringCost;
        }

        if (pestControlCost) {
            plant.caring[pestControlCost] = pestControlCost;
        }

        if (manureCost) {
            plant.caring[manureCost] = manureCost;
        }

        if (humusCost) {
            plant.caring[humusCost] = humusCost;
        }

        plant.save()

        return Response.json(
            {
                success: true,
                message: "Plant Updated successfully"
            },
            {
                status: 200
            }
        );


    } catch (error) {
        console.log("Error in updating plant ", error);
        return Response.json(
            {
                success: false,
                message: "Error in updating plant"
            },
            {
                status: 500
            }
        );
    }

}