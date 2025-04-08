export async function generateImages(prompt: string): Promise<string[]> {
  try {
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`)
    }

    const data = await response.json()
    return data.images
  } catch (error) {
    console.error("Error generating images:", error)
    throw error
  }
}
