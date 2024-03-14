import {
  RekognitionClient,
  DetectLabelsCommand,
} from "@aws-sdk/client-rekognition"
import { AreaOfInterest } from "../types"

const TEXT_AND_DOCUMENTS_CATEGORY = "Text and Documents"
const MAX_LABELS = 10
const MIN_CONFIDENCE = 70

export class RekognitionService {
  private rekognition: RekognitionClient

  constructor(rekognition?: RekognitionClient) {
    this.rekognition = rekognition ?? new RekognitionClient()
  }
  async findTextAreaOfInterest(imageBuffer: Buffer): Promise<AreaOfInterest> {
    const response = await this.rekognition.send(
      new DetectLabelsCommand({
        Image: { Bytes: imageBuffer },
        MaxLabels: MAX_LABELS,
        MinConfidence: MIN_CONFIDENCE,
      })
    )
    const boundingBox = response.Labels?.filter((label) =>
      label.Categories?.find(
        (category) => category.Name === TEXT_AND_DOCUMENTS_CATEGORY
      )
    )
      .map((label) => label.Instances)
      .flat()
      .filter((instance) => instance?.BoundingBox)
      .map((instance) => instance?.BoundingBox)
      .pop() // Assuming you want the first bounding box that matches the filter
    if (boundingBox) {
      return {
        Left: boundingBox.Left ?? 0,
        Top: boundingBox.Top ?? 0,
        Width: boundingBox.Width ?? 0,
        Height: boundingBox.Height ?? 0,
      }
    }
    throw new Error("No bounding box found for text document.")
  }
}
