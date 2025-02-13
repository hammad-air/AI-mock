import { chatSession } from "@/utils/GeminiAIModal";

export async function POST(req) {
  try {
    // Parse the JSON request body
    const body = await req.json();
    const { inputPrompt } = body;

    // Validate the input
    if (!inputPrompt || typeof inputPrompt !== "string" || inputPrompt.trim() === "") {
      return new Response(
        JSON.stringify({ error: "Input prompt is required and must be a non-empty string" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Call chatSession API
    const result = await chatSession.sendMessage(inputPrompt);

    // Log the result for debugging
    console.log("chatSession Result:", result);

    const responseText = await result.response.text();

    // Send success response
    return new Response(
      JSON.stringify({ responseText }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error in API route:", error);

    // Send failure response
    return new Response(
      JSON.stringify({ error: "Internal Server Error", details: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
