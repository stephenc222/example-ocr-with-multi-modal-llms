import { AnthropicService } from "../services/anthropic"
import { OpenAIService } from "../services/openai"
import { IAIService } from "../types"

export function createAIService(): IAIService {
  if (process.env.ANTHROPIC_API_KEY) {
    return new AnthropicService()
  } else if (process.env.OPENAI_API_KEY) {
    return new OpenAIService()
  } else {
    throw new Error("No valid API key found for Anthropic or OpenAI.")
  }
}
