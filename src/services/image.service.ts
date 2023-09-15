// services/image.service.ts
import { ILogger } from "@/infrastructure/interfaces";
import { TYPES } from "@/infrastructure/types";
import { inject, injectable } from "inversify";
import {
  S3Client,
  PutObjectCommand,
  PutObjectCommandOutput,
  GetObjectCommand,
  DeleteObjectCommand,
  DeleteObjectCommandOutput,
  GetObjectCommandOutput,
  ListObjectsV2Command,
  ListObjectsV2CommandOutput,
} from "@aws-sdk/client-s3";
import sharp from "sharp";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
interface UploadResponse extends PutObjectCommandOutput {
  Location: string;
}
interface Image {
  key: string;
  lastModified: Date;
  size: number;
}

@injectable()
class ImageService {
  private s3: S3Client;
  private bucketImg: string;

  constructor(
    @inject(TYPES.Logger) private logger: ILogger,
    @inject(TYPES.Config) private config: any
  ) {
    const { region, accessKeyId, secretAccessKey } = config.AWS;
    this.s3 = new S3Client({
      region,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });
    this.bucketImg = config.AWS.bucketImg;
  }

  async uploadImage(
    bufferImage: Buffer,
    type: string = "jpeg"
  ): Promise<UploadResponse> {
    let body = bufferImage;
    // Resize and compress image using sharp.
    if (type == "jpeg") {
      body = await sharp(bufferImage)
        .jpeg({
          quality: 50,
          chromaSubsampling: "4:2:0",
        })
        .resize(Math.round(1000 * 0.5))
        .toBuffer();
    }

    const imageName = `${Date.now()}.${type}`;
    const command = new PutObjectCommand({
      Bucket: this.bucketImg,
      Key: imageName,
      Body: body,
      ContentType: "image/jpeg",
      ACL: "public-read",
    });

    try {
      const response = await this.s3.send(command);
      this.logger.info(
        `Successfully uploaded data to ${this.bucketImg}/${imageName}`
      );

      return {
        ...response,
        Location: `https://${this.bucketImg}.s3.${this.config.AWS.region}.amazonaws.com/${imageName}`,
      };
    } catch (error) {
      const err = error as Record<string, unknown>;
      this.logger.error("Error uploading image:", err);
      throw new Error("Failed to upload image to S3");
    }
  }

  // Function to get a signed URL for an image stored in S3.
  async getImageUrl(key: string): Promise<string> {
    const command = new GetObjectCommand({ Bucket: this.bucketImg, Key: key });

    try {
      const response: GetObjectCommandOutput = await this.s3.send(command);

      if (response.$metadata.httpStatusCode !== 200) {
        throw new Error("Invalid response from S3");
      }

      return getSignedUrl(this.s3, command);
    } catch (error) {
      const err = error as Record<string, unknown>;
      this.logger.error("Error getting image URL:", err);
      throw new Error("Failed to get image URL from S3");
    }
  }

  // Function to delete an image from S3.
  async deleteImage(imageName: string): Promise<DeleteObjectCommandOutput> {
    const command = new DeleteObjectCommand({
      Bucket: this.bucketImg,
      Key: imageName,
    });

    try {
      const response = await this.s3.send(command);
      this.logger.info(`Successfully deleted ${this.bucketImg}/${imageName}`);
      return response;
    } catch (error) {
      const err = error as Record<string, unknown>;
      this.logger.error("Error deleting image:", err);
      throw new Error("Failed to delete image from S3");
    }
  }

  // Function to list all images stored in S3.
  async listImages(): Promise<Image[]> {
    const command = new ListObjectsV2Command({ Bucket: this.bucketImg });

    try {
      const data: ListObjectsV2CommandOutput = await this.s3.send(command);
      return (
        data.Contents?.map((image) => ({
          key: image.Key!,
          lastModified: image.LastModified!,
          size: image.Size!,
        })) || []
      );
    } catch (error) {
      const err = error as Record<string, unknown>;
      this.logger.error("Error listing images:", err);
      throw new Error("Failed to list images from S3");
    }
  }
}

export default ImageService;
