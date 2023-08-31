import { ILogger, Service } from "@/infrastructure/interfaces";
import { TYPES } from "@/infrastructure/types";
import { inject, injectable } from "inversify";
import { BaseController } from "./base.controller";
import { NextFunction, Request, Response } from "express";
import EventBus from "@/helpers/event-bus.helper";

@injectable()
export class UserController extends BaseController<Service> {
  constructor(
    @inject(TYPES.UserService) userService: Service,
    @inject(TYPES.Logger) private logger: ILogger,
    @inject(TYPES.EventBus) private eventBus: EventBus
  ) {
    super(userService);
    this.logger = logger;
    this.eventBus.subscribe(`User.created`, this.onUserCreated.bind(this));
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, termsAccepted } = req.body;
      const result = await this.baseService.create({ name, termsAccepted });
      return res.send(result);
    } catch (error: any) {
      next(error);
    }
  }
  private async onUserCreated(data: any) {
    const { name, termsAccepted, _id, contactNumber } = data;

    /*     policyHistory: [
      {
        version: { type: String, required: true },
        acceptedDate: { type: Date, required: true, default: Date.now },
      },
    ], */

    const policyHistory = [
      {
        version: "1.0",
        acceptedDate: Date.now(),
      },
    ];
    const result = await this.baseService.create({
      name,
      acceptPolicity: termsAccepted,
      policyHistory,
      auth: _id,
      contactNumber,
    });
    this.logger.info("User created" + result);
  }
}
