import { ILogger, Service } from "@/infrastructure/interfaces";
import { TYPES } from "@/infrastructure/types";
import { inject, injectable } from "inversify";
import { BaseController } from "./base.controller";
import { NextFunction, Request, Response } from "express";
import { IAuthDocument } from "@/models/auth.model";
import EventBus from "@/helpers/event-bus.helper";
import AuthService from "@/services/auth.service";
import UserService from "@/services/user.service";

@injectable()
export class AuthController extends BaseController<Service> {
  constructor(
    @inject(TYPES.AuthService) private authService: AuthService,
    @inject(TYPES.UserService) private userService: UserService,
    @inject(TYPES.Logger) private logger: ILogger,
    @inject(TYPES.EventBus) private eventBus: EventBus
  ) {
    super(authService);
    this.userService = userService;
    this.logger = logger;
    this.eventBus = eventBus;
  }
  async signup(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password, name, termsAccepted, contactNumber } = req.body;

      // Check if a user with the given email already exists
      const existingUser = await this.authService.getByEmail(email);
      if (existingUser) {
        return res.status(400).send({ message: "Email already in use" });
      }

      // Create the user
      const user = await this.baseService.create({
        email,
        password,
        provider: "local",
        enabled: true,
        isVerified: false, // You might want to send a verification email
        isOnline: true,
      });
      const policyHistory = [
        {
          version: "1.0",
          acceptedDate: Date.now(),
        },
      ];
      const result = await this.userService.create({
        name,
        acceptPolicity: termsAccepted,
        policyHistory,
        auth: user._doc._id,
        contactNumber,
      });
      // Return the created user data (without sensitive info)
      res.status(201).send({
        message: "Registered successfully",
        id: user._id,
        email: user.email,
        name: result.name,
      });
    } catch (error) {
      next(error);
    }
  }

  async signin(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const auth = await this.authService.getByEmail(email); // Assuming the get method can fetch by email

      if (!auth || !auth.comparePasswords(password)) {
        return res.status(401).send({ message: "Invalid email or password" });
      }
      const user = await this.userService.getByAuth(auth._id);
      if (!user) {
        return res.status(401).send({ message: "Invalid email or password" });
      }
      // Here, you'd typically generate a JWT or session and send it to the client
      res.send({
        message: "Logged in successfully",
        email: auth.email,
        id: auth._id,
        name: user.name,
      });
    } catch (error) {
      next(error);
    }
  }

  async recoverPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.body;
      const user: IAuthDocument | null = await this.authService.get(email);

      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }

      // Generate OTP or reset link and send it via email
      // For now, we'll just simulate this
      user.otpCode = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit OTP
      await user.save();

      res.send({ message: "Password reset OTP sent to email" });
    } catch (error) {
      next(error);
    }
  }

  async registerProvider(req: Request, res: Response, next: NextFunction) {
    const { email, provider, providerId, name, img } = req.body;

    // Check if a user with the given email already exists
    const existingAuth = await this.authService.getByEmail(email);
    if (existingAuth) {
      const existingUser = await this.userService.getByAuth(existingAuth._id);
      res.status(200).send(existingUser);
    } else {
      const auth = await this.authService.create({
        email,
        provider,
        providerId,
        enabled: true,
        isVerified: true,
        isOnline: true,
      });
      const policyHistory = [
        {
          version: "1.0",
          acceptedDate: Date.now(),
        },
      ];
      const user = await this.userService.create({
        name,
        acceptPolicity: true,
        policyHistory,
        auth: auth._id,
        photo: img,
      });

      res.status(201).send(user);
    }
  }
}
