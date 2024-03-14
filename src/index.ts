import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import { LLMService } from "./services/llm.ts"
import { RekognitionService } from "./services/rekognition.ts"
import { ImageService } from "./utils/image.ts"
import { createAIService } from "./factories/aiService.ts"
import { z } from "zod"
import { IAIService } from "./types.ts"

// This is a Node.js script, so we can use the fileURLToPath function to get the directory name
const __dirname = path.dirname(fileURLToPath(import.meta.url))

const rekognitionService = new RekognitionService()

// Use the factory function to create the aiService instance
const aiService: IAIService = createAIService()

const llmService = new LLMService(aiService)

/**
 *
 * @param imageData
 * @param prompt
 * @param schema
 * @returns
 */
async function detectAndProcessImage<T>(
  imageData: string,
  prompt: string,
  schema: z.ZodType<T>
) {
  try {
    const imageBuffer = Buffer.from(imageData, "base64")
    const areaOfInterest = await rekognitionService.findTextAreaOfInterest(
      imageBuffer
    )
    const processedImage = await ImageService.extractAndProcessImage(
      areaOfInterest,
      imageBuffer
    )
    return llmService.imageToJSON<T>(processedImage, prompt, schema)
  } catch (error) {
    console.error("Error detecting labels:", error)
  }
}

async function main() {
  // Example usage
  const exampleImagePath = path.resolve(
    __dirname,
    "images",
    "small_test_receipt.jpg"
  )
  const exampleImageFileData = fs
    .readFileSync(exampleImagePath)
    .toString("base64")

  // example grocery store receipt prompt
  const exampleGroceryPrompt =
    "Please analyze this paper store receipt and return a JSON object " +
    'containing an array of line items. The array key is "items". Each line ' +
    "item should be an object with two properties: 'name' for the item's name " +
    "and 'price' for its price. Exclude categories and only include specific " +
    "item entries. Only respond with a raw JSON string, no markdown and do not " +
    "escape '\"'."
  // example schema, for our grocery store receipt:
  const ExampleGroceryStoreReceiptSchema = z.object({
    items: z.array(
      z.object({ name: z.string(), price: z.number() }).required()
    ),
  })

  // pass example image data, prompt, and schema to the detectAndProcessImage function
  const output = await detectAndProcessImage<
    z.infer<typeof ExampleGroceryStoreReceiptSchema>
  >(
    exampleImageFileData,
    exampleGroceryPrompt,
    ExampleGroceryStoreReceiptSchema
  )

  console.group("Output Details")
  console.log("Result:", output?.result)
  console.log("Message ID:", output?.id)
  console.log("Message Role:", output?.role)
  console.log("Message Usage:", output?.usage)
  console.groupEnd()
}

try {
  main()
} catch (error) {
  console.error("Error in main:", error)
}
