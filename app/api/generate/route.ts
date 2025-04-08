import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json()

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 })
    }

    const prompts = [prompt, `${prompt}, detailed`, `${prompt}, artistic`, `${prompt}, realistic`]

    const imagePromises = prompts.map(async (promptVariation) => {
      const response = await fetch(
        "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ inputs: promptVariation }),
        },
      )

      if (!response.ok) {
        throw new Error(`Hugging Face API error: ${response.statusText}`)
      }

      // The API returns image data directly
      const imageBuffer = await response.arrayBuffer()
      const base64Image = Buffer.from(new Uint8Array(imageBuffer)).toString("base64")
      return `data:image/jpeg;base64,${base64Image}`
    })

    const images = await Promise.all(imagePromises)

    return NextResponse.json({ images })
  } catch (error) {
    console.error("Error generating images:", error)
    return NextResponse.json({ error: "Failed to generate images" }, { status: 500 })
  }
}
