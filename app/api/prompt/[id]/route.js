import { connectToDB } from '@utils/database'
import Prompt from '@model/prompt';


// GET (read)
export const GET = async (req, { params }) => {
    try {
        await connectToDB();
        const propmpt = await Prompt.findById(params.id).populate("creator")
        if (!propmpt) return new Response("Prompt not found", { status: 404 })
        return new Response(JSON.stringify(propmpt), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all prompts.", { status: 500 })
    }
}

// PATCH(update)
export const PATCH = async (req, { params }) => {
    const { prompt, tag } = await req.json();
    try {
        await connectToDB();
        const existingPropmpt = await Prompt.findById(params.id)
        if (!existingPropmpt) return new Response("Prompt not found", { status: 404 })
        existingPropmpt.prompt = prompt
        existingPropmpt.tag = tag
        await existingPropmpt.save();
        return new Response(JSON.stringify(existingPropmpt), { status: 200 })
    } catch (error) {
        return new Response("Failed to update prompt.", { status: 500 })
    }
}

//DELETE(delete)
export const DELETE = async (req, { params }) => {
    try {
        await connectToDB();
        await Prompt.findByIdAndRemove(params.id)
        return new Response("Prompt deleted successfully", { status: 200 })
    } catch (error) {
        return new Response("Failed to delete prompt.", { status: 500 })
    }
}
