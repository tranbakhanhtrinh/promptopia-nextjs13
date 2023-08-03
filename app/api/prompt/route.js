import { connectToDB } from '@utils/database'
import Prompt from '@model/prompt';

export const GET = async (req) => {
    try {
        await connectToDB();
        const propmpts = await Prompt.find({}).populate("creator")
        return new Response(JSON.stringify(propmpts), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all prompts.", { status: 500 })
    }
}