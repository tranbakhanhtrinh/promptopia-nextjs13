import { connectToDB } from '@utils/database'
import Prompt from '@model/prompt';

export const GET = async (req, { params }) => {
    try {
        await connectToDB();
        const propmpts = await Prompt.find({
            creator: params.id
        }).populate("creator")
        return new Response(JSON.stringify(propmpts), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all prompts.", { status: 500 })
    }
}