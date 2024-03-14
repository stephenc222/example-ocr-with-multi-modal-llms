import { ImageMediaType, IAIService } from "../types"
import { z } from "zod"

export class LLMService {
  private aiService: IAIService

  constructor(aiService: IAIService) {
    this.aiService = aiService
  }

  async imageToJSON<T>(
    imageBase64: string,
    prompt: string,
    schema: z.ZodType<T>,
    imageMediaType: ImageMediaType = ImageMediaType.JPEG
  ) {
    return this.aiService.imageToJSON(
      imageBase64,
      prompt,
      schema,
      imageMediaType
    )
  }
}
