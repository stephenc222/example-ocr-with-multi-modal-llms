import { OpenAI as OpenAIApi } from "openai"
import { LLMResponse, IAIService, ImageMediaType } from "../types"
import { z } from "zod"
import { ChatCompletion } from "openai/resources"

const MAX_TOKENS = 1024
const DEFAULT_TEMPERATURE = 0
const DEFAULT_OPENAI_MODEL_NAME = "gpt-4-vision-preview"

export class OpenAIService implements IAIService {
  private aiService: OpenAIApi
  private modelName: string

  constructor(modelName?: string, openai?: OpenAIApi) {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error("No valid API key found for OpenAI.")
    }
    this.aiService =
      openai ?? new OpenAIApi({ apiKey: process.env.OPENAI_API_KEY })
    this.modelName = modelName ?? DEFAULT_OPENAI_MODEL_NAME
  }

  /**
   *
   * @param imageBase64
   * @param prompt
   * @param schema
   * @param imageMediaType
   * @returns
   */
  async imageToJSON<T>(
    imageBase64: string,
    prompt: string,
    schema: z.ZodType<T>,
    imageMediaType: ImageMediaType
  ): Promise<LLMResponse<T>> {
    const msg = await this.aiService.chat.completions.create({
      model: this.modelName,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: prompt,
            },
            {
              type: "image_url",
              image_url: {
                url: `data:${imageMediaType};base64,${imageBase64}`,
              },
            },
          ],
        },
      ],
      max_tokens: MAX_TOKENS,
      temperature: DEFAULT_TEMPERATURE,
    })

    // Assuming a similar formatResponse method exists or is adapted for this class
    return this.formatResponse<T>(msg, schema)
  }

  /**
   *
   * @param msg
   * @param schema
   * @returns
   */
  private formatResponse<T>(
    msg: ChatCompletion,
    schema: z.ZodType<T>
  ): LLMResponse<T> {
    const messageContent = msg.choices[0]?.message?.content
    const result = schema.parse(
      messageContent ? JSON.parse(messageContent) : null
    )
    return {
      result,
      id: msg.id,
      role: msg.choices[0]?.message?.role,
      usage: {
        completion_tokens: msg.usage?.completion_tokens,
        prompt_tokens: msg.usage?.prompt_tokens,
        total_tokens: msg.usage?.total_tokens,
      },
    }
  }
}
