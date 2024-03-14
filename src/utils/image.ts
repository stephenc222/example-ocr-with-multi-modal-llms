import sharp from "sharp"
import { AreaOfInterest } from "../types.ts"

export class ImageService {
  /**
   *
   * @param areaOfInterest
   * @param imageBuffer
   * @returns
   */
  static async extractAndProcessImage(
    areaOfInterest: AreaOfInterest,
    imageBuffer: Buffer
  ) {
    const image = sharp(imageBuffer)
    const metadata = await image.metadata()
    const cropArea = {
      left: Math.floor(areaOfInterest.Left! * metadata.width!),
      top: Math.floor(areaOfInterest.Top! * metadata.height!),
      width: Math.floor(areaOfInterest.Width! * metadata.width!),
      height: Math.floor(areaOfInterest.Height! * metadata.height!),
    }

    const processedImageBuffer = await image
      .greyscale()
      .extract(cropArea)
      .toBuffer()

    return processedImageBuffer.toString("base64")
  }
}
