import { Controller, Service } from "@/infrastructure/interfaces";
import { TYPES } from "@/infrastructure/types";
import { NextFunction, Request, Response } from "express";
import { inject } from "inversify";
import { provide } from "inversify-binding-decorators";

@provide(TYPES.Controller)
export class UserController implements Controller {
  constructor(@inject(TYPES.Service) private readonly userService: Service) {}
  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;
      const user = await this.userService.get(userId);
      return res.send(user);
    } catch (error: any) {
      next(error);
    }
  }
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { body } = req;
      const user = await this.userService.create(body);
      return res.send(user);
    } catch (error: any) {
      next(error);
    }
  }
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const { pageSize, pageNum, orderBy } = req.query;
      const users = await this.userService.getAll(
        "",
        "",
        Number(pageSize),
        Number(pageNum),
        String(orderBy)
      );
      return res.send(users);
    } catch (error: any) {
      next(error);
    }
  }
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { body } = req;
      const { userId } = req.params;
      const updateUser = await this.userService.update(userId, body);
      return res.send(updateUser);
    } catch (error: any) {
      next(error);
    }
  }
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;
      const deleteUser = await this.userService.delete(userId);
      return res.send(deleteUser);
    } catch (error: any) {
      next(error);
    }
  }
}
