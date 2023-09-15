import { ILogger } from "@/infrastructure/interfaces";
import { TYPES } from "@/infrastructure/types";
import { inject, injectable } from "inversify";
import EventBus from "@/helpers/event-bus.helper";
import ImageService from "@/services/image.service";
import { Request, Response, NextFunction } from "express";

@injectable()
export class ImageController {
  constructor(
    @inject(TYPES.Logger) private logger: ILogger,
    @inject(TYPES.EventBus) private eventBus: EventBus,
    @inject(TYPES.ImageService) private imageService: ImageService
  ) {}

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.files || !req.files.image) {
        throw new Error("Image not provided in request");
      }
      const type =
        req.files.image.mimetype === "application/pdf"
          ? "pdf"
          : req.files.image.mimetype.startsWith("image/")
          ? "jpeg"
          : "doc";
      const uploadedImage = await this.imageService.uploadImage(
        req.files.image.data,
        type
      );
      res.status(201).send(uploadedImage);
    } catch (error: any) {
      this.logger.error(error.message);
      next(error);
    }
  }

  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const key = req.params.key;
      const imageUrl = await this.imageService.getImageUrl(key);
      res.status(200).send({ imageUrl });
    } catch (error: any) {
      this.logger.error(error.message);
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const deletekey = req.params.key;
      await this.imageService.deleteImage(deletekey);
      res.status(204).send();
    } catch (error: any) {
      this.logger.error(error.message);
      next(error);
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const images = await this.imageService.listImages();
      res.status(200).send(images);
    } catch (error: any) {
      this.logger.error(error.message);
      next(error);
    }
  }
}

export default ImageController;
