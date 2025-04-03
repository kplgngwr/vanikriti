import dbConnect from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import PlantModel from "@/models/Plant";

export async function POST(request: Request) {
    await dbConnect();

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

        // const userId = new mongoose.Types.ObjectId('667f9d43ce44b02b8b36b9e1');

        const { name, description, price, category, plantImage, wateringCost, pestControlCost, humusCost, manureCost } = await request.json();

        const newPlant = new PlantModel({
            user: user._id,
            name,
            description,
            price,
            category,
            plantImage,
            plantStatus: false,
            caring: [
                wateringCost,
                pestControlCost,
                manureCost,
                humusCost
            ]
        })

        await newPlant.save();
        return Response.json(
            {
                success: true,
                message: "Plant Created Successfully"
            },
            {
                status: 200
            }
        );
    } catch (error) {
        console.log("Error in creating plant ", error);
        return Response.json(
            {
                success: false,
                message: "Error in creating plant"
            },
            {
                status: 500
            }
        );
    }
}